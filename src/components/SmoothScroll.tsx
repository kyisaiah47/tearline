"use client";
import { useEffect } from "react";
import Lenis from "lenis";

// Momentum smooth-scrolling (matches the design's scroll feel).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      /* ⛔ WITHOUT THIS, NOTHING NESTED INSIDE THE PAGE CAN BE SCROLLED. (2026-08-12)
       *
       * Lenis listens for `wheel` on the document, calls `preventDefault()` on every event it
       * handles, and moves the PAGE. A wheel that started over an inner `overflow: auto` box is
       * cancelled before the browser can scroll that box, so the box sits at scrollTop 0 forever
       * and the page glides underneath it instead.
       *
       * MEASURED against this exact lenis build (1.3.25), real CDP wheel events — six 120px
       * notches over a nested `overflow-y: auto` div:
       *   allowNestedScroll: false → box.scrollTop 0 → 0,   window.scrollY 0 → 719
       *   allowNestedScroll: true  → box.scrollTop 0 → 720, window.scrollY 0 → 0
       * The same probe injected into the LIVE estate reproduced the first row, so this was shipped
       * behaviour and not a local artefact. Horizontal boxes are not spared: a PURE horizontal
       * wheel survives, because Lenis bails when `deltaY === 0`, but a DIAGONAL one — which is what
       * a real trackpad emits — does not.
       *
       * THIS OPTION RATHER THAN `data-lenis-prevent` ON EACH BOX, because the exemption has to be
       * CONDITIONAL. Lenis's own `hasNestedScroll` re-measures the node and yields only when it
       * really has `overflow: auto/scroll/overlay`, really overflows, and has not hit its end — so
       * page scrolling still chains at the edges. `data-lenis-prevent` is unconditional and traps
       * the wheel over a box that is not currently scrollable at all. It is also the only form of
       * the fix that covers a scroller added later by someone who never heard of it.
       *
       * ⛔ workbench/ops/qa/lenis-gate.mjs fails the build if this line is removed. */
      allowNestedScroll: true,
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
