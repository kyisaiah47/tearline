"use client";
import { useEffect } from "react";

// Infinite logo/testimonial tickers. A track is any element with at least two
// children containing a .ticker-item; the first unit is recycled to the end as
// it scrolls out, so the loop is seamless for any content width.
const SPEED = 40; // px/sec

export default function Marquee() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rafs: number[] = [];
    const isUnit = (c: Element) =>
      c.classList.contains("ticker-item") || !!c.querySelector(".ticker-item");
    const findTrack = (item: Element): HTMLElement | null => {
      let el: HTMLElement | null = item as HTMLElement;
      while (el && el.parentElement) {
        const par: HTMLElement = el.parentElement;
        if (Array.from(par.children).filter(isUnit).length >= 2) return par;
        el = par;
      }
      return null;
    };
    const tracks = new Set<HTMLElement>();
    document.querySelectorAll(".ticker-item").forEach((item) => {
      const track = findTrack(item);
      if (track) tracks.add(track);
    });
    tracks.forEach((track) => {
      track.style.transform = "translateX(0px)";
      track.style.willChange = "transform";
      track
        .querySelectorAll<HTMLElement>(".ticker-item")
        .forEach((it) => (it.style.transform = "none"));
      const gap =
        parseFloat(
          getComputedStyle(track).columnGap ||
            getComputedStyle(track).gap ||
            "0",
        ) || 0;
      let offset = 0;
      let last = 0;
      const tick = (now: number) => {
        if (!last) last = now;
        offset -= (SPEED * (now - last)) / 1000;
        last = now;
        const first = track.firstElementChild as HTMLElement | null;
        if (first && isUnit(first)) {
          const w = first.getBoundingClientRect().width + gap;
          if (-offset >= w) {
            offset += w;
            track.appendChild(first);
          }
        }
        track.style.transform = `translateX(${offset}px)`;
        rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    });
    return () => rafs.forEach(cancelAnimationFrame);
  }, []);
  return null;
}
