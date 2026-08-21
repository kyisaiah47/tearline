#!/bin/bash
# Admission class for the shim (~/.claude-accounts/shim/claude): see its JOB CLASSES header.
export CLAUDE_JOB_CLASS=critical
# Prebuilt deploy of tearline to prod (local build, 0 cloud minutes).
# Usage: ./scripts/deploy.sh [--build-only]
#
# Written 2026-08-13. This repo had no deploy script at all, which meant its fixes could not ship
# and no live gate had ever run against it. Same shape as the rest of the estate's scripts.
#
# ⛔ DEPLOY ONE PRODUCT AT A TIME. Parallel builds across sessions trip the shared Supabase
# disk-IO stall and take the whole estate to 522 while every project still reports healthy.
set -euo pipefail

# ⛔ ESTATE DEPLOY GUARD — do not deploy while other Claude sessions are still working.
# Isaiah runs several sessions at once. Deploying into that ships a tree the others are
# still changing, and it is stale before the build finishes — so this defers instead:
# the repo is registered as pending and deploy-watch runs ONE deploy-all pass for
# everything pending the moment the estate goes quiet. `DEPLOY_NOW=1` overrides.
# Wired by kynth-ops/tools/wire-deploy-guard.mjs — do not remove, do not make it
# conditional. `deploy-all.sh --check` fails closed if it goes missing from any script.
. "$HOME/Projects/kynth-ops/tools/deploy-lock.sh" || { echo "deploy gate missing — refusing to deploy" >&2; exit 1; }
deploy_gate "tearline"


# Gates below record a failure instead of aborting, so a red gate cannot silence the gates
# after it. The script still exits non-zero at the end if any of them failed — see the tail.
GATE_FAILED=0
export CI=1

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BUILD_ONLY=""
case "${1:-}" in
  --build-only) BUILD_ONLY=1 ;;
esac

TEAM="team_2hYY71qdn1MSFXL9CfX1uDp3"
PROJECT="tearline"
HOST="tearline.kynth.studio"
WORKBENCH="$HOME/Projects/dev-shell"

# A repo.json (git-link format) forces the interactive project picker even with --yes.
rm -f .vercel/repo.json

echo "==> link to project: $PROJECT"
npx vercel link --project="$PROJECT" --scope="$TEAM" --yes < /dev/null >/dev/null

echo "==> fetch project settings (pull)"
npx vercel pull --yes --environment=production --scope="$TEAM" < /dev/null >/dev/null

# `vercel pull` writes a blank .vercel/.env.production.local, baking empty NEXT_PUBLIC_* into the
# prerender → 500s at runtime. Pull for settings, then overwrite with the real values.
if [ -f ".env.local" ]; then
  echo "==> overwrite blank pulled env with real values from .env.local"
  cp .env.local .vercel/.env.production.local
fi

echo "==> build"
npx vercel build --prod < /dev/null

if [ -n "$BUILD_ONLY" ]; then
  echo "==> --build-only set, skipping deploy"
  exit 0
fi

# --archive=tgz or the estate runs out of uploads: a prebuilt deploy uploads one HTTP request PER
# FILE and the budget is account-wide across every project, not per project.
echo "==> deploy prebuilt (artifacts only, 0 cloud build)"
# ⛔ THE LANDING LAYOUT GATE — standards/LANDING-LAYOUT-STANDARD.md §4 and §5, and it BLOCKS.
#
# Six bullets a card, twelve words a bullet, twenty in the blurb, no duplicate bullet, the
# section inside 1400px, and every bullet carrying a real icon — Solar bold-duotone, one family,
# one colour, the product's own accent, never the same glyph twice in a card and never a
# checkmark, a dot or a bare indent. It also fails the banned label→paragraph transparency band.
#
# It drives a real Chromium at 1440x900 against the BUILT page and reads no source file. That is
# the whole point: three checks in the 2026-08-18 commercial reset passed by grepping source and
# were wrong about the rendered page every time, and the wall of text that reset had to be
# reverted for was invisible to all nine of its gates because not one of them opened a browser.
#
# ⛔ IT EXITS THE SCRIPT. Every other gate here records a failure so a red one cannot silence the
# gates after it; this one is different on purpose — the standard says a product that cannot pass
# it does not deploy, and there is no --force, no allowlist and no known-issues file to get past
# it with. Fix the card.
echo "==> landing layout"
GATE_APP_DIR="$HOME/Projects/tearline"
( cd "$GATE_APP_DIR" && { [ -d .next ] || npm run build; } ) || exit 1
node "$HOME/Projects/kynth-ops/standards/landing-layout-gate.mjs" --dir "$GATE_APP_DIR" --slug tearline || exit 1


DEPLOY_OUT=$(npx vercel deploy --prebuilt --prod --archive=tgz --scope="$TEAM" < /dev/null 2>&1)
echo "$DEPLOY_OUT"

if echo "$DEPLOY_OUT" | grep -q "api-deployments-free-per-day"; then
  echo "RATE-LIMITED by Vercel. STOP — do not retry-loop." >&2
  exit 20
fi
URL=$(echo "$DEPLOY_OUT" | grep -oE 'https://[a-z0-9.-]+\.vercel\.app' | head -1)
if [ -z "$URL" ]; then
  echo "DEPLOY FAILED: no URL extracted. Output above." >&2
  exit 21
fi
echo "deployed: $URL"
deploy_landed   # production has changed; every gate below is verification

echo "==> verify"
ROOT_CODE=$(curl -sL -o /dev/null -w "%{http_code}" "https://$HOST/")
echo "https://$HOST/ → $ROOT_CODE"
if [ "$ROOT_CODE" != "200" ]; then
  echo "VERIFY FAILED" >&2
  exit 22
fi

# ⛔ A 200 ON THE DOCUMENT IS NOT A DEPLOYMENT THAT IS READY TO BE MEASURED.
#
# Every gate below opens the LIVE host, seconds after a prebuilt promote swapped the alias. The
# static assets behind that alias are pulled through the edge on demand, and for a few seconds a
# request for one of them can miss — so the first visitor can be served the document without its
# stylesheet while the document itself returns a perfectly good 200.
#
# Measured 2026-08-14 on tearline: the mobile gate ran immediately after the deploy and reported
# TEN failures at 360x800 and none at the other two viewports, including `INPUT-ZOOM
# textarea#tl-src — font-size 12px`. 12px is not a size anything declares for that element;
# template.css says 13px and mobile.css says 16px, and both are in the same CSS chunk. 12px is
# what it inherits with NEITHER applied. The page had rendered with no stylesheet. Three minutes
# later the same gate against the same unchanged build: 0 fail, 0 warn.
#
# That is the most expensive false finding this estate produces, because the deploy has already
# landed by the time it happens: the report says "deployed, gate failed", the next person re-runs
# the gate, finds it clean, and has no way to tell that from a defect somebody fixed in between.
#
# So the host is warmed first — the document plus every stylesheet and script it references, all
# 200, twice in a row. It is not a retry and not a grace period; it never looks at a finding and
# cannot make one go away. Images are deliberately NOT warmed: a missing image is a finding the
# gates should report.
node "$HOME/Projects/kynth-ops/tools/warm-host.mjs" "https://$HOST/"

# The phone-width gate. Fails closed on: a table column owning more than 55% of the SCREEN,
# content painted off the left edge that no scroll reaches, an overflow-x wrapper that grew to its
# content instead of scrolling it, text under 12px, a control under 16px (which makes iOS zoom the
# viewport on focus), and a tap target whose measured HIT AREA is under 24px.
# ⛔ It never asks the document for its overflow. Measured 2026-08-13, trustdesk.kynth.studio
# reported scrollWidth === clientWidth while its body copy was cut off at both edges — a clipping
# ancestor absorbs the difference, so a clean overflow number is not evidence of a reachable page.
# ⛔ A GATE THAT DID NOT RUN IS NOT A GATE THAT PASSED.
#
# The blocking gates below used to be wrapped in `if [ -f <path> ]; then … fi`, so a missing
# file took the SKIP branch — which printed nothing, set nothing, and shared its exit with the
# pass branch. If the workbench moved, was renamed, or a path constant drifted, this product
# would deploy with no render gate, no phone gate and no intent gate, print OK, and exit 0.
# Nothing anywhere would say the page had never been opened, and the render gate is the only
# check in this estate that opens a page at all.
#
# The shape is not hypothetical. kynth-ops/portals/mcpdir/tick.mjs printed "everything in
# parity, every listing live" on every --no-browser run for the same reason — the skipped check
# produced zero findings and fell into the all-clear branch — and said it three times on
# 2026-08-14 while seven of eleven listings were missing or stale.
#
# So a missing gate is now a FAILURE, said out loud, with the path that was not there.
echo "==> mobile gate (live, 390x844 / 360x800 / 430x932)"
if [ ! -f "$WORKBENCH/ops/qa/mobile-gate.mjs" ]; then
  echo "✗ mobile-gate NOT CHECKED — $WORKBENCH/ops/qa/mobile-gate.mjs is missing" >&2
  GATE_FAILED=1
elif ! node "$WORKBENCH/ops/qa/mobile-gate.mjs" "https://$HOST/"; then GATE_FAILED=1; fi

if [ "$GATE_FAILED" != "0" ]; then
  echo "GATE FAILURE — the deploy landed, but one or more gates above failed." >&2
  exit 1
fi

echo "OK"

# ⛔ DEAD-CONTROL GATES — a control that claims to do something has to DO something when pressed.
# Wired by kynth-ops/tools/wire-control-gates.mjs — do not remove, do not make it optional.
# Both are CONDITIONAL: a page with no action-labelled control, and a product with no
# checkout, pass untouched. See each gate's header for the defects that produced it.
CONTROL_GATES_FAILED=0
for _g in live-wire checkout-path; do
  if [ -f "$HOME/Projects/kynth-ops/tools/gates/$_g.mjs" ]; then
    echo "==> $_g gate (live)"
    if ! node "$HOME/Projects/kynth-ops/tools/gates/$_g.mjs" "https://$HOST/"; then CONTROL_GATES_FAILED=1; fi
  else
    echo "✗ $_g gate NOT CHECKED — the gate is missing from kynth-ops" >&2
    CONTROL_GATES_FAILED=1
  fi
done

if [ "$CONTROL_GATES_FAILED" != "0" ]; then
  echo "GATE FAILURE — the deploy landed, but a control on the live page does nothing when pressed." >&2
  exit 1
fi
