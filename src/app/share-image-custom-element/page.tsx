import type { Metadata } from "next";
import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * "Custom element for share images."
 *
 * The fifth page on the host, and the one that answers the last of the six
 * measured buyer queries with nothing pointed at it. The other five queries
 * each have a page whose TITLE overlaps them — "export dom element as image no
 * dependencies" has /dom-to-png, "receipt style ui component web" has
 * /receipt-ui, "spotify receiptify style generator library" has
 * /spotify-receipt-generator. "custom element for share images" had the
 * argument scattered across /receipt-ui (why the look is a component) and
 * /dom-to-png (how the export works), and no page that answers the question
 * the phrase actually asks, which is a DECISION: client-side element, a
 * rasteriser you wire yourself, or render the image on a server.
 *
 * The fork this page exists for is the one neither older page covers: the
 * server-side route. Anyone building share images hits it immediately, because
 * an Open Graph card and a user-triggered download are the same output reached
 * two completely different ways.
 *
 * Every number was fetched on 2026-08-05 and is listed with its source at the
 * bottom. Package figures come from registry.npmjs.org; the custom-element
 * rules and the upgrade behaviour are quoted from the WHATWG HTML Standard,
 * which is the primary source rather than a summary of it.
 *
 * Re-fetched 2026-08-09 and the table DRIFTED for the first time: @vercel/og
 * published 1.0.1 on 2026-08-08 — its first stable major — superseding the
 * 0.11.1 / 6.95 MB / 5 Mar 2026 row this page had carried since it shipped. The
 * new row is 1.0.1 · 2 deps · MPL-2.0 · 6,888,530 bytes (6.89 MB) · 8 Aug 2026.
 * Licence and the two runtime dependencies (satori, @resvg/resvg-wasm) are
 * unchanged, so the MPL-2.0-carries-through point still holds and the
 * client-vs-server size argument is untouched — 6.89 MB is still three orders
 * of magnitude off 186 KB. satori, modern-screenshot and html-to-image were
 * re-fetched the same day and returned identical figures.
 *
 * The WHATWG quotations were NOT re-fetched today, so their source row still
 * reads 5 August 2026. Only the rows actually re-read carry today's date.
 *
 * Same discipline as /dom-to-png on other people's code: for satori,
 * @vercel/og, modern-screenshot and html-to-image the registry metadata was
 * fetched and the SOURCE WAS NOT, so this page reports what the registry
 * returned and nothing about how any of them work internally. The one
 * structural claim it does make about the server route — that it has no browser
 * layout engine to borrow — follows from running on a server, not from reading
 * satori.
 *
 * Section shells come from @/components/DocsShell. No `data-reveal` anywhere:
 * see the note in DocsShell.
 */

const SITE = "https://tearline.kynth.studio";

const TITLE =
  "Custom element for share images — 4 ways to generate one (2026)";
const DESCRIPTION =
  "Building a share image: a custom element that exports itself, a DOM-to-image library you wire up, or a server render with satori. Today's npm figures for all four, the WHATWG rules a custom element has to satisfy, and why the tag can ship before the script that defines it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/share-image-custom-element" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/share-image-custom-element`,
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
  "@id": `${SITE}/share-image-custom-element#article`,
  url: `${SITE}/share-image-custom-element`,
  headline: "Custom element for share images — four ways to generate one",
  description: DESCRIPTION,
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-08-05",
  dateModified: "2026-08-09",
  proficiencyLevel: "Intermediate",
  articleSection: [
    "Four routes to a share image",
    "Why the element boundary",
    "What the element has to implement",
    "Where Tearline fits",
    "Sources",
  ],
};

/* ---- content ------------------------------------------------------------ */

/**
 * Every cell is a field returned by registry.npmjs.org on 2026-08-05, plus one
 * row measured against the served file. "runtime deps" is the length of the
 * `dependencies` object on the latest version — not devDependencies, and not a
 * bundle-size measurement. Sizes are the registry's `unpackedSize` in decimal
 * units, which is what npm itself reports.
 */
const ROUTES: [string, string, string][] = [
  [
    "a custom element",
    "one script tag · 0 deps · MIT",
    "The element renders the thing AND exports it. Right when the user is looking at the artefact and wants a PNG of it on click. Tearline is 17,991 bytes served, HTTP 200 on 13 Aug 2026.",
  ],
  [
    "modern-screenshot",
    "4.7.0 · 0 deps · MIT · 186 KB · 16 Apr 2026",
    "A rasteriser you point at any node you already have on screen. Right when the share image is an existing part of the page rather than a purpose-built card.",
  ],
  [
    "html-to-image",
    "1.11.13 · 0 deps · MIT · 315 KB · 14 Feb 2025",
    "Same job, longer-standing. Also zero declared runtime dependencies. Both of these leave the markup, the styling and the click handler to you.",
  ],
  [
    "satori",
    "0.29.0 · 11 deps · MPL-2.0 · 5.43 MB · 23 Jul 2026",
    "Renders the image on a server, so no browser is involved and no user has to be present. Right for an Open Graph card, which a crawler has to fetch without running your app.",
  ],
  [
    "@vercel/og",
    "1.0.1 · 2 deps · MPL-2.0 · 6.89 MB · 8 Aug 2026",
    "The same server route packaged for a framework route handler. Its two declared runtime dependencies are satori and @resvg/resvg-wasm, so the licence is MPL-2.0 here too, not MIT.",
  ],
];

/** The four verbatim requirements from the HTML Standard, quoted not paraphrased. */
const NAME_RULES: [string, string][] = [
  [
    "a valid element local name",
    "The base requirement. Per the standard, this “ensures the custom element can be created with createElement()”.",
  ],
  [
    "starts with a lowercase letter",
    "“name’s 0th code point is an ASCII lower alpha” — which “ensures the HTML parser will treat the name as a tag name instead of as text”.",
  ],
  [
    "no capitals anywhere",
    "“name does not contain any ASCII upper alphas”, so that a user agent “can always treat HTML elements ASCII-case-insensitively”.",
  ],
  [
    "contains a hyphen",
    "“name contains a U+002D (-)”, for namespacing and forward compatibility — no hyphenated local names will be added to HTML, SVG or MathML going forward.",
  ],
  [
    "not one of eight reserved names",
    "annotation-xml, color-profile, font-face, font-face-src, font-face-uri, font-face-format, font-face-name, missing-glyph. All hyphenated names that already exist in SVG or MathML.",
  ],
];

const SKELETON: Line[] = [
  [["// the whole contract for a share-image element", "muted"]],
  [
    ["class", "kw"],
    [" ", "text"],
    ["ShareCard", "fn"],
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
    ["attributeChangedCallback", "fn"],
    ["() { ", "text"],
    ["this", "kw"],
    [".", "text"],
    ["render", "fn"],
    ["(); }", "text"],
  ],
  [
    ["  ", "text"],
    ["connectedCallback", "fn"],
    ["()      { ", "text"],
    ["this", "kw"],
    [".", "text"],
    ["render", "fn"],
    ["(); }", "text"],
  ],
  [["", "text"]],
  [
    ["  ", "text"],
    ["// the part that makes it a SHARE-image element", "muted"],
  ],
  [
    ["  ", "text"],
    ["async", "kw"],
    [" ", "text"],
    ["toBlob", "fn"],
    ["({ scale = ", "text"],
    ["2", "kw"],
    [" } = {}) { ", "text"],
    ["/* ... */", "muted"],
    [" }", "text"],
  ],
  [
    ["  ", "text"],
    ["async", "kw"],
    [" ", "text"],
    ["download", "fn"],
    ["(name) { ", "text"],
    ["/* ... */", "muted"],
    [" }", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [
    ["customElements.", "text"],
    ["define", "fn"],
    ["(", "text"],
    ["'share-card'", "str"],
    [", ShareCard);", "text"],
  ],
];

const SOURCES: [string, string][] = [
  [
    "registry.npmjs.org",
    "Latest version, licence, declared runtime dependency count, publish date and unpacked size for satori, @vercel/og, modern-screenshot and html-to-image. Re-fetched 9 August 2026; @vercel/og had published 1.0.1 the day before, the other three were unchanged.",
  ],
  [
    "html.spec.whatwg.org",
    "The five requirements for a valid custom element name, and the upgrade behaviour quoted below — both from the HTML Standard's custom-elements section. Fetched 5 August 2026.",
  ],
  [
    "tearline.kynth.studio/tearline.js",
    "The served component: 17,991 bytes, unminified, HTTP 200 on 13 August 2026. It is the whole thing; there is nothing else to read.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function ShareImageCustomElement() {
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
                id={"routes"}
                eyebrow={"Decision"}
                headingTop={"Four ways to make"}
                headingBottom={"a share image."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the short answer"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "A share image is either drawn in the visitor's browser or drawn on a server, and that fork decides everything else. A custom element for share images belongs to the first branch: the tag renders the card in the page, and the same tag exports it as a PNG when someone clicks. The second branch — satori, or "
                      }
                      <code>{"@vercel/og"}</code>
                      {
                        " wrapping it — draws the image without a browser, which is the only way an Open Graph card can work, because the crawler that fetches it will never run your JavaScript."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "So the question is not which library is better. It is whether the person the image is for is present. A user staring at their listening history and wanting a PNG of it is present, and the browser already has the receipt laid out. A social crawler asking for a preview card is not present, and there is no layout to reuse."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the size difference, and why"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The client-side packages are two orders of magnitude smaller than the server ones — 186 KB and 315 KB unpacked against 5.43 MB and 6.89 MB. That gap is structural rather than a matter of care. Rendering in a browser means borrowing the layout engine that is already in the room, which is what the "
                      }
                      <code>{"<foreignObject>"}</code>
                      {" technique "}
                      <a href={"/dom-to-png"}>{"actually does"}</a>
                      {
                        ". Rendering on a server means there is no layout engine to borrow and one has to be shipped."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <RefTable
                      label={
                        "route · version, deps, licence, size, published · when it wins"
                      }
                      rows={ROUTES}
                    />
                    <p className={"tl-docs-note"}>
                      {
                        "Registry facts, not a review: read from registry.npmjs.org on 9 August 2026. @vercel/og left 0.x four days after this page first ran the table — 1.0.1 published 8 August 2026, two runtime dependencies still, and marginally smaller unpacked at 6.89 MB. One licence detail worth catching before it reaches a legal review — the two client-side rasterisers are MIT, and both server-side packages are MPL-2.0. "
                      }
                      <code>{"@vercel/og"}</code>
                      {" declares exactly two runtime dependencies, "}
                      <code>{"satori"}</code>
                      {" and "}
                      <code>{"@resvg/resvg-wasm"}</code>
                      {
                        ", which is why the licence carries through. Nothing here is a claim about how any of these four work internally: their metadata was fetched, their source was not."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"element"}
                eyebrow={"Why a tag"}
                headingTop={"The tag can ship"}
                headingBottom={"before the script does."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"upgrade, quoted"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "The strongest argument for making a share-image widget a custom element rather than a framework component is a guarantee written into the HTML Standard, and it has a name: upgrade. An element whose definition has not loaded yet is not an error. The standard walks through a script marked "
                      }
                      <code>{"async"}</code>
                      {" placed "}
                      <em>{"after"}</em>
                      {" the tag: while the script is loading, "}
                      <strong>
                        {
                          "“the img-viewer element will be treated as an undefined element, similar to a span”"
                        }
                      </strong>
                      {
                        ", and once it loads, “the existing img-viewer element on the page will be upgraded, applying the custom element’s definition”."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "For a share image that is the whole game. The card can be in the server-rendered HTML, in a CMS field, in a Markdown file, in an email template someone else owns — and the script that turns it into an exportable receipt can arrive late, out of order, or from a CDN. Nothing has to co-ordinate. A framework component cannot make that promise, because the markup does not exist until the framework has booted."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the one caveat, also quoted"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The standard is explicit that this has a boundary: "}
                      <strong>
                        {
                          "“upgrades only apply to elements in the document tree”"
                        }
                      </strong>
                      {
                        " — formally, elements that are connected — and “an element that is not inserted into a document will stay un-upgraded”. So a share card built in memory and held there has no methods on it. Insert it, then export it."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>
                      {"what the boundary also buys"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Two more things follow from the element boundary rather than from any particular implementation. The first is that the content stays real content. Text wrapped in a custom element sits in the light DOM, so it is selectable, searchable, translatable and read by a screen reader in document order — which a canvas-drawn or server-drawn card cannot offer, because a PNG has no text in it at all."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The second is that the styling is negotiable. Rules inside a shadow tree lose to ordinary rules on the host page, so a component's own look is a default rather than a fight — the mechanism, and the exact cascade wording, are in the "
                      }
                      <a href={"/receipt-ui"}>{"receipt-UI write-up"}</a>
                      {"."}
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"and what it does not buy"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Being a custom element does nothing about the export sandbox. Any client-side route — element or library — hits the same two failures: a remote image or webfont will not load inside the serialised SVG, and cross-origin data drawn onto the canvas taints it so the pixels cannot be read back. Both are written up with their sources on the "
                      }
                      <a href={"/dom-to-png"}>{"DOM-to-PNG page"}</a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"contract"}
                eyebrow={"Contract"}
                headingTop={"What the element"}
                headingBottom={"has to implement."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={
                        "a valid custom element name — all five must hold"
                      }
                      rows={NAME_RULES}
                    />
                    <p className={"tl-docs-note"}>
                      {
                        "Quoted from the HTML Standard's custom-elements section, fetched 5 August 2026. The hyphen requirement is the one people trip over: "
                      }
                      <code>{"sharecard"}</code>
                      {" is not a legal custom element name and "}
                      <code>{"share-card"}</code>
                      {
                        " is. Get it wrong and the registration throws rather than failing quietly."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"share-card.js"}</p>
                    <CodePanel title={"share-card.js"} lines={SKELETON} />
                    <p className={"tl-docs-note"}>
                      {"Beyond the name, a share-image element needs three things. A "}
                      <code>{"static observedAttributes"}</code>
                      {" array, so that "}
                      <code>{"attributeChangedCallback()"}</code>
                      {" fires when the card's inputs change; a "}
                      <code>{"connectedCallback()"}</code>
                      {
                        ", because that is the point at which the element is in the document and can measure itself; and an export method that returns a Blob rather than triggering a download, so the caller can upload it, put it on the clipboard or hand it to the Web Share API instead."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Determinism is the non-obvious requirement. If the card has any randomised element — a texture, a torn edge, a rotation — it has to be seeded, or the exported PNG will not match the card the user was looking at when they clicked. Tearline takes a "
                      }
                      <code>{"seed"}</code>
                      {" attribute for exactly this reason."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"tearline"}
                eyebrow={"Fit"}
                headingTop={"Where this one fits."}
                headingBottom={"And where it does not."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"what Tearline is"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Tearline is a worked example of the first row in that table, with one strong opinion: it only makes one kind of picture. Wrap markup in "
                      }
                      <code>{"<tear-line>"}</code>
                      {
                        " and it renders as a thermal receipt — paper texture, dashed rules, seeded torn edge, barcode — and the element exports that. One script tag, no build step, no runtime dependencies, 17,991 bytes served unminified at "
                      }
                      <a href={"/tearline.js"}>{"/tearline.js"}</a>
                      {" and HTTP 200 on 5 August 2026."}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The full attribute and method reference is in the "}
                      <a href={"/docs"}>{"documentation"}</a>
                      {
                        ". A worked build of the genre most people arrive looking for — a listening-history receipt, and the API cap that stops most of them shipping — is a "
                      }
                      <a href={"/spotify-receipt-generator"}>
                        {"separate write-up"}
                      </a>
                      {"."}
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"when to use something else"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Three cases, stated plainly. If the share image needs to be an Open Graph card that a crawler fetches, no client-side element can do it and the server route is the answer. If the share image should look like anything other than a receipt, this component is the wrong shape and a general rasteriser pointed at your own markup is the right one. And if the requirement is a PNG of some part of the page that already exists, modern-screenshot or html-to-image is a closer fit than any purpose-built element."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Read it before you adopt it, because all of it is readable. The source is MIT at github.com/kyisaiah47/tearline, public and anonymous — an unauthenticated GET of the raw file returned HTTP 200 on 13 August 2026, byte-identical to what this origin serves. The same component is served unminified at /tearline.js, so there is no minified build hiding a second implementation. It installs as @kynth/tearline on npm, or from the script tag above — npm refuses the bare name tearline as too close to readline, so the package is scoped."
                      }
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
                    <RefTable label={"checked 5 August 2026"} rows={SOURCES} />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"why this is here"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Package versions, licences and sizes go stale, and a page that quotes them from memory is wrong within weeks without ever looking wrong. Every figure above carries the date it was read, so you can tell at a glance how much to trust it — and so can we, because this page is on a register that gets re-checked against these same sources."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The spec quotations are from the WHATWG HTML Standard itself rather than from a summary of it, because it is a living standard and a summary is a snapshot of one. If a number here has drifted, the source is the authority, not this page."
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
