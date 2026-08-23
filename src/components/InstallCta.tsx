"use client";

import { useState } from "react";
import posthog from "posthog-js";

/**
 * The hero and header CTA: one segmented control.
 *
 * WHAT THIS REPLACES. A filled pill whose label was the literal string
 * `tearline.kynth.studio/tearline.js` — 31 characters of mono at 14px, plus a
 * prompt glyph and a copy icon, which is why it ran nearly half the width of
 * the header. Isaiah, 2026-08-23, pointing at it in the nav and again in the
 * hero. Nothing shortens a printed URL except not printing it, so the URL is
 * gone; the click still puts the same string on the clipboard.
 *
 * A segment rather than two buttons: the pair read as two competing CTAs of
 * near-equal weight, and the second of them was a URL. One object with a
 * primary half and an icon half says there is one action here and a way to
 * take it with you.
 *
 * The copy half is icon-only and carries its label in `aria-label` and
 * `title`. It is 40px square, above the 24px target floor, and swaps to a
 * check on success — the affordance is the state change, not a caption.
 */
export default function InstallCta({
  href = "/#playground",
  label = "Try it",
}: {
  href?: string;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const TEXT = "tearline.kynth.studio/tearline.js";

  // Same fallback as Copyable: navigator.clipboard is absent on a non-secure
  // origin and REJECTS when the permission is denied — which is what a browser
  // does to a background tab. Unhandled, that throws past the handler and the
  // control reads as dead.
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard api");
      await navigator.clipboard.writeText(TEXT);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = TEXT;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      } catch {
        setState("failed");
        setTimeout(() => setState("idle"), 1800);
        return;
      }
    }
    setState("copied");
    /* The reset's second activation route, which the old CommandButton never
     * fired — only the docs-page Copyable did, so the landing's own install
     * path was invisible in the funnel. Taking the install line is the closest
     * observable thing to installing, since the install itself happens in
     * somebody else's terminal. */
    try {
      posthog.capture("activated", { kind: "install_copied", via: "script_tag" });
    } catch {
      // analytics must never be the thing that breaks a copy button
    }
    setTimeout(() => setState("idle"), 1400);
  }

  return (
    <div className={"tl-seg"} data-state={state}>
      <a className={"tl-seg-a"} href={href} tabIndex={0}>
        {label}
      </a>
      <button
        className={"tl-seg-b"}
        onClick={copy}
        aria-label={`Copy the script source: ${TEXT}`}
        title={state === "copied" ? "Copied" : `Copy ${TEXT}`}
      >
        {state === "copied" ? (
          <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={2} aria-hidden={"true"}>
            <path d={"M4 12.5 9.5 18 20 7"} strokeLinecap={"round"} strokeLinejoin={"round"} />
          </svg>
        ) : (
          <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={1.7} aria-hidden={"true"}>
            <rect x={"9"} y={"9"} width={"11"} height={"11"} rx={"2.5"} />
            <path d={"M5 15V6a2 2 0 0 1 2-2h8"} strokeLinecap={"round"} />
          </svg>
        )}
      </button>
    </div>
  );
}
