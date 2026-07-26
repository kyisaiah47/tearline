"use client";
import { useEffect } from "react";
import DATA from "./motion-data.json";

// Scroll-into-view reveals. Each element carries a data-reveal id; the data
// maps it to the hidden initial state and the revealed final state (both
// measured on the live design). Elements start hidden and transition in when
// they enter the viewport, staggered by sibling order.
type Reveal = {
  op0: string;
  tf0: string;
  clip0?: string;
  filter0?: string;
  op1: string;
  tf1: string;
  order: number;
};
type PageMotion = { reveals?: Record<string, Reveal> };

const route = () =>
  typeof location !== "undefined"
    ? location.pathname.replace(/\/+$/, "") || "/"
    : "/";

// The hidden→revealed offset is applied as a DELTA composed onto the element's
// own resting transform — elements often carry measured layout transforms
// (centering) that a plain overwrite would destroy.
function revealDelta(r: Reveal) {
  const parse = (t: string) => {
    if (!t) return { x: 0, y: 0, s: 1 };
    const m = new DOMMatrixReadOnly(t);
    return { x: m.m41, y: m.m42, s: Math.hypot(m.m11, m.m12) || 1 };
  };
  const a = parse(r.tf0),
    b = parse(r.tf1);
  return { dx: a.x - b.x, dy: a.y - b.y, ds: b.s ? a.s / b.s : 1 };
}

export default function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reveals =
      (DATA as Record<string, PageMotion>)[route()]?.reveals || {};
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!els.length) return;
    const resting = new Map<HTMLElement, string>();
    const fire = (el: HTMLElement) => {
      const r = reveals[el.getAttribute("data-reveal") || ""];
      if (!r) return;
      const delay = Math.min((r.order || 0) * 0.05, 0.5);
      const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transition = `opacity 0.7s ${delay}s ${ease}, transform 0.8s ${delay}s ${ease}, clip-path 0.8s ${delay}s ${ease}, filter 0.7s ${delay}s ${ease}`;
      el.style.opacity = r.op1 || "1";
      el.style.transform = resting.get(el) || "none";
      if (r.clip0) el.style.clipPath = "none";
      if (r.filter0) el.style.filter = "none";
    };

    // An IntersectionObserver clips its intersection rect against ancestor
    // overflow, so a reveal parked off-track inside a carousel/marquee never
    // intersects the viewport and would sit at its initial hidden state
    // forever. Those reveal off their OUTERMOST clipping ancestor instead —
    // when the carousel scrolls into view, its whole slide set resolves.
    const clipRoot = (el: HTMLElement): HTMLElement | null => {
      let found: HTMLElement | null = null;
      for (
        let p = el.parentElement;
        p && p !== document.body;
        p = p.parentElement
      ) {
        const s = getComputedStyle(p);
        if (
          s.overflow !== "visible" ||
          s.overflowX !== "visible" ||
          s.overflowY !== "visible"
        )
          found = p;
      }
      return found;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          fire(e.target as HTMLElement);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const pending = new Map<HTMLElement, HTMLElement[]>();
    const ioClipped = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const t = e.target as HTMLElement;
          ioClipped.unobserve(t);
          for (const el of pending.get(t) || []) fire(el);
          pending.delete(t);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      const r = reveals[el.getAttribute("data-reveal") || ""];
      if (!r) continue;
      const rest = el.style.transform || "";
      resting.set(el, rest || "none");
      const { dx, dy, ds } = revealDelta(r);
      el.style.willChange = "opacity, transform";
      el.style.opacity = r.op0;
      if (dx || dy || ds !== 1) {
        el.style.transform = `${rest ? rest + " " : ""}translate(${dx}px, ${dy}px)${ds !== 1 ? ` scale(${ds})` : ""}`;
      }
      if (r.clip0) el.style.clipPath = r.clip0;
      if (r.filter0) el.style.filter = r.filter0;
      const clip = clipRoot(el);
      if (clip) {
        if (!pending.has(clip)) {
          pending.set(clip, []);
          ioClipped.observe(clip);
        }
        (pending.get(clip) as HTMLElement[]).push(el);
      } else {
        io.observe(el);
      }
    }
    return () => {
      io.disconnect();
      ioClipped.disconnect();
    };
  }, []);
  return null;
}
