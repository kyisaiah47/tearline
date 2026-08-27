import type { Metadata } from "next";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * "html2canvas alternatives."
 *
 * WHY THIS PAGE EXISTS, from the measurement rather than from a hunch.
 *
 * Two of the six buyer queries this product is watched on are comparison-shaped
 * — "html2canvas alternatives" and "dom to image vs html2canvas" — and until
 * today this host owned no page whose title overlapped either of them. The AEO
 * probe on 2026-08-19, 08-20, 08-21 and 08-26 shows what gets cited for them
 * instead: npm-compare.com, on all five engines (chatgpt, claude-web, deepseek,
 * google-ai, perplexity), and npmtrends.com plus betterprogramming.pub on
 * google-ai. Every one of those is a third-party reading of the npm registry or
 * a Medium publication — none of them is a competing library, and none of them
 * says anything the registry does not.
 *
 * So the gap is not that a rival is beating us. It is that the answer to a
 * question about npm packages is being assembled from download-count charts,
 * and nobody has written the version of it that puts the registry's own fields
 * in one table and then says plainly which package to pick.
 *
 * ⛔ EVERY FIGURE ON THIS PAGE WAS FETCHED FROM registry.npmjs.org ON
 * 2026-08-26 AND NOTHING IS QUOTED FROM MEMORY. Exact unpacked byte counts, so
 * the derived KB/MB match the convention /dom-to-png already uses (decimal,
 * bytes / 1000). A remembered version number is a wrong version number.
 *
 * ⛔ NO FAQPage SCHEMA. The Q&A here is content, not markup: Google removed
 * FAQ rich results on 2026-05-07, the landing page already emits one FAQPage
 * for this Organization, and a second one on a subpage buys nothing. TechArticle
 * only, same as the four sibling pages.
 *
 * This page is deliberately honest about where Tearline is the WRONG answer,
 * which is most of the time — it is a receipt component, not a rasteriser. A
 * comparison table that concludes "use ours" for every row is not a comparison
 * table, and an engine reading it can tell.
 */

const SITE = "https://tearline.kynth.studio";

const TITLE =
  "html2canvas alternatives — 6 DOM-to-image libraries compared (2026)";
const DESCRIPTION =
  "html2canvas has not shipped since January 2022. Five maintained replacements compared: dom-to-image, html-to-image, modern-screenshot, snapdom, satori.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/html2canvas-alternatives" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/html2canvas-alternatives`,
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
  "@id": `${SITE}/html2canvas-alternatives#article`,
  url: `${SITE}/html2canvas-alternatives`,
  headline: "html2canvas alternatives, compared on today's npm figures",
  description: DESCRIPTION,
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-08-26",
  dateModified: "2026-08-26",
  proficiencyLevel: "Beginner",
  articleSection: [
    "The short answer",
    "Six packages compared",
    "dom-to-image vs html2canvas",
    "Which one for which job",
    "Sources",
  ],
};

/* ---- content ------------------------------------------------------------ */

/**
 * Every cell is a field returned by registry.npmjs.org on 26 August 2026.
 * "deps" is the length of the `dependencies` object on the latest version —
 * not devDependencies. Sizes are `dist.unpackedSize` in decimal KB/MB, the
 * same convention /dom-to-png uses, from these exact byte counts:
 * html2canvas 3,379,055 · html-to-image 315,082 · modern-screenshot 186,023 ·
 * @zumer/snapdom 403,706 · satori 5,851,282 · @kynth/tearline 21,345.
 * dom-to-image predates npm recording the field and reports no size at all.
 */
const PACKAGES: [string, string, string][] = [
  [
    "modern-screenshot",
    "4.7.0 · 0 deps · MIT",
    "16 Apr 2026 · 186 KB · 12 files. The smallest general-purpose option, and a direct descendant of dom-to-image's approach.",
  ],
  [
    "@zumer/snapdom",
    "2.24.10 · 0 deps · MIT",
    "25 Aug 2026 · 404 KB · 8 files. The most recently published of the six, and the only one whose own registry description names html2canvas: “Fast, modern alternative to html2canvas.”",
  ],
  [
    "html-to-image",
    "1.11.13 · 0 deps · MIT",
    "14 Feb 2025 · 315 KB · 82 files. The most widely used fork of dom-to-image, and the usual drop-in when dom-to-image stops being maintained enough.",
  ],
  [
    "html2canvas",
    "1.4.1 · 2 deps · MIT",
    "22 Jan 2022 · 3.38 MB · 391 files. Pulls in css-line-break and text-segmentation. Reimplements layout rather than borrowing the browser's, which is why it is ten times the size of the others.",
  ],
  [
    "dom-to-image",
    "2.6.0 · 0 deps · MIT",
    "4 Oct 2017 · size not reported. The original foreignObject implementation. Everything below it in this table is downstream of it.",
  ],
  [
    "satori",
    "0.33.4 · 13 deps · MPL-2.0",
    "24 Aug 2026 · 5.85 MB · 37 files. Not a browser rasteriser at all — it converts HTML and CSS to SVG on a server. The only one here that is not MIT.",
  ],
];

const CHOOSE: [string, string][] = [
  [
    "You already ship html2canvas and it works",
    "Leave it. Nothing above says it is broken — it is unmaintained since January 2022 and large, which are reasons not to ADD it, not reasons to rip it out of something that renders correctly today.",
  ],
  [
    "You want the smallest general-purpose option",
    "modern-screenshot. 186 KB unpacked across 12 files, no runtime dependencies, published April 2026. It takes the dom-to-image approach and keeps it current.",
  ],
  [
    "You are replacing dom-to-image in an existing codebase",
    "html-to-image. It is the fork with the closest API to the original, so the migration is mostly an import path, and it has shipped this decade.",
  ],
  [
    "You want the most actively published option",
    "@zumer/snapdom, published 25 August 2026 — one day before these figures were read. Newest release is not the same as most proven; treat it as a reason to look, not a reason to switch.",
  ],
  [
    "You need an Open Graph or share card a crawler will see",
    "None of the five. A crawler fetching your OG image never runs your JavaScript, so the picture has to exist server-side. That is satori's job, and it is MPL-2.0 rather than MIT, which is a licence question before it is a technical one.",
  ],
  [
    "You want the receipt look, and the export with it",
    "Tearline — and only then. It is a custom element, not a rasteriser you can point at an arbitrary div. If your requirement is “a PNG of this element” rather than “a receipt of this content”, one of the five above is the right answer.",
  ],
];

const SOURCES: [string, string][] = [
  [
    "registry.npmjs.org",
    "Latest version, publish date, licence, runtime dependency count, unpacked size and file count for html2canvas, dom-to-image, html-to-image, modern-screenshot, @zumer/snapdom, satori and @kynth/tearline. Fetched 26 August 2026.",
  ],
  [
    "developer.mozilla.org — CORS enabled image",
    "The tainted-canvas rule: drawing cross-origin data without CORS approval taints the canvas, and toBlob(), toDataURL() and captureStream() then throw a SecurityError. Applies to every package in the table that runs in a browser. Fetched 26 August 2026.",
  ],
  [
    "tearline.kynth.studio/tearline.js",
    "The Tearline component itself, served unminified. 21 KB unpacked across 4 files on npm as @kynth/tearline 0.1.0.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function Html2canvasAlternatives() {
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
                id={"answer"}
                eyebrow={"Answer"}
                headingTop={"html2canvas alternatives."}
                headingBottom={"The short version."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the direct answer"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Use modern-screenshot if you want the smallest current option, html-to-image if you are migrating off dom-to-image, and satori if the image has to exist before a browser does. All three are drop-in enough that the choice is reversible, and none of them is html2canvas."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"why the question is asked at all"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The latest release of "}
                      <code>{"html2canvas"}</code>
                      {" is "}
                      <strong>{"1.4.1, published 22 January 2022"}</strong>
                      {
                        " — read from registry.npmjs.org on 26 August 2026, which puts it four and a half years without a release. It is also the largest of the browser-side options by an order of magnitude: 3.38 MB unpacked across 391 files, against 186 KB across 12 for modern-screenshot."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "That size difference is not incidental, and it is the one thing worth understanding before picking. html2canvas reimplements layout — it walks your DOM and repaints it onto a canvas itself, which is why it needs css-line-break and text-segmentation and why it can disagree with what you saw on screen. Every other browser-side package in the table borrows the engine already in the room: serialise the node, wrap it in an SVG "
                      }
                      <code>{"<foreignObject>"}</code>
                      {", let the browser rasterise it. That technique is "}
                      <a href={"/dom-to-png"}>{"written out in full here"}</a>
                      {"."}
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>
                      {"what every one of them shares"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Switching packages does not switch you out of the canvas security rule. Per MDN, as soon as any of them draws data loaded from another origin without CORS approval, the canvas becomes "
                      }
                      <strong>{"tainted"}</strong>
                      {", and "}
                      <code>{"toBlob()"}</code>
                      {", "}
                      <code>{"toDataURL()"}</code>
                      {" and "}
                      <code>{"captureStream()"}</code>
                      {" throw a "}
                      <code>{"SecurityError"}</code>
                      {
                        ". If your export throws today, a different library will throw the same thing tomorrow. Inline the asset, serve it same-origin, or send CORS headers."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The blank-export failure is the same story. The SVG is loaded as a data URI, so it is a sandbox with no origin: it cannot fetch a remote image, a webfont or a stylesheet. Whatever the picture needs has to be inside the string before it is serialised — by any of these packages, in any order."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "So the honest framing is that these are not six different capabilities. Five of them are the same four browser APIs with different amounts of ceremony around them, and the sixth runs somewhere else entirely."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"table"}
                eyebrow={"Compared"}
                headingTop={"Six packages."}
                headingBottom={"Read from npm today."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={
                        "version, deps, licence · published, unpacked size, files"
                      }
                      rows={PACKAGES}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"how to read this"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Registry facts, not a review. Every cell is a field the npm registry returned on 26 August 2026 — latest version, publish date of that version, declared licence, the length of the dependencies object, and dist.unpackedSize. No download counts, no stars, no opinion dressed up as a metric."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Five of the six are MIT with zero runtime dependencies. The two exceptions are the two to think about: html2canvas declares two dependencies, and satori declares thirteen and is MPL-2.0, which is a copyleft licence and a decision your legal position may already have made for you."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Publish dates are the field people misread. An old date means the package has not changed, not that it has stopped working — dom-to-image last shipped in 2017 and still does exactly what it did then. It means nobody is going to fix the next browser change for you."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "These numbers go stale. That is why each carries the date it was read, and why this page is on a register that gets re-checked against the same source rather than left to rot quietly."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"vs"}
                eyebrow={"Head to head"}
                headingTop={"dom-to-image"}
                headingBottom={"vs html2canvas."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the answer first"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Pick neither, and take html-to-image or modern-screenshot instead. They are the maintained descendants of dom-to-image, they use the same technique, and they have the same API shape — so the comparison people actually want is dom-to-image's approach against html2canvas's approach, and on that question dom-to-image's approach won and is what everything current is built on."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the difference that matters"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "dom-to-image hands your markup to the browser inside an SVG foreignObject and lets the real layout engine draw it. html2canvas parses your CSS and paints the result itself. The first is fast, small, and matches what the user saw, because it IS what the user saw. The second is slower, larger, and can drift from the page — but it does not depend on foreignObject support, and it can reach some things the sandbox cannot."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "In package terms, on 26 August 2026: dom-to-image 2.6.0 with 0 dependencies, last published October 2017, no size reported; html2canvas 1.4.1 with 2 dependencies, last published January 2022, 3.38 MB across 391 files."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>
                      {"where each one actually breaks"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "dom-to-image and its descendants fail quietly. A remote image, a webfont or an external stylesheet does not load inside the data-URI sandbox, so the export comes out blank or half-drawn with nothing thrown. The fix is always the same: inline it before serialising."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "html2canvas fails visibly instead. Because it is interpreting CSS rather than rendering it, an unsupported property comes out wrong on the canvas while the page looks fine — a gradient flattened, a filter dropped, a transform ignored. You get an image, just not your image."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Both throw the same SecurityError on a tainted canvas, and neither can do anything about it. That one is the browser's rule, not the library's."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The failure modes are enumerated with fixes on "}
                      <a href={"/dom-to-png"}>
                        {"the DOM-to-PNG write-up"}
                      </a>
                      {", and the server-side fork — where satori sits, and why a crawler forces it — is "}
                      <a href={"/share-image-custom-element"}>
                        {"compared separately"}
                      </a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"pick"}
                eyebrow={"Choosing"}
                headingTop={"Which one,"}
                headingBottom={"for which job."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"the requirement · the package"}
                      rows={CHOOSE}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>
                      {"where Tearline is the wrong answer"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Most of the time. Tearline is a custom element that renders whatever you wrap in it as a thermal receipt — paper texture, torn edge, barcode — and exports that. It is 21 KB across 4 files with no dependencies, and it is not a library you can point at an arbitrary div. If the requirement is “turn this existing element into a PNG”, five of the six packages above do that and this one does not."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"where it is the right one"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "When the receipt itself is the point: a wrapped-up listening history, an order summary, a share card built out of rules and monospace. Then the look and the export arrive together instead of being a rasteriser bolted onto a div you styled yourself."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The attribute and method reference is in the "}
                      <a href={"/docs"}>{"documentation"}</a>
                      {", the component is served unminified at "}
                      <a href={"/tearline.js"}>{"/tearline.js"}</a>
                      {", and the CSS behind the paper look is a "}
                      <a href={"/receipt-ui"}>{"separate write-up"}</a>
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
                    <RefTable label={"checked 26 August 2026"} rows={SOURCES} />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"why this is here"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "A comparison page is only worth reading if you can check it. Versions and publish dates go stale within weeks and a page quoting them from memory is wrong long before it looks wrong, so every figure above carries the date it was read and the source it came from."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "If a number here has drifted, the registry is the authority, not this page."
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
