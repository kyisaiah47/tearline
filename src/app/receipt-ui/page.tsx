import type { Metadata } from "next";
import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * "Receipt-style UI on the web."
 *
 * The fourth page, and the second one that is not about Tearline. /dom-to-png
 * answered the export half of this product's measured queries — "export dom
 * element as image no dependencies", "generate shareable png from html in
 * browser". This answers the other half, which nothing on the host covered:
 * "receipt style ui component web", "custom element for share images", and the
 * wrapped-up-listening-history genre those queries mostly come from. The site
 * had four pages of prose about Tearline and none about the LOOK, which is the
 * thing people are actually searching for before they know a component exists.
 *
 * Same move as /dom-to-png: give the technique away in full. The CSS below is
 * enough to build the paper look without loading anything, and it is derived
 * from src/tearline.js — the file actually served at /tearline.js — not from a
 * recollection of how it works. If the component changes, this page is wrong,
 * which is the correct failure mode for a page that claims to describe it.
 *
 * The three external claims (the ::slotted cascade rule, the custom-element
 * name rule, tabular figures) were fetched on 2026-08-01 and are listed with
 * their sources in the final section. All three are spec behaviour rather than
 * dated announcements, so they decay slowly — but they are load-bearing here,
 * so they are on the register rather than assumed.
 *
 * No `data-reveal` anywhere: see the note in DocsShell.
 */

const SITE = "https://tearline.kynth.studio";

const TITLE = "Receipt-style UI on the web — the CSS behind the paper look";
const DESCRIPTION =
  "How the thermal-receipt look is actually built: a monospace grid, tabular figures, dashed rules, an SVG-turbulence fibre layer and a clip-path tear. Plus why a share-image widget belongs in a custom element rather than a framework component.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/receipt-ui" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/receipt-ui`,
    siteName: "Tearline",
    type: "article",
    images: [
      {
        url: "/og.jpg",
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
  "@id": `${SITE}/receipt-ui#article`,
  url: `${SITE}/receipt-ui`,
  headline: "Receipt-style UI on the web",
  description: DESCRIPTION,
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
  proficiencyLevel: "Beginner",
  dependencies: "None. The look is CSS; the packaging is one browser API.",
  articleSection: [
    "The paper is CSS",
    "Type does the work",
    "Why a custom element",
    "Sources",
  ],
};

/* ---- content ------------------------------------------------------------ */

/**
 * Every declaration here is lifted from PAPER_CSS in src/tearline.js, the file
 * served at /tearline.js — the widths, the padding, the two hex values, the
 * 11.5px/1.62/.04em type block, the .34 fibre opacity and the dashed rule are
 * the shipped numbers, not illustrative ones. `font-variant-numeric` is the one
 * addition: the component does not set it, and it should, which is said out
 * loud in the prose beside this panel rather than quietly implied here.
 */
const PAPER_CSS: Line[] = [
  [["/* 1 — the paper itself */", "muted"]],
  [
    [".receipt", "fn"],
    [" {", "text"],
  ],
  [
    ["  width", "attr"],
    [": ", "text"],
    ["330px", "str"],
    [";", "text"],
  ],
  [
    ["  padding", "attr"],
    [": ", "text"],
    ["34px 26px 30px", "str"],
    [";", "text"],
  ],
  [
    ["  background-color", "attr"],
    [": ", "text"],
    ["#f6f3ec", "str"],
    [";", "text"],
  ],
  [
    ["  color", "attr"],
    [": ", "text"],
    ["#2b2724", "str"],
    [";", "text"],
  ],
  [
    ["  font-family", "attr"],
    [": ", "text"],
    ["ui-monospace, Menlo, monospace", "str"],
    [";", "text"],
  ],
  [
    ["  font-size", "attr"],
    [": ", "text"],
    ["11.5px", "str"],
    [";", "text"],
  ],
  [
    ["  line-height", "attr"],
    [": ", "text"],
    ["1.62", "str"],
    [";", "text"],
  ],
  [
    ["  letter-spacing", "attr"],
    [": ", "text"],
    [".04em", "str"],
    [";", "text"],
  ],
  [
    ["  font-variant-numeric", "attr"],
    [": ", "text"],
    ["tabular-nums", "str"],
    [";", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [["/* 2 — the fibre: one turbulence, multiplied over */", "muted"]],
  [
    [".receipt", "fn"],
    ["::before", "fn"],
    [" {", "text"],
  ],
  [
    ["  content", "attr"],
    [": ", "text"],
    ['""', "str"],
    ["; ", "text"],
    ["position", "attr"],
    [": ", "text"],
    ["absolute", "str"],
    ["; ", "text"],
    ["inset", "attr"],
    [": ", "text"],
    ["0", "str"],
    [";", "text"],
  ],
  [
    ["  opacity", "attr"],
    [": ", "text"],
    [".34", "str"],
    ["; ", "text"],
    ["mix-blend-mode", "attr"],
    [": ", "text"],
    ["multiply", "str"],
    [";", "text"],
  ],
  [
    ["  background-image", "attr"],
    [": ", "text"],
    ["url(", "text"],
    ['"data:image/svg+xml,…feTurbulence…"', "str"],
    [");", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [["/* 3 — the rules are ordinary <hr> elements */", "muted"]],
  [
    [".receipt hr", "fn"],
    [" {", "text"],
  ],
  [
    ["  border", "attr"],
    [": ", "text"],
    ["0", "str"],
    ["; ", "text"],
    ["margin", "attr"],
    [": ", "text"],
    ["13px 0", "str"],
    [";", "text"],
  ],
  [
    ["  border-top", "attr"],
    [": ", "text"],
    ["1px dashed rgba(40,36,33,.42)", "str"],
    [";", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [["/* 4 — headings print in tracked caps */", "muted"]],
  [
    [".receipt h1", "fn"],
    [" {", "text"],
  ],
  [
    ["  text-align", "attr"],
    [": ", "text"],
    ["center", "str"],
    ["; ", "text"],
    ["text-transform", "attr"],
    [": ", "text"],
    ["uppercase", "str"],
    [";", "text"],
  ],
  [
    ["  letter-spacing", "attr"],
    [": ", "text"],
    [".20em", "str"],
    ["; ", "text"],
    ["font-weight", "attr"],
    [": ", "text"],
    ["700", "str"],
    [";", "text"],
  ],
  [["}", "text"]],
];

/**
 * The class skeleton, reduced to the four things a share-image element needs.
 * Method bodies are elided on purpose — the real ones are at /tearline.js and
 * the export technique has its own page. What is being shown is the SHAPE.
 */
const ELEMENT_JS: Line[] = [
  [
    ["class", "kw"],
    [" ", "text"],
    ["Receipt", "fn"],
    [" ", "text"],
    ["extends", "kw"],
    [" ", "text"],
    ["HTMLElement", "fn"],
    [" {", "text"],
  ],
  [
    ["  ", "text"],
    ["static", "kw"],
    [" observedAttributes = [", "text"],
    ["'width'", "str"],
    [", ", "text"],
    ["'seed'", "str"],
    ["];", "text"],
  ],
  [["", "text"]],
  [
    ["  ", "text"],
    ["constructor", "fn"],
    ["() {", "text"],
  ],
  [
    ["    ", "text"],
    ["super", "kw"],
    ["();", "text"],
  ],
  [
    ["    ", "text"],
    ["this", "kw"],
    [".", "text"],
    ["attachShadow", "fn"],
    ["({ mode: ", "text"],
    ["'open'", "str"],
    [" });", "text"],
  ],
  [["  }", "text"]],
  [["", "text"]],
  [
    ["  ", "text"],
    ["// fires on first parse, not just on change", "muted"],
  ],
  [
    ["  ", "text"],
    ["attributeChangedCallback", "fn"],
    ["() { ", "text"],
    ["this", "kw"],
    [".", "text"],
    ["paint", "fn"],
    ["(); }", "text"],
  ],
  [["", "text"]],
  [
    ["  ", "text"],
    ["// the export lives ON the element", "muted"],
  ],
  [
    ["  ", "text"],
    ["async", "kw"],
    [" ", "text"],
    ["toBlob", "fn"],
    ["({ scale = ", "text"],
    ["2", "kw"],
    [" } = {}) { ", "text"],
    ["/* … */", "muted"],
    [" }", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [
    ["customElements", "fn"],
    [".", "text"],
    ["define", "fn"],
    ["(", "text"],
    ["'tear-line'", "str"],
    [", Receipt);", "text"],
    ["  // the hyphen is required", "muted"],
  ],
];

const TYPE_ROWS: [string, string, string][] = [
  [
    "font-family",
    "a monospace stack",
    "A thermal printer has a fixed character cell, so every receipt you have ever held is monospaced. This is the single decision that makes the look read; get it wrong and no amount of paper texture rescues it.",
  ],
  [
    "font-variant-numeric",
    "tabular-nums",
    "Per MDN, tabular figures are the set where numbers are all the same width, so they align like a table. Prices in a right-hand column stop jittering line to line — the difference between a receipt and a list of numbers.",
  ],
  [
    "letter-spacing",
    ".04em body · .20em headings",
    "Thermal heads over-ink slightly and the paper wicks, so real receipt type sits looser than screen type. Body gets a hair of tracking; the shop name gets a lot, which is what sells the caps.",
  ],
  [
    "font-size",
    "11.5px, line-height 1.62",
    "Small type on a narrow measure. The generous leading is doing the work — a receipt is mostly whitespace between short rules, and tight leading reads as a terminal instead.",
  ],
  [
    "text-transform",
    "uppercase on headings only",
    "Uppercase everything and it becomes unreadable rather than authentic. The header and the section labels are capitalised; the line items are not.",
  ],
  [
    "text-shadow",
    "0 0 .55px, ink-coloured",
    "A sub-pixel bloom in the ink colour. Thermal ink is never a crisp vector edge, and this is the cheapest approximation of that — it survives a 2× PNG export, where a blur filter would not.",
  ],
];

const ELEMENT_ROWS: [string, string][] = [
  [
    "a hyphen in the name",
    "MDN: the name \"must start with a lowercase letter, contain a hyphen, and satisfy certain other rules\". This is what keeps custom elements from ever colliding with a future built-in tag — and it is why every share-image widget you have seen is <something-something>.",
  ],
  [
    "observedAttributes",
    "A static array of the attributes you want change notifications for. MDN notes that if the element's HTML declaration includes an observed attribute, attributeChangedCallback() fires after the attribute is initialised, when the declaration is first parsed — so the same code path handles the first render and every later change.",
  ],
  [
    "attachShadow",
    "The look goes in a shadow tree and stops there: page CSS does not reach into it, and its CSS does not leak out. For a widget that has to look identical on someone else's site, that is the entire point.",
  ],
  [
    "the light DOM stays real",
    "Slotted content is still your markup, in the document, in order. It stays selectable, searchable, translatable and readable by a screen reader — which a <canvas> or an <img> is not. The picture is the export, not the page.",
  ],
];

const SOURCES: [string, string][] = [
  [
    "developer.mozilla.org — Using custom elements",
    "The valid-name rule (lowercase start, must contain a hyphen), customElements.define(), and the timing of attributeChangedCallback() on first parse. Fetched 1 August 2026.",
  ],
  [
    "w3.org — CSS Cascade and Inheritance Level 5",
    "The tree-context criterion in cascade sorting order: between encapsulation contexts, the declaration from the outer context wins for normal rules, and the inner context wins for important rules. Fetched 1 August 2026.",
  ],
  [
    "developer.mozilla.org — font-variant-numeric",
    "tabular-nums \"activating the set of figures where numbers are all of the same size, allowing them to be easily aligned like in tables\", mapping to the OpenType tnum feature. Fetched 1 August 2026.",
  ],
  [
    "tearline.kynth.studio/tearline.js",
    "The shipped implementation every measurement on this page was read out of — the paper CSS, the seeded tear polygon and the element class. 12.7 KB, unminified, HTTP 200 on 1 August 2026.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function ReceiptUi() {
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
                id={"paper"}
                eyebrow={"Method"}
                headingTop={"The paper is CSS."}
                headingBottom={"There is no image."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"what the look is made of"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "A receipt is one of the few UI looks that is entirely reachable with plain CSS, because everything that makes a receipt look like a receipt is a property that already exists. Narrow measure, monospace, small type on loose leading, dashed rules, tracked capitals. There is no illustration, no sprite and no font to license."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Four layers, in the order they matter. The paper is a background colour and a wide, uneven "
                      }
                      <code>{"linear-gradient"}</code>
                      {
                        " across the width — a warm falloff at both edges and a soft crease off-centre, which is what stops a flat rectangle reading as a card. The fibre is a single SVG "
                      }
                      <code>{"feTurbulence"}</code>
                      {" as a data URI, laid over the whole element at "}
                      <code>{"mix-blend-mode: multiply"}</code>
                      {
                        " and about a third opacity: it is grain, not texture, and at full strength it looks like a filter. The rules are ordinary "
                      }
                      <code>{"<hr>"}</code>
                      {
                        " elements with a dashed top border. The type does the rest, and it has its own section below."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the torn edge"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The tear is a "}
                      <code>{"clip-path"}</code>
                      {
                        " polygon, generated once. Fifty-eight steps across the top and the same across the bottom; each point sits a few pixels in, with roughly a one-in-six chance of a deeper nick. That ratio is the whole trick — paper ripped off a printer is mostly straight with occasional ragged bites, so an even zigzag reads as a decorative border rather than a tear."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Generate it from a seeded PRNG rather than from randomness. A receipt that reshuffles its own edge on every render is unsettling on screen, and — more practically — an export taken a frame later will not match the shape the reader was looking at."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"receipt.css"}</p>
                    <CodePanel title={"receipt.css"} lines={PAPER_CSS} />
                    <p className={"tl-docs-note"}>
                      {
                        "These are the shipped values, read out of the component served at "
                      }
                      <a href={"/tearline.js"}>{"/tearline.js"}</a>
                      {" on 1 August 2026 — not illustrative ones. One line is an addition rather than a quote: "}
                      <code>{"font-variant-numeric"}</code>
                      {
                        " is not currently set by the component and should be. Copy the block above and you have the look without loading anything."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"type"}
                eyebrow={"Type"}
                headingTop={"Monospace does"}
                headingBottom={"most of the work."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"property · value · why"}
                      rows={TYPE_ROWS}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"the one to get right"}</p>
                    <p className={"tl-docs-note"}>
                      {"If you only take one line from this page, take "}
                      <code>{"font-variant-numeric: tabular-nums"}</code>
                      {
                        ". Most monospace stacks give it to you already, but the moment someone overrides the font — and on a share image built from a listening history, a spend summary or a sports scoreline, someone always does — proportional figures come back and the right-hand column starts wobbling. MDN describes tabular figures as the set where numbers are all the same size so they align like a table, which is exactly the job."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"what not to reach for"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Skip the crumple-paper photograph, the drop-shadowed cardstock and the 3D fold. They are three different aesthetics wearing a receipt costume, and none of them survives being rasterised into a 1,200px-wide share image — the detail that sold the effect at full size turns to mush at export scale."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The same goes for a real barcode. A decorative row of varied bars reads correctly at a glance; a scannable Code 128 that encodes nothing meaningful invites someone to scan it and file a bug. Vary the bar widths, print digits underneath, and say in your docs that it is decoration."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"element"}
                eyebrow={"Packaging"}
                headingTop={"One tag."}
                headingBottom={"Why a custom element."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"what the platform gives you for free"}
                      rows={ELEMENT_ROWS}
                    />
                    <p className={"tl-docs-note"}>
                      {
                        "A share-image widget is the case custom elements were designed for. It has a hard visual contract, it is dropped into pages whose CSS you will never see, and it has to work the same in React, Vue, Svelte, Astro and a static file with a script tag. A framework component gives you one of those; a custom element gives you all five, because it is just HTML."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"element.js"}</p>
                    <CodePanel title={"element.js"} lines={ELEMENT_JS} />
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"encapsulation is not a cage"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The usual objection to shadow DOM is that users cannot restyle it. For slotted content that is backwards, and the spec says so: in "}
                      <code>{"CSS Cascade 5"}</code>
                      {
                        "'s sorting order, when two declarations come from different encapsulation contexts, the outer context wins for normal rules and the inner context wins for important ones. So a "
                      }
                      <code>{"::slotted()"}</code>
                      {
                        " rule inside the component is a default that any ordinary rule on the host page beats, with no specificity fight and no !important arms race. Style the parts you want; the rest stays styled."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The other reason to package it this way: the export belongs on the element. A component that renders the picture and a separate library that rasterises it are two things to keep in sync, and the second one has to be told how to find the first. Put "
                      }
                      <code>{"toBlob()"}</code>
                      {" on the element and the widget owns its own output. How that export actually works — and the two ways it fails — is written up at "}
                      <a href={"/dom-to-png"}>
                        {"export a DOM element as a PNG"}
                      </a>
                      {"."}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "There is a second argument for the element boundary that is stronger than either of those, because it is a guarantee written into the HTML Standard rather than a matter of taste: an element whose defining script has not loaded yet is not an error, and gets upgraded in place when the script arrives. Which means the tag can sit in server-rendered HTML, a CMS field or someone else's template while the script loads late. That, and the client-versus-server fork behind any share image, is "
                      }
                      <a href={"/share-image-custom-element"}>
                        {"compared separately"}
                      </a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"sources"}
                eyebrow={"Sources"}
                headingTop={"Every claim here."}
                headingBottom={"Fetched, not remembered."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <RefTable label={"checked 1 August 2026"} rows={SOURCES} />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"and the working version"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Everything above is buildable from scratch — that is the point of writing it out. If you would rather not, Tearline is the same technique as one tag: wrap your markup in "
                      }
                      <code>{"<tear-line>"}</code>
                      {
                        " and it renders as the receipt and exports itself as a PNG. Zero dependencies, no build step, MIT. The "
                      }
                      <a href={"/docs"}>{"full attribute and method reference"}</a>
                      {" covers the rest, and the "}
                      <a href={"/"}>{"playground on the home page"}</a>
                      {" edits a live one."}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Spec behaviour decays more slowly than a version number, but it does decay — cascade rules get revised and browser support moves. Each claim above carries the date it was read, and the source link is the authority, not this page."
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
