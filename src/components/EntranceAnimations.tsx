"use client";
import { useEffect } from "react";
import DATA from "./motion-data.json";

// Page-load entrance animations. Each animated element carries a data-animate
// id; the data maps it to per-breakpoint keyframes (springs pre-sampled into
// linear() easings). The SSR markup renders the final state, so without JS the
// page is simply static — no layout shift either way.
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
      if (!v) continue;
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
        fill: "backwards",
      });
    }
  }, []);
  return null;
}
