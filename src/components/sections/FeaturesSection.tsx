import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import FeatureCard from "@/components/FeatureCard";
import StatusPanel, { ColumnsPanel } from "@/components/StatusPanel";

/**
 * Features.
 *
 * The donor's 3x3 bento, its six named slots kept in their original order so
 * the captured grid still resolves. Each card's body is a panel primitive
 * instead of 900 lines of inlined markup.
 *
 * Every claim on this page is checkable against src/tearline.js. There are no
 * user counts, no uptime figures and no logos, because there is nothing true to
 * put in them yet — and a features grid is exactly where a landing page starts
 * inventing them.
 */

const WRAP: Line[] = [
  [
    ["<", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["h1", "tag"],
    [">", "text"],
    ["Sunday long run", "text"],
    ["</", "text"],
    ["h1", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["hr", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["table", "tag"],
    [">", "text"],
  ],
  [
    ["    <", "text"],
    ["tr", "tag"],
    [">", "text"],
    ["<", "text"],
    ["td", "tag"],
    [">", "text"],
    ["Distance", "text"],
    ["</", "text"],
    ["td", "tag"],
    [">", "text"],
    ["<", "text"],
    ["td", "tag"],
    [">", "text"],
    ["21.1 km", "text"],
    ["</", "text"],
    ["td", "tag"],
    [">", "text"],
    ["</", "text"],
    ["tr", "tag"],
    [">", "text"],
  ],
  [
    ["    <", "text"],
    ["tr", "tag"],
    [">", "text"],
    ["<", "text"],
    ["td", "tag"],
    [">", "text"],
    ["Pace", "text"],
    ["</", "text"],
    ["td", "tag"],
    [">", "text"],
    ["<", "text"],
    ["td", "tag"],
    [">", "text"],
    ["5:12 /km", "text"],
    ["</", "text"],
    ["td", "tag"],
    [">", "text"],
    ["</", "text"],
    ["tr", "tag"],
    [">", "text"],
  ],
  [
    ["  </", "text"],
    ["table", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["img", "tag"],
    [" ", "text"],
    ["src", "attr"],
    ["=", "text"],
    ['"data:…"', "str"],
    [">", "text"],
  ],
  [
    ["</", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
];

const EXPORT: Line[] = [
  [
    ["const", "kw"],
    [" el = document.", "text"],
    ["querySelector", "fn"],
    ["(", "text"],
    ["'tear-line'", "str"],
    [")", "text"],
  ],
  [["", "text"]],
  [
    ["await", "kw"],
    [" el.", "text"],
    ["download", "fn"],
    ["(", "text"],
    ["'receipt.png'", "str"],
    [")", "text"],
  ],
  [
    ["const", "kw"],
    [" blob = ", "text"],
    ["await", "kw"],
    [" el.", "text"],
    ["toBlob", "fn"],
    ["()", "text"],
  ],
];

const FRAMEWORKS: Line[] = [
  [
    ["import", "kw"],
    [" ", "text"],
    ["'tearline'", "str"],
  ],
  [["", "text"]],
  [
    ["<", "text"],
    ["tear-line", "tag"],
    [" ", "text"],
    ["seed", "attr"],
    ["=", "text"],
    ["{", "text"],
    ["id", "text"],
    ["}", "text"],
    [">", "text"],
  ],
  [
    ["  {", "text"],
    ["order", "text"],
    ["}", "text"],
  ],
  [
    ["</", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
];

const PKG: Line[] = [
  [["{", "text"]],
  [
    ['  "name"', "attr"],
    [": ", "text"],
    ['"tearline"', "str"],
    [",", "text"],
  ],
  [
    ['  "type"', "attr"],
    [": ", "text"],
    ['"module"', "str"],
    [",", "text"],
  ],
  [
    ['  "dependencies"', "attr"],
    [": ", "text"],
    ["{}", "ok"],
  ],
  [["}", "text"]],
];

/** A short seed sample, shown three times to make determinism visible. */
const seedCol = (seed: string, edge: string) => (
  <div style={{ fontSize: "12px", lineHeight: "22px" }}>
    <div style={{ color: "var(--color-background, rgb(255, 165, 82))" }}>
      {`seed="${seed}"`}
    </div>
    <div style={{ color: "var(--color-gray-dark-2, rgb(64, 64, 64))" }}>
      {edge}
    </div>
  </div>
);

export default function FeaturesSection() {
  return (
    <section
      className={"featuressection-features-section"}
      data-border={"true"}
      data-name={"Features Section"}
      id={"features"}
    >
      <div className={"featuressection-content"}>
        <div
          className={"featuressection-heading-wrapper"}
          data-name={"Heading wrapper"}
        >
          <div className={"featuressection-heading"}>
            <div className={"features-eyebrow-slot"} data-reveal={"0"}>
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
                  {"Coverage"}
                </p>
              </div>
            </div>
            <div
              className={"features-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"What is supported, where it runs,"}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"and what it does when it stops"}
                </span>
              </h2>
            </div>
            <div
              className={"features-subhead"} data-reveal={"2"}
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
                  "Nothing here is a promise about the future. Every line is checkable against the file itself \u2014 tearline.js, unminified, 18,985 bytes \u2014 or against the docs, which carry the version they describe."
                }
              </p>
            </div>
          </div>
        </div>

        <div
          className={"featuressection-grid"}
          data-border={"true"}
          data-name={"Grid"}
        >
          <FeatureCard
            slot={"feature-graphic-slot"}
            reveal={"0"}
            id={"feature-wrap"}
            title={"Coverage — the HTML it styles for you"}
            description={
              "h1, h2, hr, p, small, strong, table, ul and ol arrive as receipt type with no CSS from you. Anything else renders as itself: it is your markup in the light DOM, not a receipt DSL. Every rule is written with ::slotted(), so a plain selector of yours wins without !important."
            }
          >
            <CodePanel title={"run.html"} lines={WRAP} />
          </FeatureCard>

          <FeatureCard
            slot={"feature-image-slot"}
            reveal={"1"}
            id={"feature-export"}
            title={"Method — a PNG, made in the reader\u2019s browser"}
            description={
              "toBlob, toDataURL and download resolve to a PNG at any scale, default 2. The whole export runs in the page: the shadow tree is flattened, serialised into an SVG foreignObject, painted onto a canvas and read back. There is no server, no screenshot endpoint and no upload \u2014 nothing you render is sent anywhere, so there is nothing to retain and nothing to delete. The paper\u2019s own type is a system stack (ui-monospace, SF Mono, Menlo, Consolas), so no webfont is fetched and the export matches the screen; a webfont YOUR markup brings can fall back inside the export, because that sandbox reaches no network \u2014 the same rule that makes a remote <img> fail."
            }
          >
            <CodePanel title={"share.js"} lines={EXPORT} />
          </FeatureCard>

          <FeatureCard
            slot={"feature-media-slot"}
            reveal={"2"}
            id={"feature-text"}
            title={"Real text, not a canvas"}
            description={
              "The paper is styling wrapped around your markup, so everything a browser does with text still works. This panel is the check, not a claim about it \u2014 select the receipt in the demo below and you will find the words."
            }
          >
            <StatusPanel
              status={"tear-line · light DOM"}
              live
              rows={[
                { label: "Selectable", done: true },
                { label: "Searchable (⌘F)", done: true },
                { label: "Translatable", done: true },
                { label: "Screen-reader order", done: true },
                { label: "Headings stay headings", done: true },
                { label: "Tables stay tables", done: true },
                { label: "prefers-reduced-motion", done: true },
              ]}
            />
          </FeatureCard>

          <FeatureCard
            slot={"feature-demo-slot"}
            reveal={"32"}
            id={"feature-seed"}
            title={"Same seed, same paper \u2014 and a named failure when it stops"}
            description={
              "The torn edge and the barcode come out of a seed, so a receipt renders identically every time and the export matches what your user saw. When an export does stop it says which of the four steps it stopped at: serialise fails on markup that is not valid XML, rasterise fails on an <img> pointing at a URL rather than a data: URI because the SVG sandbox cannot reach the network, and encode fails when the canvas is larger than the browser allows \u2014 use a narrower width or scale 1. Those are the limits, and they are the browser\u2019s, not a quota of ours."
            }
          >
            <ColumnsPanel
              status={"deterministic"}
              columns={[
                { label: "ORDER 4471", body: seedCol("4471", "edge · a1f2") },
                { label: "ORDER 4472", body: seedCol("4472", "edge · 7c09") },
                { label: "ORDER 4471", body: seedCol("4471", "edge · a1f2") },
              ]}
            />
          </FeatureCard>

          <FeatureCard
            slot={"feature-preview-slot"}
            reveal={"33"}
            id={"feature-anywhere"}
            title={"Install path — two of them, both live"}
            description={
              "npm i @kynth/tearline \u2014 0.1.0, published 13 August 2026, and two export fixes behind the hosted file; or a <script type=\"module\"> tag at tearline.kynth.studio/tearline.js, which is the current one. It is a custom element either way, so React, Vue, Svelte, Astro and a plain static file all take it unchanged. The install section says exactly what the difference is."
            }
          >
            <CodePanel title={"Order.jsx"} lines={FRAMEWORKS} />
          </FeatureCard>

          <FeatureCard
            slot={"feature-visual-slot"}
            reveal={"0"}
            id={"feature-deps"}
            title={"Free, MIT, and nothing is for sale"}
            description={
              "No build step, no runtime, no peer deps \u2014 one file you can read in an afternoon. It is free and there is no checkout, no account and no key, because there is no service to sell you: it runs on your page. Nothing here is sponsored or paid for. Bugs and unsupported-input surprises go to the GitHub issues, and the docs are corrected alongside the fix."
            }
          >
            <CodePanel title={"package.json"} lines={PKG} gutter={false} />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
