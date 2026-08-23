"use client";

import { useEffect, useState } from "react";

/**
 * The studio credit — "Built by" plus the seal lockup.
 *
 * Spec: kynth-ops/standards/STUDIO-CREDIT-SEAL.md, approved by Isaiah
 * 2026-08-19 off a rendered four-way comparison of this footer bar.
 *
 * WHY THIS IS A COMPONENT AND NOT MARKUP IN THE FOOTER. The spec says to pick
 * the on-dark or on-light lockup "by what is actually behind it, measured, not
 * by habit". Until 2026-08-23 the ground behind it was a constant, so the
 * choice was made once and written down. It is not a constant any more: the
 * footer bar is rgb(17, 17, 16) on the dark theme and rgb(242, 236, 225) on
 * the light one, and the on-dark shot is a white wordmark, which paints as a
 * black slab on cream. The measurement now has to happen at runtime.
 *
 * ⛔ ONE <img>, ONE alt. The spec's other two hard rules survive the change:
 * the lockup is a picture and is never reassembled from a mark plus type, and
 * `alt="Kynth Studios"` is the only machine-readable copy of the studio's name
 * on the credit — the @id edge to the apex Organization rests on it. So this
 * swaps the `src` of a single element rather than rendering both and hiding
 * one, which would either duplicate that string or make the visible one
 * decorative. Both files are the same 1128x282, so the declared 80x20 holds
 * across the swap and the bar never reflows.
 *
 * A MutationObserver rather than shared state: ThemeToggle already writes the
 * attribute on <html>, and that attribute is the single source of truth —
 * including for the pre-hydration script in layout.tsx, which runs before any
 * React state exists. Watching it means there is nothing to keep in sync.
 */
export default function StudioSignature({ slug }: { slug: string }) {
  // Dark is the default and is what the server renders, so the on-dark lockup
  // is the SSR value and the first client paint agrees with it.
  const [light, setLight] = useState(false);

  useEffect(() => {
    const read = () =>
      setLight(document.documentElement.dataset.theme === "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  return (
    <p className={"heading-4 body-text kynth-signature-line"} dir={"auto"}>
      <a
        className={"kynth-signature"}
        href={`https://kynth.studio/?utm_source=${slug}&utm_medium=studio_credit`}
        target={"_blank"}
        rel={"publisher noopener"}
      >
        <span>{"Built by"}</span>
        <img
          src={
            light
              ? "/brand/kynth-studios-lockup-onlight.png"
              : "/brand/kynth-studios-lockup.png"
          }
          alt={"Kynth Studios"}
          width={80}
          height={20}
          decoding={"async"}
        />
      </a>
    </p>
  );
}
