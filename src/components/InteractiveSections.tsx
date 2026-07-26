"use client";
import { useEffect } from "react";
import SECTIONS from "./interactions-data.json";

// Interactive components (step tabs, single-open accordions, pricing toggles,
// carousels). The design swaps whole variant subtrees per state, so each
// state's real markup was captured per breakpoint; clicking a trigger swaps the
// container's markup, clicking the active trigger restores the initial state.
// Until the visitor interacts, the server-rendered markup is untouched.
type Trigger = {
  name: string;
  text: string;
  row?: number;
  ordinal?: number;
  html: string;
};
type BpState = {
  initial: string;
  triggers: Trigger[];
  cycle?: string[];
  scroll?: { prog: number; idx: number }[];
};
type Section = {
  key: string;
  carousel?: boolean;
  sels?: { sel: string; parent?: boolean }[];
  states: Record<string, BpState>;
};

const MEDIA: Record<string, string> = {
  desktop: "(min-width: 1200px)",
  tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  phone: "(max-width: 809.98px)",
};

const route = () =>
  typeof location !== "undefined"
    ? location.pathname.replace(/\/+$/, "") || "/"
    : "/";

export default function InteractiveSections() {
  useEffect(() => {
    const bpNow = () =>
      Object.keys(MEDIA).find((k) => window.matchMedia(MEDIA[k]).matches) ||
      "desktop";
    const cleanups: (() => void)[] = [];
    for (const sec of (SECTIONS as Record<string, Section[]>)[route()] || []) {
      // Resolve the container(s): id / data-name for named sections; captured
      // class selectors for anonymous ones. Breakpoint variants are separate
      // nodes — wire every match, each with its own state. Captured states are
      // the live container's innerHTML; when the matched node's parent is a
      // pure single-child wrapper we swap the parent's innerHTML, otherwise we
      // swap the matched node's outerHTML (the wrapper was flattened away —
      // replacing the parent would destroy unrelated siblings).
      type Mount = { root: HTMLElement; outer: boolean };
      const mounts = new Map<HTMLElement, Mount>();
      const addInner = (x: HTMLElement | null) => {
        if (x && !mounts.has(x)) mounts.set(x, { root: x, outer: false });
      };
      addInner(document.getElementById(sec.key));
      document
        .querySelectorAll(`[data-name=${JSON.stringify(sec.key)}]`)
        .forEach((x) => addInner(x as HTMLElement));
      if (!mounts.size)
        for (const s of sec.sels || []) {
          document.querySelectorAll(s.sel).forEach((x) => {
            if (!s.parent) return addInner(x as HTMLElement);
            const parent = x.parentElement;
            if (parent && parent.children.length === 1) addInner(parent);
            else if (!mounts.has(x as HTMLElement))
              mounts.set(x as HTMLElement, {
                root: x as HTMLElement,
                outer: true,
              });
          });
        }
      // Layer names repeat on nested children (authors name the section AND its
      // own cards "Pricing"), so a name query matches a container plus its
      // descendants. Swapping the captured section markup into a descendant
      // injects a second copy of the section heading. Keep only outermost
      // matches — breakpoint variants are siblings, so they survive.
      const roots = [...mounts.keys()];
      for (const x of roots)
        if (roots.some((y) => y !== x && y.contains(x))) mounts.delete(x);
      for (const m of mounts.values()) {
        let el = m.root;
        const host: HTMLElement = m.outer
          ? (el.parentElement as HTMLElement)
          : el;
        if (!host) continue;
        const setHtml = (html: string) => {
          if (!m.outer) {
            el.innerHTML = html;
            return;
          }
          const parent = el.parentElement as HTMLElement;
          const idx = Array.prototype.indexOf.call(parent.children, el);
          el.outerHTML = html;
          el = parent.children[idx] as HTMLElement;
        };
        if (sec.carousel) wireCarousel(el, cleanups);
        if (!sec.states || !Object.keys(sec.states).length) continue;
        let active: number | null = null;
        // Trigger identity: match the clicked element against each trigger's
        // captured TEXT (stable across states for tabs/toggles — accordions are
        // handled row-level by FaqAccordion) with data-name as a tiebreaker.
        // Only VISIBLE elements count (markup carries hidden breakpoint copies).
        const visible = (x: Element) =>
          (x as HTMLElement).offsetParent !== null;
        // Pick the trigger whose matching element is the SMALLEST one containing
        // the click — a wrapper around all triggers shares its first trigger's
        // text prefix, so "first match wins" would misroute clicks to trigger 0.
        const matchTrigger = (target: HTMLElement, bp: string): number => {
          const st = sec.states[bp];
          if (!st) return -1;
          // Positional identity first: trigger names repeat (tab strips capture
          // as one "Active" + N "Deactive"), so name matching alone misroutes.
          // The capture records row = index among the container's visible
          // trigger elements in document order — rebuild that list and match.
          const names = [
            ...new Set(st.triggers.map((t) => t.name).filter(Boolean)),
          ];
          if (names.length && st.triggers.some((t) => t.row !== undefined)) {
            const all = Array.from(
              el.querySelectorAll(
                names.map((n) => `[data-name=${JSON.stringify(n)}]`).join(","),
              ),
            ).filter(visible);
            const outer = all.filter(
              (x) => !all.some((y) => y !== x && y.contains(x)),
            );
            const idx = outer.findIndex(
              (x) => x === target || x.contains(target),
            );
            if (idx >= 0) {
              const ti = st.triggers.findIndex((t) => t.row === idx);
              if (ti >= 0) return ti;
            }
          }
          let best = -1,
            bestLen = Infinity;
          for (let i = 0; i < st.triggers.length; i++) {
            const t = st.triggers[i];
            let cands: Element[] = [];
            if (t.text) {
              cands = Array.from(el.querySelectorAll("*")).filter(
                (x) =>
                  visible(x) &&
                  (x.textContent || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 60) === t.text,
              );
            }
            if (!cands.length && t.name) {
              cands = Array.from(
                el.querySelectorAll(`[data-name=${JSON.stringify(t.name)}]`),
              ).filter(visible);
            }
            for (const cand of cands) {
              if (cand !== target && !cand.contains(target)) continue;
              const len = (cand.textContent || "").length;
              if (len < bestLen) {
                bestLen = len;
                best = i;
              }
            }
          }
          return best;
        };
        let cycleIdx = 0; // cycling components: 0 = the SSR'd initial state
        const swap = (i: number | null, bp: string) => {
          const st = sec.states[bp];
          if (!st) return;
          setHtml(
            i === null ? st.initial : (st.triggers[i]?.html ?? st.initial),
          );
          active = i;
        };
        const onClick = (e: Event) => {
          const bp = bpNow();
          const st = sec.states[bp];
          if (!st) return;
          const i = matchTrigger(e.target as HTMLElement, bp);
          if (i < 0) return;
          if (st.cycle && st.cycle.length) {
            // click-to-advance component: any trigger click steps the sequence
            const seq = [st.initial, ...st.cycle];
            cycleIdx = (cycleIdx + 1) % seq.length;
            setHtml(seq[cycleIdx]);
            active = null;
            return;
          }
          swap(active === i ? null : i, bp);
        };
        host.addEventListener("click", onClick);
        cleanups.push(() => host.removeEventListener("click", onClick));
        // Scroll-driven stories: the section's state follows scroll progress
        // (sampled from the live design) — swap to the mapped state as the
        // visitor scrolls through.
        {
          let raf = 0;
          let scrollIdx: number | null = null;
          const onScroll = () => {
            raf = 0;
            const st = sec.states[bpNow()];
            if (!st || !st.scroll || !st.scroll.length) return;
            const r = el.getBoundingClientRect();
            const prog =
              (window.innerHeight * 0.3 - r.top) / Math.max(1, r.height);
            if (prog < -0.1 || prog > 1.1) return;
            let nearest = st.scroll[0];
            for (const s of st.scroll)
              if (Math.abs(s.prog - prog) < Math.abs(nearest.prog - prog))
                nearest = s;
            if (nearest.idx === scrollIdx) return;
            scrollIdx = nearest.idx;
            setHtml(
              nearest.idx < 0
                ? st.initial
                : (st.triggers[nearest.idx]?.html ?? st.initial),
            );
            active = nearest.idx < 0 ? null : nearest.idx;
          };
          const queue = () => {
            if (!raf) raf = requestAnimationFrame(onScroll);
          };
          const hasScroll = Object.values(sec.states || {}).some(
            (s) => s.scroll && s.scroll.length,
          );
          if (hasScroll) {
            window.addEventListener("scroll", queue, { passive: true });
            cleanups.push(() => {
              window.removeEventListener("scroll", queue);
              if (raf) cancelAnimationFrame(raf);
            });
          }
        }
        for (const q of Object.values(MEDIA)) {
          const mq = window.matchMedia(q);
          const onChange = () => {
            const st = sec.states[bpNow()];
            if (!st) return;
            if (cycleIdx > 0 && st.cycle) {
              const seq = [st.initial, ...st.cycle];
              el.innerHTML = seq[Math.min(cycleIdx, seq.length - 1)];
            } else if (active !== null) {
              swap(active, bpNow());
            }
          };
          mq.addEventListener("change", onChange);
          cleanups.push(() => mq.removeEventListener("change", onChange));
        }
      }
    }
    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}

// Carousels: Next/Previous step the track across its items. Two mechanisms —
// a native overflow-x scroller moved by scrollLeft, or a transformed <ul>.
function wireCarousel(el: HTMLElement, cleanups: (() => void)[]) {
  const isScroller = (n: HTMLElement) =>
    n.scrollWidth > n.clientWidth + 8 &&
    /auto|scroll/.test(getComputedStyle(n).overflowX);
  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest(
      'button[aria-label="Next"], button[aria-label="Previous"]',
    );
    if (!btn) return;
    e.preventDefault();
    const forward = btn.getAttribute("aria-label") === "Next";
    // Prefer the native scroller NEAREST the arrows: most source carousels are
    // an overflow-x:auto track the arrows drive via scrollLeft, and
    // translating a <ul> instead leaves such a track visually frozen.
    let scroller: HTMLElement | null = null;
    for (
      let a: HTMLElement | null = btn as HTMLElement;
      a && a !== el.parentElement && !scroller;
      a = a.parentElement
    ) {
      scroller =
        [...a.querySelectorAll<HTMLElement>("*")].find(isScroller) || null;
    }
    if (scroller) {
      const kids = [
        ...(scroller.firstElementChild?.children || []),
      ] as HTMLElement[];
      const step =
        (kids.length >= 2
          ? Math.abs(kids[1].offsetLeft - kids[0].offsetLeft)
          : 0) || scroller.clientWidth;
      const max = scroller.scrollWidth - scroller.clientWidth;
      const next = forward
        ? scroller.scrollLeft >= max - 1
          ? 0
          : Math.min(max, scroller.scrollLeft + step)
        : scroller.scrollLeft <= 1
          ? max
          : Math.max(0, scroller.scrollLeft - step);
      scroller.scrollTo({ left: next, behavior: "smooth" });
      return;
    }
    // The track is the ul NEAREST the arrows, not the section's first ul —
    // stepping el.querySelector('ul') would translate unrelated layout lists
    // (e.g. a feature grid living in the same section).
    let ul: HTMLUListElement | null = null;
    for (
      let a: HTMLElement | null = btn as HTMLElement;
      a && a !== el.parentElement && !ul;
      a = a.parentElement
    ) {
      const cand = a.querySelector("ul");
      if (cand && cand.children.length >= 2) ul = cand as HTMLUListElement;
    }
    if (!ul || ul.children.length < 2) return;
    const step =
      Math.abs(
        (ul.children[1] as HTMLElement).offsetLeft -
          (ul.children[0] as HTMLElement).offsetLeft,
      ) || 360;
    const cur = new DOMMatrixReadOnly(getComputedStyle(ul).transform).m41;
    const dir = btn.getAttribute("aria-label") === "Next" ? -1 : 1;
    const min = -(step * (ul.children.length - 1));
    let next = cur + dir * step;
    if (next < min) next = 0;
    if (next > 0) next = min;
    ul.style.transition = "transform 0.6s cubic-bezier(0.44, 0, 0.56, 1)";
    ul.style.transform = `translateX(${next}px)`;
  };
  el.addEventListener("click", onClick);
  cleanups.push(() => el.removeEventListener("click", onClick));
}
