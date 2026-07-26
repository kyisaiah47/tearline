"use client";
import { useEffect } from "react";
import DATA from "./motion-data.json";

// Page-load entrance animations. Each animated element carries a data-animate
// id; the data maps it to per-breakpoint keyframes (springs pre-sampled into
// linear() easings).
//
// The hidden state is CSS (`.js [data-animate="…"]` in the stylesheet), so it is
// the FIRST painted frame. It used to come only from this effect, which runs
// after hydration — after the browser had already painted the SSR markup in its
// FINAL state. `fill: "backwards"` then snapped every element back to its start
// the instant animate() was called, so the page painted, un-painted, and faded
// in again. Nothing about the easing or duration could fix that; the wrong
// frame was already on screen.
//
// Because the stylesheet now holds the start state, the animation must fill
// FORWARDS too — otherwise the element reverts to that CSS start state the
// moment it finishes, and disappears.
//
// Without JS the `.js` scope never applies and the SSR markup stands as-is.
type Entrance = {
  media: string | null;
  from: { opacity: number; transform: string };
  to: { opacity: number; transform: string };
  easing: string;
  duration: number;
  delay: number;
};
type PageMotion = { entrances?: Record<string, Entrance[]> };

const route = () =>
  typeof location !== "undefined"
    ? location.pathname.replace(/\/+$/, "") || "/"
    : "/";

export default function EntranceAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const page = (DATA as Record<string, PageMotion>)[route()];
    const animations = page?.entrances || {};
    for (const el of document.querySelectorAll<HTMLElement>("[data-animate]")) {
      const variants = animations[el.getAttribute("data-animate") || ""];
      if (!variants) continue;
      const v =
        variants.find((x) => x.media && window.matchMedia(x.media).matches) ||
        variants.find((x) => !x.media);
      // No variant for this viewport — and captures routinely ship only
      // breakpoint-scoped variants with no default, so this is reachable at
      // ordinary desktop widths. The stylesheet has already hidden the element,
      // so returning here without revealing it would hide it for good.
      if (!v) {
        el.style.opacity = "1";
        continue;
      }
      // Compose the entrance offset ON TOP of the element's resting transform —
      // elements often carry measured layout transforms (centering) that an
      // absolute keyframe would wipe out for the duration of the animation.
      const rest =
        el.style.transform && el.style.transform !== "none"
          ? el.style.transform
          : "";
      const from = {
        opacity: v.from.opacity,
        transform:
          `${rest ? rest + " " : ""}${v.from.transform === "none" ? "" : v.from.transform}`.trim() ||
          "none",
      };
      const to = { opacity: v.to.opacity, transform: rest || v.to.transform };
      el.animate([from, to], {
        duration: v.duration,
        delay: v.delay,
        easing: v.easing,
        // "both", not "backwards": the start state is in the stylesheet now, so
        // an animation that stops holding its end state drops the element
        // straight back to hidden.
        fill: "both",
      });
    }
  }, []);
  return null;
}
