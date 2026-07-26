"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The free tool, on the landing page.
 *
 * This lived in a separate static site (site/index.html) while the landing was
 * a Framer port — two sites for one product, which is exactly the split-brain
 * the pipeline warns about. It is now a section of the real page.
 *
 * It drives the SAME <tear-line> element a visitor would install, loaded from
 * /tearline.js as a plain module. Nothing here is a mock: if the playground
 * breaks, the product is broken.
 */

const SAMPLE = `<h1>Tearline</h1>
<p><small>WRAP ANYTHING</small></p>
<hr>
<table>
  <tr><td>1</td><td>Custom element</td><td align="right">0.00</td></tr>
  <tr><td>1</td><td>Zero dependencies</td><td align="right">0.00</td></tr>
  <tr><td>1</td><td>PNG export</td><td align="right">0.00</td></tr>
</table>
<hr>
<table>
  <tr><td><strong>TOTAL</strong></td><td align="right"><strong>0.00</strong></td></tr>
</table>
<hr>
<p><small>THANK YOU — COME AGAIN</small></p>`;

type TearLineEl = HTMLElement & {
  download: (name?: string, opts?: { scale?: number }) => Promise<void>;
};

export default function Playground() {
  const [src, setSrc] = useState(SAMPLE);
  const [seed, setSeed] = useState(7);
  const [status, setStatus] = useState<"idle" | "working" | "failed">("idle");
  const receipt = useRef<TearLineEl | null>(null);

  // The receipt's content is light-DOM children of a custom element, so React
  // cannot own it — set it imperatively and let the element re-render itself.
  useEffect(() => {
    if (receipt.current) receipt.current.innerHTML = src;
  }, [src]);

  async function download() {
    if (!receipt.current) return;
    setStatus("working");
    try {
      await receipt.current.download("receipt.png");
      setStatus("idle");
    } catch {
      setStatus("failed");
      setTimeout(() => setStatus("idle"), 2400);
    }
  }

  return (
    <section className={"tl-section"} id={"playground"}>
      <div className={"tl-shell"}>
        <div className={"tl-section-head"}>
          <p className={"tl-eyebrow"}>{"01/ Try it"}</p>
          <h2 className={"tl-heading"}>
            {"Type on the left. "}
            <span className={"tl-accent"}>{"Tear off the right."}</span>
          </h2>
        </div>

        <div className={"tl-play"}>
          <div className={"tl-editor"}>
            <label className={"tl-label"} htmlFor={"tl-src"}>
              {"Your HTML"}
            </label>
            <textarea
              id={"tl-src"}
              className={"tl-textarea"}
              spellCheck={false}
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
          </div>

          <div className={"tl-stage"}>
            <label className={"tl-label"}>{"Your receipt"}</label>
            <div className={"tl-stage-inner"}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {/* @ts-expect-error — custom element, not in JSX.IntrinsicElements */}
              <tear-line ref={receipt} seed={String(seed)} barcode={"047320260726"} />
            </div>
            <div className={"tl-controls"}>
              <button className={"tl-btn"} onClick={download}>
                {status === "working"
                  ? "Rendering…"
                  : status === "failed"
                    ? "Export failed"
                    : "Download PNG"}
              </button>
              <button
                className={"tl-btn tl-btn-ghost"}
                onClick={() => setSeed(Math.floor(Math.random() * 1e6))}
              >
                {"New tear"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
