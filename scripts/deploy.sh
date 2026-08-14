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
WORKBENCH="$HOME/Projects/workbench"

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

echo "==> verify"
ROOT_CODE=$(curl -sL -o /dev/null -w "%{http_code}" "https://$HOST/")
echo "https://$HOST/ → $ROOT_CODE"
if [ "$ROOT_CODE" != "200" ]; then
  echo "VERIFY FAILED" >&2
  exit 22
fi

# The phone-width gate. Fails closed on: a table column owning more than 55% of the SCREEN,
# content painted off the left edge that no scroll reaches, an overflow-x wrapper that grew to its
# content instead of scrolling it, text under 12px, a control under 16px (which makes iOS zoom the
# viewport on focus), and a tap target whose measured HIT AREA is under 24px.
# ⛔ It never asks the document for its overflow. Measured 2026-08-13, trustdesk.kynth.studio
# reported scrollWidth === clientWidth while its body copy was cut off at both edges — a clipping
# ancestor absorbs the difference, so a clean overflow number is not evidence of a reachable page.
if [ -f "$WORKBENCH/ops/qa/mobile-gate.mjs" ]; then
  echo "==> mobile gate (live, 390x844 / 360x800 / 430x932)"
  if ! node "$WORKBENCH/ops/qa/mobile-gate.mjs" "https://$HOST/"; then GATE_FAILED=1; fi
fi

if [ "$GATE_FAILED" != "0" ]; then
  echo "GATE FAILURE — the deploy landed, but one or more gates above failed." >&2
  exit 1
fi

echo "OK"
