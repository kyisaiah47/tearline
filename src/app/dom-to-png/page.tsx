import type { Metadata } from "next";
import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * "Export a DOM element as a PNG."
 *
 * The third page on the host, and the first one that is not about Tearline.
 * The measured queries this product is watched on are mostly not brand terms —
 * they are "export dom element as image no dependencies", "generate shareable
 * png from html in browser", "html to receipt image javascript" — and the
 * domains that get cited for them are github.com and stackoverflow.com. Those
 * are not competitors to compare against; they are where the ANSWER currently
 * lives. So this page answers the question directly, and only says where
 * Tearline fits at the end, including where it does not fit.
 *
 * Every factual number on this page was fetched on 2026-07-31 and is listed
 * with its source in the final section. The npm figures come from
 * registry.npmjs.org; the tainted-canvas rule comes from MDN. Nothing here is
 * quoted from memory — a remembered version number is a wrong version number,
 * and this page's whole value is that its numbers are checkable.
 *
 * The technique description is written against src/tearline.js, which is the
 * implementation actually served at /tearline.js. Claims about how the OTHER
 * four packages work internally are deliberately absent: their metadata was
 * fetched, their source was not, so the table reports only what the registry
 * returned.
 *
 * Section shells come from @/components/DocsShell — the same InstallSection
 * markup /docs uses. No `data-reveal` anywhere: see the note in DocsShell.
 */

const SITE = "https://tearline.kynth.studio";

const TITLE = "Export a DOM element as a PNG in the browser — no dependencies";
const DESCRIPTION =
  "Export a DOM element as a PNG in the browser: serialise it into an SVG foreignObject, paint it to a canvas, read it back. Plus the tainted-canvas rule.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/dom-to-png" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/dom-to-png`,
    siteName: "Tearline",
    type: "article",
    images: [
      {
        url: "/og-20260827.jpg",
        width: 1200,
        height: 630,
        alt: "Tearline — any HTML, printed as a receipt",
      },
    ],
  },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${SITE}/dom-to-png#article`,
  url: `${SITE}/dom-to-png`,
  headline: "Export a DOM element as a PNG in the browser",
  description: DESCRIPTION,
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-07-31",
  dateModified: "2026-07-31",
  proficiencyLevel: "Intermediate",
  dependencies: "None. The technique is four browser APIs and no library.",
  articleSection: [
    "How rasterisation works",
    "Why exports come out blank",
    "Zero-dependency packages",
    "Sources",
  ],
};

/* ---- content ------------------------------------------------------------ */

const RASTERISE: Line[] = [
  [
    ["// 1. serialise — XMLSerializer, never innerHTML", "muted"],
  ],
  [
    ["const", "kw"],
    [" xhtml = ", "text"],
    ["new", "kw"],
    [" ", "text"],
    ["XMLSerializer", "fn"],
    ["().", "text"],
    ["serializeToString", "fn"],
    ["(node);", "text"],
  ],
  [["", "text"]],
  [["// 2. wrap it in an SVG foreignObject", "muted"]],
  [
    ["const", "kw"],
    [" NS = ", "text"],
    ["'http://www.w3.org/2000/svg'", "str"],
    [";", "text"],
  ],
  [
    ["const", "kw"],
    [" svg =", "text"],
  ],
  [
    ["  ", "text"],
    ['`<svg xmlns="${NS}" width="${w}" height="${h}">`', "str"],
    [" +", "text"],
  ],
  [
    ["  ", "text"],
    ['`<foreignObject width="100%" height="100%">`', "str"],
    [" +", "text"],
  ],
  [
    ["  ", "text"],
    ["`${xhtml}</foreignObject></svg>`", "str"],
    [";", "text"],
  ],
  [["", "text"]],
  [["// 3. decode it as an image", "muted"]],
  [
    ["const", "kw"],
    [" img = ", "text"],
    ["new", "kw"],
    [" ", "text"],
    ["Image", "fn"],
    ["();", "text"],
  ],
  [
    ["const", "kw"],
    [" uri = ", "text"],
    ["'data:image/svg+xml;charset=utf-8,'", "str"],
    [";", "text"],
  ],
  [
    ["img.src = uri + ", "text"],
    ["encodeURIComponent", "fn"],
    ["(svg);", "text"],
  ],
  [
    ["await", "kw"],
    [" img.", "text"],
    ["decode", "fn"],
    ["();", "text"],
  ],
  [["", "text"]],
  [["// 4. paint to a canvas and read the PNG back", "muted"]],
  [
    ["const", "kw"],
    [" canvas = document.", "text"],
    ["createElement", "fn"],
    ["(", "text"],
    ["'canvas'", "str"],
    [");", "text"],
  ],
  [
    ["canvas.width = w * scale; canvas.height = h * scale;", "text"],
  ],
  [
    ["const", "kw"],
    [" ctx = canvas.", "text"],
    ["getContext", "fn"],
    ["(", "text"],
    ["'2d'", "str"],
    [");", "text"],
  ],
  [
    ["ctx.", "text"],
    ["scale", "fn"],
    ["(scale, scale); ctx.", "text"],
    ["drawImage", "fn"],
    ["(img, ", "text"],
    ["0", "kw"],
    [", ", "text"],
    ["0", "kw"],
    [");", "text"],
  ],
  [
    ["canvas.", "text"],
    ["toBlob", "fn"],
    ["((blob) => ", "text"],
    ["/* your PNG */", "muted"],
    [", ", "text"],
    ["'image/png'", "str"],
    [");", "text"],
  ],
];

const TEARLINE_API: Line[] = [
  [
    ["const", "kw"],
    [" el = document.", "text"],
    ["querySelector", "fn"],
    ["(", "text"],
    ["'tear-line'", "str"],
    [");", "text"],
  ],
  [["", "text"]],
  [
    ["await", "kw"],
    [" el.", "text"],
    ["toBlob", "fn"],
    ["({ scale: ", "text"],
    ["2", "kw"],
    [" });", "text"],
    ["      // Blob", "muted"],
  ],
  [
    ["await", "kw"],
    [" el.", "text"],
    ["toDataURL", "fn"],
    ["();", "text"],
    ["             // string", "muted"],
  ],
  [
    ["await", "kw"],
    [" el.", "text"],
    ["download", "fn"],
    ["(", "text"],
    ["'receipt.png'", "str"],
    [");", "text"],
    ["  // saves it", "muted"],
  ],
];

/**
 * Every cell here is a field returned by registry.npmjs.org on 2026-07-31.
 * "runtime deps" is the length of the `dependencies` object on the latest
 * version — not devDependencies, and not a bundle-size measurement.
 */
const PACKAGES: [string, string, string][] = [
  [
    "modern-screenshot",
    "4.7.0 · 0 deps · MIT",
    "16 Apr 2026 · 186 KB",
  ],
  ["html-to-image", "1.11.13 · 0 deps · MIT", "14 Feb 2025 · 315 KB"],
  ["html2canvas", "1.4.1 · 2 deps · MIT", "22 Jan 2022 · 3.38 MB"],
  ["dom-to-image", "2.6.0 · 0 deps · MIT", "4 Oct 2017 · size not reported"],
];

const FAILURES: [string, string][] = [
  [
    "a remote <img>",
    "The SVG is loaded as a data: URI, so it has no origin that can fetch anything. Inline the image as a data: URI before you serialise.",
  ],
  [
    "a webfont",
    "Same sandbox: an @font-face pointing at a URL will not be fetched. The text renders in a fallback face, or in nothing.",
  ],
  [
    "a stylesheet",
    "Styles are not inherited into the foreignObject from the parent document. Whatever CSS you need has to be inlined into the serialised markup.",
  ],
  [
    "innerHTML",
    "A foreignObject is parsed as strict XML. Void elements written HTML-style — <hr>, <br>, an unquoted attribute — are fatal parse errors, and the image simply fails to decode. XMLSerializer is the only serialiser that self-closes and namespaces correctly.",
  ],
  [
    "a live animation",
    "Whatever frame the element is on when you serialise is the frame you get. Freeze or disable animations on the clone first.",
  ],
];

const SOURCES: [string, string][] = [
  [
    "registry.npmjs.org",
    "Version, licence, runtime dependency count, publish date and unpacked size for html-to-image, modern-screenshot, html2canvas and dom-to-image. Fetched 31 July 2026.",
  ],
  [
    "developer.mozilla.org",
    "The tainted-canvas rule: drawing cross-origin data without CORS approval makes toBlob(), toDataURL() and captureStream() throw a SecurityError. Fetched 31 July 2026.",
  ],
  [
    "tearline.kynth.studio/tearline.js",
    "The Tearline implementation described above — 13.7 KB, served unminified, HTTP 200 on 7 August 2026. It is the whole component; there is nothing else to read.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function DomToPng() {
  return (
    <>
      <SmoothScroll />
      <JsonLd data={ARTICLE_SCHEMA} />
      <div id={"main"}>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ":root body { background: var(--token-2677a7ab-1420-48e4-957c-83a3935eeb1d, rgb(26, 26, 26)); } :root { font-size: 93.75%; }",
          }}
        />
        <div
          className={"page-root-mobile page-root"}
          data-layout-template={"true"}
          style={{ minHeight: "100vh", width: "auto" }}
        >
          <SiteHeader />
          <div
            className={
              "page-body section-wrapper faqsection-closed-3 footer-inner page-wrapper"
            }
            style={{ width: "auto", display: "contents" }}
          >
            <main className={"page"} data-name={"Main"}>
              <DocsSection
                id={"method"}
                eyebrow={"Method"}
                headingTop={"Serialise the node."}
                headingBottom={"Paint the SVG."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the whole technique"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Turning part of a page into a PNG without a server is four browser APIs and no library. You serialise the element to XHTML, wrap that string in an SVG "
                      }
                      <code>{"<foreignObject>"}</code>
                      {
                        ", hand the SVG to an "
                      }
                      <code>{"Image"}</code>
                      {
                        " as a data URI, and draw the decoded image onto a canvas. The canvas gives you a Blob or a data URL."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The reason this works at all is that a browser will happily rasterise arbitrary HTML if you ask it to as part of rendering an SVG. You are not reimplementing a layout engine — you are borrowing the one already in the room. That is also why it is fast, and why the output matches what the user saw rather than approximating it."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the trade"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Because the SVG is loaded as a data URI, it is a sandbox with no origin. It cannot fetch an image, a font or a stylesheet. Everything the picture needs has to be inside the string before you serialise it. That single constraint is behind almost every "
                      }
                      <em>{"why is my export blank"}</em>
                      {" question, and it has its own section below."}
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"rasterise.js"}</p>
                    <CodePanel title={"rasterise.js"} lines={RASTERISE} />
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"blank"}
                eyebrow={"Limits"}
                headingTop={"Why your export"}
                headingBottom={"comes out blank."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"what silently does not survive"}
                      rows={FAILURES}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"the other failure"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "There is a second, louder way this breaks, and it is a security rule rather than a sandbox one. Per MDN, as soon as you draw data loaded from another origin without CORS approval, the canvas becomes "
                      }
                      <strong>{"tainted"}</strong>
                      {", and calling "}
                      <code>{"toBlob()"}</code>
                      {", "}
                      <code>{"toDataURL()"}</code>
                      {" or "}
                      <code>{"captureStream()"}</code>
                      {" on it throws a "}
                      <code>{"SecurityError"}</code>
                      {
                        ". The pixels are on screen; you are just not allowed to read them back. This protects people from having a page use images to pull data out of remote sites without permission."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "So the two failure modes look different and want different fixes. A blank or half-drawn PNG means something did not load inside the sandbox — inline it. A thrown SecurityError means something cross-origin did load and poisoned the canvas — serve it same-origin, or as a data URI, or with CORS headers and "
                      }
                      <code>{"crossOrigin"}</code>
                      {" set."}
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"a note on scale"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Set the canvas to a multiple of the measured size and scale the context by the same factor before drawing. Exporting at 1× on a retina display is the most common reason a share image looks soft next to the page it came from."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"packages"}
                eyebrow={"Alternatives"}
                headingTop={"Four packages."}
                headingBottom={"Today's numbers."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={
                        "general-purpose · version, deps, licence · published, size"
                      }
                      rows={PACKAGES}
                    />
                    <p className={"tl-docs-note"}>
                      {
                        "Registry facts, not a review: latest version, declared runtime dependencies, licence, publish date and unpacked size, read from registry.npmjs.org on 31 July 2026. All four are MIT, and three of them declare no runtime dependencies at all."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      <code>{"html2canvas"}</code>
                      {
                        " is the exception on both counts — it pulls in css-line-break and text-segmentation, and it is roughly ten times the size of the others on disk. It is also the one that has gone longest without a release apart from "
                      }
                      <code>{"dom-to-image"}</code>
                      {
                        ", whose latest version is more than eight years old. None of that makes either one broken; plenty of people ship both. It is just what the registry says today."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "If you want a general-purpose rasteriser you can point at any node, one of these four is the right answer and Tearline is not."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "All four also share one hard limit: they need a browser. An Open Graph card is fetched by a crawler that will never run your JavaScript, so it has to be drawn on a server instead — a different set of packages, and a different licence. That fork, with today's figures for both sides, is "
                      }
                      <a href={"/share-image-custom-element"}>
                        {"compared separately"}
                      </a>
                      {"."}
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"where Tearline fits"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Tearline is not a general rasteriser. It is a custom element that renders whatever you wrap in it as a thermal receipt — paper texture, torn edge, barcode — and then exports "
                      }
                      <em>{"that"}</em>
                      {
                        " using the technique above. The export is a feature of the component, not a library you can point at an arbitrary div."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Which makes the choice easy. Need a PNG of some existing part of your page? Use one of the four. Need the receipt look — a wrapped-up listening history, an order summary, a share card built out of rules and monospace — and want the export to come with it? That is the whole of what this is for."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the export API"}
                    </p>
                    <CodePanel title={"export.js"} lines={TEARLINE_API} />
                    <p className={"tl-docs-note"}>
                      {"The full attribute and method reference is in the "}
                      <a href={"/docs"}>
                        {"documentation"}
                      </a>
                      {", and the component itself is served unminified at "}
                      <a href={"/tearline.js"}>
                        {"/tearline.js"}
                      </a>
                      {". How the receipt look itself is built — the paper, the type and the torn edge, in copyable CSS — is a "}
                      <a href={"/receipt-ui"}>
                        {"separate write-up"}
                      </a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"sources"}
                eyebrow={"Sources"}
                headingTop={"Every number here."}
                headingBottom={"Fetched, not remembered."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <RefTable label={"checked 31 July 2026"} rows={SOURCES} />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"why this is here"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Package versions and publish dates go stale, and a page that quotes them from memory is wrong within weeks without ever looking wrong. Every figure above carries the date it was read, so you can tell at a glance how much to trust it — and so can we, because this page is on a register that gets re-checked against these same sources."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "If a number here has drifted, the source link is the authority, not this page."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>
            </main>
          </div>
          <div id={"overlay"} />
          <div className={"spacer-block"} />
          <div className={"border"} data-border={"true"} data-name={"Border"} />
          <SiteFooter />
        </div>
        <div id={"template-overlay"} />
      </div>
    </>
  );
}
