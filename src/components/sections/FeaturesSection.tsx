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
                  {"Features"}
                </p>
              </div>
            </div>
            <div
              className={"features-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"Paper is a rendering target"}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"you already know how to write"}
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
                  "No canvas API, no template language, no image service. Markup goes in, paper comes out."
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
            title={"Wrap anything"}
            description={
              "Headings, rules, tables, lists, images. If it renders in HTML it prints on paper — you are not learning a receipt DSL."
            }
          >
            <CodePanel title={"run.html"} lines={WRAP} />
          </FeatureCard>

          <FeatureCard
            slot={"feature-image-slot"}
            reveal={"1"}
            id={"feature-export"}
            title={"Hand them a PNG"}
            description={
              "One call turns the receipt into an image, at any scale, ready to post."
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
              "The paper is styling wrapped around your markup, so everything a browser does with text still works."
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
            title={"Same seed, same paper"}
            description={
              "The torn edge and the barcode are generated from a seed, so a receipt renders identically every time — and the export matches what your user actually saw."
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
            title={"Drops in anywhere"}
            description={
              "It is a custom element. React, Vue, Svelte, Astro, or a script tag in a static file."
            }
          >
            <CodePanel title={"Order.jsx"} lines={FRAMEWORKS} />
          </FeatureCard>

          <FeatureCard
            slot={"feature-visual-slot"}
            reveal={"0"}
            id={"feature-deps"}
            title={"Zero dependencies"}
            description={
              "No build step, no runtime, no peer deps. One file you can read in an afternoon."
            }
          >
            <CodePanel title={"package.json"} lines={PKG} gutter={false} />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
