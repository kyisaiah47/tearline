"use client";
import { useEffect } from "react";
import FAQ_DATA from "./faq-data.json";

// FAQ accordion. The design's closed and open rows are different DOM (the
// answer only exists in the open variant), so both states were captured per
// row; clicking swaps the row's markup and animates its height. Rows are keyed
// by question text, so every breakpoint's copy of the accordion works. Data is
// keyed by route — one component serves every page.
type Row = { q: string; closed: string; open: string };

const route = () =>
  typeof location !== "undefined"
    ? location.pathname.replace(/\/+$/, "") || "/"
    : "/";

export default function FaqAccordion() {
  useEffect(() => {
    const DATA = (FAQ_DATA as Record<string, Row[]>)[route()] || [];
    if (!DATA.length) return;
    const byQuestion = new Map(DATA.map((r) => [r.q, r]));
    const wired: HTMLElement[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("[data-name]")) {
      if (!/(^|\s)(closed|open)$/i.test(el.getAttribute("data-name") || ""))
        continue;
      const wrap = el.parentElement;
      if (!wrap || wrap.dataset.faqWired) continue;
      const q = (wrap.textContent || "").replace(/\s+/g, " ").trim();
      const row = byQuestion.get(q);
      if (!row) continue;
      wrap.dataset.faqWired = "1";
      // rows can start open (their variant is named "… Open")
      wrap.dataset.faqOpenNow = /open$/i.test(
        el.getAttribute("data-name") || "",
      )
        ? "1"
        : "";
      wired.push(wrap);
    }
    const ease = "cubic-bezier(0.33, 0, 0.15, 1)";
    const swap = (wrap: HTMLElement) => {
      const q =
        wrap.dataset.faqQ ||
        (wrap.textContent || "").replace(/\s+/g, " ").trim();
      const row = byQuestion.get(q);
      if (!row) return;
      wrap.dataset.faqQ = q;
      const opening = !wrap.dataset.faqOpenNow;
      const from = wrap.getBoundingClientRect().height;
      wrap.innerHTML = opening ? row.open : row.closed;
      wrap.dataset.faqOpenNow = opening ? "1" : "";
      // Measure the target height under height:auto — the wrap's resting
      // height may be a fixed class rule that would otherwise clamp
      // scrollHeight to the old size.
      wrap.style.height = "auto";
      const to = wrap.scrollHeight;
      if (Math.abs(to - from) > 2) {
        wrap.style.height = from + "px";
        wrap.style.overflow = "hidden";
        wrap.style.transition = `height 0.4s ${ease}`;
        void wrap.offsetHeight;
        wrap.style.height = to + "px";
        let cleaned = false;
        const done = () => {
          if (cleaned) return;
          cleaned = true;
          wrap.removeEventListener("transitionend", done);
          // 'auto', not removeProperty: the wrap's resting height may be a
          // FIXED class rule (hoisted from the design's measured inline
          // height) — falling back to it would pin the old size forever.
          wrap.style.height = "auto";
          wrap.style.removeProperty("overflow");
          wrap.style.removeProperty("transition");
        };
        wrap.addEventListener("transitionend", done);
        // transitionend can be missed (bubbled child transitions, interrupted
        // frames) — the animated height must never stick around.
        setTimeout(done, 600);
      }
    };
    const onClick = (e: MouseEvent) => {
      const wrap =
        (e.target as HTMLElement).closest<HTMLElement>(
          "[data-faq-wired], [data-faqWired]",
        ) || wired.find((w) => w.contains(e.target as Node));
      if (wrap) swap(wrap);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
