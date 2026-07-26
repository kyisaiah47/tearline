"use client";
import { useEffect } from "react";
import DATA from "./motion-data.json";

// Scroll-linked parallax. Targets carry each element's transform/opacity at the
// moment it enters (from) and leaves (to) the viewport, sampled from the live
// design; scrolling interpolates between them.
type Endpoint = { transform: string; opacity: string; prog: number };
type Target = { sel: string; from: Endpoint; to: Endpoint };
type PageMotion = { parallax?: Target[] };

const route = () =>
  typeof location !== "undefined"
    ? location.pathname.replace(/\/+$/, "") || "/"
    : "/";

function parseT(t: string) {
  if (!t || t === "none") return { x: 0, y: 0, s: 1, r: 0 };
  const m = new DOMMatrixReadOnly(t);
  return {
    x: m.m41,
    y: m.m42,
    s: Math.hypot(m.m11, m.m12) || 1,
    r: Math.atan2(m.m12, m.m11) * (180 / Math.PI),
  };
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets =
      (DATA as Record<string, PageMotion>)[route()]?.parallax || [];
    const els: {
      el: HTMLElement;
      from: ReturnType<typeof parseT> & { o: number };
      to: ReturnType<typeof parseT> & { o: number };
    }[] = [];
    for (const t of targets) {
      document.querySelectorAll<HTMLElement>(t.sel).forEach((el) => {
        els.push({
          el,
          from: { ...parseT(t.from.transform), o: +t.from.opacity },
          to: { ...parseT(t.to.transform), o: +t.to.opacity },
        });
      });
    }
    if (!els.length) return;
    let raf = 0;
    const onScroll = () => {
      const vh = window.innerHeight;
      for (const { el, from, to } of els) {
        const r = el.getBoundingClientRect();
        const prog = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        el.style.transform = `translate(${lerp(from.x, to.x, prog)}px, ${lerp(from.y, to.y, prog)}px) scale(${lerp(from.s, to.s, prog)}) rotate(${lerp(from.r, to.r, prog)}deg)`;
        if (from.o !== to.o)
          el.style.opacity = String(lerp(from.o, to.o, prog));
      }
      raf = 0;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    onScroll();
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
