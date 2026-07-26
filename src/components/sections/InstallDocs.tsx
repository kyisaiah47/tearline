import Copyable from "@/components/Copyable";

/**
 * Install + usage + API reference. Merged in from the standalone static docs
 * site so the product has ONE page, not a landing and a separate doc site.
 * Styling reuses the template's tokens (Chakra Petch headings, IBM Plex Mono
 * body, sand borders, red accent) rather than introducing a second look.
 */

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
    "The digits printed under the bars. Omit for no barcode. Decorative; it is not a scannable Code 128, and it does not pretend to be.",
  ],
  ["tilt", "-1.15", "Rotation in degrees."],
  ["flat", "—", "No rotation, no drop shadow. For embedding inside another layout."],
  [
    "animate",
    "—",
    "Prints out on first paint, like paper feeding from a till. Skipped under prefers-reduced-motion.",
  ],
];

const METHODS: [string, string][] = [
  ["toBlob({scale})", "Resolves to a PNG Blob. Scale defaults to 2."],
  ["toDataURL({scale})", "Resolves to a PNG data URL."],
  ["download(name, {scale})", "Saves the PNG."],
];

export default function InstallDocs() {
  return (
    <section className={"tl-section tl-section-alt"} id={"install"}>
      <div className={"tl-shell"}>
        <div className={"tl-section-head"}>
          <p className={"tl-eyebrow"}>{"02/ Install"}</p>
          <h2 className={"tl-heading"}>
            {"One tag. "}
            <span className={"tl-accent"}>{"No build step."}</span>
          </h2>
        </div>

        <div className={"tl-install-grid"}>
          <div>
            <p className={"tl-label"}>{"From npm"}</p>
            <Copyable text={"npm i tearline"} />
            <p className={"tl-label tl-label-gap"}>
              {"Or straight from a script tag"}
            </p>
            <Copyable
              label={"<>"}
              text={
                '<script type="module" src="https://tearline.kynth.studio/tearline.js"></script>'
              }
            />
          </div>

          <div>
            <p className={"tl-label"}>{"Then wrap anything"}</p>
            <pre className={"tl-pre"}>
              <code>{`<tear-line barcode="047320260726">
  <h1>Meridian</h1>
  <hr>
  <p>Cortado &middot; 4.25</p>
</tear-line>`}</code>
            </pre>
            <p className={"tl-label tl-label-gap"}>
              {"And hand your users an image"}
            </p>
            <pre className={"tl-pre"}>
              <code>{`const el = document.querySelector('tear-line');

await el.download('receipt.png');
const blob = await el.toBlob();`}</code>
            </pre>
          </div>
        </div>

        <div className={"tl-api"}>
          <div className={"tl-api-col"}>
            <p className={"tl-label"}>{"Attributes"}</p>
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
            <p className={"tl-label"}>{"Methods"}</p>
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

            <p className={"tl-label tl-label-gap"}>
              {"One export caveat"}
            </p>
            <p className={"tl-note"}>
              {
                "Rendering to an image uses an SVG foreignObject, which is sandboxed and cannot fetch over the network. Text and styles are inlined for you — but an image inside the receipt must be a data: URI or it will be missing from the PNG. The export throws with a message saying so rather than handing you a receipt with a hole in it."
              }
            </p>
          </div>
        </div>

        <div className={"tl-a11y"}>
          <p className={"tl-label"}>{"Accessibility"}</p>
          <p className={"tl-note"}>
            {"The receipt is "}
            <strong>{"real text in the light DOM"}</strong>
            {
              ", not a canvas and not an image. It is selectable, searchable, translatable, and read by screen readers in document order — the paper is styling wrapped around your markup, so your headings stay headings and your tables stay tables."
            }
          </p>
          <p className={"tl-note"}>
            {"The print-out animation is skipped entirely under "}
            <code>{"prefers-reduced-motion"}</code>
            {". Ink and paper colours are exposed as CSS custom properties ("}
            <code>{"--ink"}</code>
            {", "}
            <code>{"--paper"}</code>
            {") so you can raise contrast past the default receipt look where you need to."}
          </p>
        </div>
      </div>
    </section>
  );
}
