import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import Copyable from "@/components/Copyable";

/**
 * Install and API reference.
 *
 * Takes the Integrations slot. The donor filled it with a grid of twelve
 * third-party logos; this product integrates with the DOM, so there is nothing
 * honest to put in those tiles — and the one thing a developer-tool landing
 * page cannot be missing is the install command.
 *
 * The shell is the FEATURES section's, not the Integrations one it replaces:
 * `integrationssection-content` is `flex-flow: row` with its heading pinned at
 * `width: 1px; flex: 1 0 0px`, which is correct for a heading beside a logo
 * grid and collapses the heading to one character per line the moment you put a
 * third child in it. The features shell is a column, which is what a stack of
 * documentation needs.
 *
 * The two-column body is new — nothing in the template holds a reference table
 * — and takes its measurements from the code window so it stays in family.
 *
 * 2026-08-12: this section now also carries the home page's only in-body links
 * to the four content pages. Before today every link from / to /dom-to-png,
 * /receipt-ui, /spotify-receipt-generator and /share-image-custom-element lived
 * in SiteFooter.tsx and nowhere else — a sitewide boilerplate nav, which is the
 * weakest inbound signal a page can have, and Google had four of those five
 * subpages back at "URL is unknown to Google" this morning. They are placed
 * here rather than in the FAQ because the FAQ's answers sit in a collapsed
 * accordion, and because each one already had a paragraph it genuinely belongs
 * in: the foreignObject note wants /dom-to-png, the upgrade-in-place note wants
 * /share-image-custom-element, the --ink/--paper note wants /receipt-ui, and
 * the usage snippet wants the live-data case. Each link is a sentence a reader
 * of that paragraph would want next, not a "related posts" strip. Do not
 * convert them into one.
 */

const USAGE: Line[] = [
  [
    ["<", "text"],
    ["script", "tag"],
    [" ", "text"],
    ["type", "attr"],
    ["=", "text"],
    ['"module"', "str"],
    [" ", "text"],
    ["src", "attr"],
    ["=", "text"],
    ['"/tearline.js"', "str"],
    ["></", "text"],
    ["script", "tag"],
    [">", "text"],
  ],
  [["", "text"]],
  [
    ["<", "text"],
    ["tear-line", "tag"],
    [" ", "text"],
    ["barcode", "attr"],
    ["=", "text"],
    ['"04732026"', "str"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["h1", "tag"],
    [">", "text"],
    ["Meridian", "text"],
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
    ["p", "tag"],
    [">", "text"],
    ["Cortado · 4.25", "text"],
    ["</", "text"],
    ["p", "tag"],
    [">", "text"],
  ],
  [
    ["</", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
];

const ATTRS: [string, string, string][] = [
  ["width", "330", "Paper width in pixels."],
  [
    "seed",
    "1",
    "Any integer. The same seed always produces the same torn edge and the same barcode, so a receipt renders identically every time — and the export matches what the user saw.",
  ],
  [
    "barcode",
    "—",
    "The digits printed under the bars. Omit for no barcode. Decorative: it is not a scannable Code 128 and does not pretend to be.",
  ],
  ["tilt", "-1.15", "Rotation in degrees."],
  ["flat", "—", "No rotation, no shadow. For embedding inside another layout."],
  [
    "animate",
    "—",
    "Prints out on first paint, like paper feeding from a till. Skipped under prefers-reduced-motion.",
  ],
];

const METHODS: [string, string][] = [
  ["toBlob({ scale })", "Resolves to a PNG Blob. Scale defaults to 2."],
  ["toDataURL({ scale })", "Resolves to a PNG data URL."],
  ["download(name, { scale })", "Saves the PNG."],
];

export default function InstallSection() {
  return (
    <section
      className={"featuressection-features-section"}
      data-border={"true"}
      data-name={"Install Section"}
      id={"install"}
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
                      "var(--extracted-r6o4lv, var(--color-background, #f2ece1))",
                  }}
                >
                  {"Install"}
                </p>
              </div>
            </div>
            <div
              className={"features-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"One tag."}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"No build step."}
                </span>
              </h2>
            </div>
          </div>
        </div>

        <div className={"tl-docs"} data-reveal={"2"}>
            <div className={"tl-docs-col"}>
              {/* The npm row is gone, not reworded. `npm i tearline` was the
                * first thing on this section and it fails: the package is
                * unpublished (FACTS.json → npm-package-published; the registry
                * returned 404 again on 2026-07-29, and package.json still
                * carries "private": true). An install command that errors in
                * the reader's terminal costs more trust than the convenience
                * ever bought. The script tag below is verified reachable and
                * is the whole install — it comes back the moment the package
                * ships. */}
              <p className={"tl-docs-label"}>{"drop in a script tag"}</p>
              <Copyable
                prompt={"<>"}
                text={
                  'https://tearline.kynth.studio/tearline.js'
                }
              />
              <p className={"tl-docs-note"}>
                {
                  "That is the install. It is an ES module served from this origin, so there is no package to add, no bundler to configure and no build step — the custom element registers itself on load and every "
                }
                <code>{"<tear-line>"}</code>
                {" on the page upgrades in place. That upgrade order is a WHATWG rule rather than a Tearline one, and it is why the tag can ship in your HTML before the script that defines it — "}
                <a href={"/share-image-custom-element"}>
                  {"the four ways to build a share image"}
                </a>
                {" quotes the spec on it, and covers when a server render beats a browser one."}
              </p>
              <p className={"tl-docs-note"}>
                {
                  "Rendering to an image uses an SVG foreignObject, which is sandboxed and cannot fetch over the network. Text and styles are inlined for you, but an image inside the receipt must be a "
                }
                <code>{"data:"}</code>
                {
                  " URI. The export throws with a message saying so rather than handing you a receipt with a hole in it."
                }
              </p>
              <p className={"tl-docs-note"}>
                {"The technique underneath — serialise the node, paint the SVG, read the PNG back — and the tainted-canvas rule that makes most browser exports come out blank are "}
                <a href={"/dom-to-png"}>{"explained in full"}</a>
                {", alongside today's registry figures for the four packages that do the same job as a dependency."}
              </p>
            </div>

            <div className={"tl-docs-col"}>
              <p className={"tl-docs-label"}>{"then wrap anything"}</p>
              <CodePanel title={"index.html"} lines={USAGE} />
              <p className={"tl-docs-note"}>
                {"That is the whole of it for a receipt you already have the markup for. Assembling one from live data is a different job — the Receiptify-style case, with Spotify's top-tracks endpoint and the five-user cap that stops most of these apps ever shipping, is "}
                <a href={"/spotify-receipt-generator"}>{"worked through end to end"}</a>
                {"."}
              </p>
          </div>
        </div>

        <div className={"tl-api"} id={"api"}>
          <div className={"tl-api-col"}>
            <p className={"tl-docs-label"}>{"attributes"}</p>
            <table className={"tl-table"}>
              <tbody>
                {ATTRS.map(([name, def, desc]) => (
                  <tr key={name}>
                    <td className={"tl-td-name"}>
                      <code>{name}</code>
                    </td>
                    <td className={"tl-td-def"}>{def}</td>
                    <td className={"tl-td-desc"}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={"tl-api-col"}>
            <p className={"tl-docs-label"}>{"methods"}</p>
            <table className={"tl-table"}>
              <tbody>
                {METHODS.map(([name, desc]) => (
                  <tr key={name}>
                    <td className={"tl-td-name"}>
                      <code>{name}</code>
                    </td>
                    <td className={"tl-td-desc"}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className={"tl-docs-label tl-docs-label-gap"}>{"accessibility"}</p>
            <p className={"tl-docs-note"}>
              {"The receipt is "}
              <strong>{"real text in the light DOM"}</strong>
              {
                " — not a canvas and not an image. It is selectable, searchable, translatable, and read by screen readers in document order, because the paper is styling wrapped around your markup. Ink and paper are exposed as "
              }
              <code>{"--ink"}</code>
              {" and "}
              <code>{"--paper"}</code>
              {" so you can raise contrast past the default receipt look."}
            </p>
            <p className={"tl-docs-note"}>
              {"How the paper is built out of those two tokens — the monospace grid, the tabular figures, the dashed rules, the SVG-turbulence fibre layer and the clip-path tear — is "}
              <a href={"/receipt-ui"}>{"a separate write-up in copyable CSS"}</a>
              {"."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
