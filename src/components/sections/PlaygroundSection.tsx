"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The playground.
 *
 * Takes over the donor's "How it works" slot, which was three collapsible steps
 * on the left and a canned screenshot of the product on the right. The layout is
 * exactly what a playground wants — input left, output right, 1 : 1.2 — so the
 * shell classes stay and only what sits in the columns changes.
 *
 * It drives the SAME element the install section tells you to install, loaded
 * from /tearline.js. Nothing here is mocked. If this section is broken, the
 * product is broken, and you find out by looking at the page rather than by
 * reading a test report.
 */

const SAMPLE = `<h1>Meridian</h1>
<p><small>WRAP ANYTHING</small></p>
<hr>
<table>
  <tr><td>1</td><td>Cortado</td><td align="right">4.25</td></tr>
  <tr><td>1</td><td>Sourdough slice</td><td align="right">3.50</td></tr>
  <tr><td>1</td><td>Orange juice</td><td align="right">4.00</td></tr>
</table>
<hr>
<table>
  <tr><td><strong>TOTAL</strong></td><td align="right"><strong>11.75</strong></td></tr>
</table>
<hr>
<p><small>THANK YOU — COME AGAIN</small></p>`;

type TearLineEl = HTMLElement & {
  download: (name?: string, opts?: { scale?: number }) => Promise<void>;
};

const MONO = "'Geist Mono', 'Fira Code', monospace";


export default function PlaygroundSection() {
  const [src, setSrc] = useState(SAMPLE);
  const [seed, setSeed] = useState(20260726);
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
    <section
      className={"how-it-works-section"}
      data-border={"true"}
      data-name={"How it works Section"}
      id={"playground"}
    >
      <div className={"howitworkssection-content"}>
        <div
          className={"howitworkssection-heading-wrapper"}
          data-name={"Heading wrapper"}
        >
          <div className={"howitworkssection-heading"}>
            <div className={"how-it-works-eyebrow"} data-reveal={"0"}>
              <div className={"dot"} data-border={"true"} data-name={"Dot"} />
              <div
                className={"features-eyebrow-text"}
                data-component={"RichTextContainer"}
              >
                <p
                  className={"heading-4 menu-label"}
                  dir={"auto"}
                  style={{
                    "--rt-text-color":
                      "var(--extracted-r6o4lv, var(--color-background, rgb(255, 165, 82)))",
                  }}
                >
                  {"Playground"}
                </p>
              </div>
            </div>
            <div
              className={"how-it-works-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"Type on the left."}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"Tear off the right."}
                </span>
              </h2>
            </div>
            <div
              className={"how-it-works-subhead"} data-reveal={"2"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"heading-4 hero-subtext"}
                dir={"auto"}
                style={{
                  "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                }}
              >
                {
                  "This is the real element, loaded the way the docs tell you to load it. Edit anything."
                }
              </p>
            </div>
          </div>
        </div>

        <div className={"steps-stack"}>
          <div className={"step-visual-slot"} data-border={"true"}>
            <div
              className={
                "howitworkssection-desktop-tablet-2-2 howitworkssection-desktop-tablet-2 howitworkssection-desktop-tablet-2-2-state-2"
              }
              data-border={"true"}
              style={{ width: "100%" }}
            >
              <div
                className={"howitworkssection-left"}
                data-border={"true"}
                data-name={"Left"}
              >
                <div className={"tl-editor"}>
                  <label className={"tl-editor-label"} htmlFor={"tl-src"}>
                    {"your markup"}
                  </label>
                  <textarea
                    id={"tl-src"}
                    className={"tl-textarea"}
                    spellCheck={false}
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    style={{ fontFamily: MONO }}
                  />
                  <div className={"tl-editor-controls"}>
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
                    <span className={"tl-seed"}>{`seed ${seed}`}</span>
                  </div>
                </div>
              </div>

              <div className={"howitworkssection-right"}>
                {/* Same art as the hero and the feature panels. Without it the
                 * receipt sits on flat black and reads as a cut-out. */}
                <div className={"tl-stage-backdrop tl-backdrop"} />
                <div className={"tl-stage"}>
                  <tear-line
                    ref={receipt}
                    seed={String(seed)}
                    barcode={"04732026"}
                    width={"300"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* The donor's stat strip. Its numbers were 10,000+ developers and
           * 99.9% uptime; this product has no users and no server, so the row
           * carries facts about the thing itself — each one checkable against
           * the file you are being asked to install. */}
          <div className={"how-it-works-steps"} data-border={"true"}>
            {(
              [
                ["1", "tag"],
                ["0", "dependencies"],
                ["0", "build steps"],
                ["MIT", "licence"],
              ] as [string, string][]
            ).map(([value, label], i) => (
              <div className={"stat-developers-container"} key={label}>
                <div
                  className={
                    "stat-item feature-card-responsive link-16 stat-item-tablet howitworkssection-text-13-state"
                  }
                  data-border={"true"}
                  style={{
                    "--border-left-width": i === 0 ? "0px" : "1px",
                    "--border-top-width": "0px",
                    width: "100%",
                  }}
                >
                  <div
                    className={"stat-value-text"}
                    data-component={"RichTextContainer"}
                  >
                    <h3 className={"heading-4 heading-3"} dir={"auto"}>
                      {value}
                    </h3>
                  </div>
                  <div
                    className={"stat-label-text"}
                    data-component={"RichTextContainer"}
                  >
                    <p className={"heading-4 nav-link-text"} dir={"auto"}>
                      {label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
