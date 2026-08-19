import type { Metadata } from "next";
import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import Copyable from "@/components/Copyable";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * Documentation.
 *
 * The site shipped as a single page whose own CTA said "Read the docs" and
 * scrolled 400px to a summary table. This is the page that link was promising,
 * and it is the only surface on the host that answers the questions people
 * actually type — how to turn a DOM element into a PNG without a dependency,
 * what a receipt component's API looks like — rather than restating the pitch.
 *
 * Every section shell is InstallSection's, verbatim: same
 * `featuressection-*` classes, same eyebrow dot, same two-line heading, same
 * tl-docs / tl-api / tl-table bodies. Only the copy is new.
 *
 * The one deliberate omission is `data-reveal`. globals.css sets
 * `.js [data-reveal="N"] { opacity: 0 }` and ScrollReveals only un-hides ids
 * listed under the CURRENT ROUTE in motion-data.json — which has no /docs
 * entry. A reveal attribute here would render the whole page invisible to
 * anyone with JavaScript on.
 *
 * INSTALL PATHS. This page documented the script tag as the ONLY one, on the
 * grounds that nothing was published — true when it was written on 2026-07-29,
 * false since 2026-08-13. @kynth/tearline@0.1.0 is on the registry
 * (registry.npmjs.org returned 200, re-read 2026-08-13; FACTS.json →
 * npm-package-published) and the repo is public and MIT
 * (FACTS.json → github-repo-public). The package shipped and this page, the
 * install reference, was the last surface still saying it had not.
 *
 * Both paths are documented now, script tag first: it is the one with no step
 * before it. Every npm line on the site is scoped, `@kynth/tearline`, and none of
 * them says `npm i tearline` — the bare name returns 404 on the registry (checked
 * 2026-08-19), so nothing is published there. An earlier version of this note gave
 * npm's similarity-to-`readline` rule as the reason; that is a claim about what npm
 * did, and nothing here has ever observed it. The scope is the fact; the reason is not.
 */

const SITE = "https://tearline.kynth.studio";

export const metadata: Metadata = {
  title: "Tearline docs — render HTML as a receipt, export it as a PNG",
  description:
    "Full reference for the <tear-line> custom element: every attribute, every method, and how the browser-side PNG export works with no dependencies, no canvas API and no server.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Tearline docs — render HTML as a receipt, export it as a PNG",
    description:
      "Full reference for the <tear-line> custom element: every attribute, every method, and how the browser-side PNG export works with no dependencies, no canvas API and no server.",
    url: `${SITE}/docs`,
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

const DOC_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${SITE}/docs#article`,
  url: `${SITE}/docs`,
  headline: "Tearline documentation",
  description:
    "Reference for the <tear-line> custom element: attributes, methods, PNG export, styling hooks, framework notes and accessibility.",
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-07-28",
  dateModified: "2026-07-28",
  proficiencyLevel: "Beginner",
  dependencies: "None. One ES module, loaded from a script tag.",
  articleSection: [
    "Install",
    "Attributes and methods",
    "Exporting a PNG",
    "Styling",
    "Frameworks",
    "Accessibility",
  ],
};

/* ---- content ------------------------------------------------------------ */

const QUICKSTART: Line[] = [
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
    ['"https://tearline.kynth.studio/tearline.js"', "str"],
    ["></", "text"],
    ["script", "tag"],
    [">", "text"],
  ],
  [["", "text"]],
  [
    ["<", "text"],
    ["tear-line", "tag"],
    [" ", "text"],
    ["seed", "attr"],
    ["=", "text"],
    ['"7"', "str"],
    [" ", "text"],
    ["barcode", "attr"],
    ["=", "text"],
    ['"047320260726"', "str"],
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
    ["small", "tag"],
    [">", "text"],
    ["Coffee & Provisions", "text"],
    ["</", "text"],
    ["small", "tag"],
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
    ["  <", "text"],
    ["p", "tag"],
    [">", "text"],
    ["<", "text"],
    ["strong", "tag"],
    [">", "text"],
    ["Total · 4.25", "text"],
    ["</", "text"],
    ["strong", "tag"],
    [">", "text"],
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

const EXPORT: Line[] = [
  [
    ["const", "kw"],
    [" el = ", "text"],
    ["document", "fn"],
    [".querySelector(", "text"],
    ["'tear-line'", "str"],
    [");", "text"],
  ],
  [["", "text"]],
  [
    ["// saves it straight to the user's downloads", "muted"],
  ],
  [
    ["await", "kw"],
    [" el.", "text"],
    ["download", "fn"],
    ["(", "text"],
    ["'receipt.png'", "str"],
    [");", "text"],
  ],
  [["", "text"]],
  [
    ["// or take the bytes and do your own thing", "muted"],
  ],
  [
    ["const", "kw"],
    [" blob = ", "text"],
    ["await", "kw"],
    [" el.", "text"],
    ["toBlob", "fn"],
    ["({ scale: ", "text"],
    ["3", "str"],
    [" });", "text"],
  ],
  [
    ["const", "kw"],
    [" url  = ", "text"],
    ["await", "kw"],
    [" el.", "text"],
    ["toDataURL", "fn"],
    ["();", "text"],
  ],
];

const STYLING: Line[] = [
  [
    ["tear-line", "tag"],
    [" {", "text"],
  ],
  [
    ["  --paper", "attr"],
    [": ", "text"],
    ["#f6f3ec", "str"],
    [";", "text"],
  ],
  [
    ["  --ink", "attr"],
    [": ", "text"],
    ["#2b2724", "str"],
    [";", "text"],
  ],
  [
    ["  --ink-strong", "attr"],
    [": ", "text"],
    ["#1a1715", "str"],
    [";", "text"],
  ],
  [
    ["  --ink-faded", "attr"],
    [": ", "text"],
    ["#6a635c", "str"],
    [";", "text"],
  ],
  [
    ["  --font", "attr"],
    [": ", "text"],
    ["ui-monospace, Menlo, monospace", "str"],
    [";", "text"],
  ],
  [["}", "text"]],
  [["", "text"]],
  [
    ["/* your own rules beat the built-in ones */", "muted"],
  ],
  [
    ["tear-line", "tag"],
    [" h1 { ", "text"],
    ["letter-spacing", "attr"],
    [": ", "text"],
    ["0", "str"],
    ["; }", "text"],
  ],
];

const ATTRS: [string, string, string][] = [
  ["width", "330", "Paper width in pixels."],
  [
    "seed",
    "1",
    "Any integer. The torn edge and the barcode are both drawn from this one number through a deterministic generator, so the same seed always produces the same paper — and the PNG matches what the visitor was looking at. Leave it out and every render tears differently, which is fine for a playground and wrong for an order confirmation.",
  ],
  [
    "barcode",
    "—",
    "The digits printed under the bars. Omit for no barcode at all. Decorative: it is not a scannable Code 128 and does not pretend to be.",
  ],
  ["tilt", "-1.15", "Rotation in degrees."],
  [
    "flat",
    "—",
    "Present: no rotation and no drop shadow. For embedding the receipt inside another layout rather than floating it on a page.",
  ],
  [
    "animate",
    "—",
    "Present: the receipt prints out on first paint, like paper feeding from a till. Skipped entirely under prefers-reduced-motion. The duration reads --dur, which defaults to 1.1s.",
  ],
];

const METHODS: [string, string][] = [
  [
    "toBlob({ scale, padding })",
    "Resolves to a PNG Blob. scale defaults to 2, so a 330px receipt comes back 660px wide. padding defaults to 44 and exists because the drop shadow spreads past the element's own box — drop it to 0 alongside the flat attribute for a tight crop.",
  ],
  [
    "toDataURL({ scale, padding })",
    "The same image as a data: URL, for dropping straight into an <img> or a share sheet.",
  ],
  [
    "download(name, { scale, padding })",
    "Renders and saves it. name defaults to receipt.png.",
  ],
];

/* The four real steps of an export, and — for the two that can stop — the cause and the fix.
 * These are the same four `tearline.js` emits as `tearline:stage`, and the same sentences the
 * playground's failure panel prints, because a docs page and a runtime that disagree about what
 * went wrong is worse than either alone. */
const STAGE_FAILURES: [string, string][] = [
  ["flatten", "Clones the shadow tree and inlines the slotted light DOM. Does not fail in practice \u2014 if it does, the element had not finished loading."],
  ["serialise", "XMLSerializer, into an SVG foreignObject. Stops only on markup that is not valid XML; an unclosed tag is the usual cause."],
  ["rasterise", "Decodes that SVG in an <img>. Most of the wait, and the one step that stops: an <img> pointing at a URL rather than a data: URI, because the sandbox cannot reach the network."],
  ["encode", "Canvas to a PNG blob. Stops when the canvas is larger than the browser allows \u2014 use a narrower width, or scale 1."],
];

const PROPS: [string, string, string][] = [
  ["--paper", "#f6f3ec", "Paper colour, under the fibre texture and the falloff."],
  ["--ink", "#2b2724", "Body text."],
  ["--ink-strong", "#1a1715", "Headings and <strong>."],
  ["--ink-faded", "#6a635c", "<small>."],
  [
    "--font",
    "ui-monospace, …",
    "The receipt's type stack. Everything inside the paper inherits it.",
  ],
  [
    "--dur",
    "1.1s",
    "Print-out duration, only read when the animate attribute is present.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function Docs() {
  return (
    <>
      <SmoothScroll />
      <JsonLd data={DOC_SCHEMA} />
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
                id={"install"}
                eyebrow={"Docs"}
                headingTop={"Load one file."}
                headingBottom={"Wrap anything."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the whole install"}</p>
                    <Copyable
                      prompt={"<>"}
                      text={"https://tearline.kynth.studio/tearline.js"}
                    />
                    <p className={"tl-docs-note"}>
                      {
                        "One ES module, no build step, no peer dependencies and no server. Load it with a "
                      }
                      <code>{'<script type="module">'}</code>
                      {
                        " tag and the browser registers a custom element called "
                      }
                      <code>{"tear-line"}</code>
                      {
                        ". Everything after that is markup you already know how to write — headings, rules, tables, lists — and the paper is CSS wrapped around it rather than a picture of it."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"or from npm"}
                    </p>
                    <Copyable prompt={"$"} text={"npm i @kynth/tearline"} />
                    <p className={"tl-docs-note"}>
                      {
                        /* ⛔ SAME CORRECTION AS THE LANDING'S INSTALL SECTION, AND THIS SURFACE IS
                          * THE ONE A DEVELOPER ACTUALLY READS BEFORE INSTALLING. It said "the same
                          * file, versioned" and "the only difference is whether you want a lockfile
                          * entry". Read off the registry and the tarball on 2026-08-19: 0.1.0 ships
                          * a 14,048-byte tearline.js (sha256 96debf4e…) against the 18,985 bytes
                          * this release serves (sha256 50729aac…; public/ and src/ synced
                          * 2026-08-19, and the origin served the previous 17,991 until this
                          * deploy). 0.1.0 predates the `flat` export fix, so `flat` is
                          * silently dropped from every export while working on screen, and its
                          * `toBlob` resolves null where the current file throws the named
                          * canvas-too-large error this page documents by name. */
                        "Published as @kynth/tearline — latest 0.1.0, 13 August 2026, MIT, zero dependencies. It is two export fixes behind the file the script tag serves: on 0.1.0 the "
                      }
                      <code>{"flat"}</code>
                      {" attribute is ignored in the export, and an export larger than the browser\u2019s canvas limit comes back empty instead of naming the step it stopped at. Pin 0.1.0 if you want a lockfile entry and leave "}
                      <code>{"flat"}</code>
                      {" alone; take the script tag for the current behaviour. The source is MIT and public at "}
                      <a
                        href={"https://github.com/kyisaiah47/tearline"}
                        rel={"noreferrer"}
                        target={"_blank"}
                      >
                        {"github.com/kyisaiah47/tearline"}
                      </a>
                      {"."}
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"what it is not"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Not a template language, not an image service, and not an ESC/POS driver — it does not talk to a physical thermal printer. It renders the "
                      }
                      <strong>{"look"}</strong>
                      {
                        " of a till receipt in the DOM, and hands you a PNG of it."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"index.html"}</p>
                    <CodePanel title={"index.html"} lines={QUICKSTART} />
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"api"}
                eyebrow={"Reference"}
                headingTop={"Six attributes."}
                headingBottom={"Three methods."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable label={"attributes"} rows={ATTRS} />
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"reacting to changes"}
                    </p>
                    <p className={"tl-docs-note"}>
                      <code>{"width"}</code>
                      {", "}
                      <code>{"seed"}</code>
                      {", "}
                      <code>{"barcode"}</code>
                      {" and "}
                      <code>{"tilt"}</code>
                      {
                        " are observed — set any of them on a live element and the paper redraws. "
                      }
                      <code>{"flat"}</code>
                      {" and "}
                      <code>{"animate"}</code>
                      {
                        " need no observer because they are matched by CSS on the host, so toggling them takes effect on the next frame either way."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"knowing when it has painted"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The element sets "}
                      <code>{"data-ready"}</code>
                      {
                        " on itself one frame after the paper, the tear and the barcode are all in place. Gate your own fade-in on that attribute and nobody ever sees a half-drawn receipt."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <RefTable label={"methods"} rows={METHODS} />
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"custom properties"}
                    </p>
                    <table className={"tl-table"}>
                      <tbody>
                        {PROPS.map(([name, def, desc]) => (
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
                </div>
              </DocsSection>

              <DocsSection
                id={"export"}
                eyebrow={"Export"}
                headingTop={"A PNG,"}
                headingBottom={"made in the browser."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"how it works"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "The rendered receipt is serialised into an SVG "
                      }
                      <code>{"<foreignObject>"}</code>
                      {
                        " and painted onto a canvas. That is the whole mechanism, and it is why there is no dependency: no html2canvas, no headless browser, no screenshot endpoint. The shadow DOM is flattened, the slotted light DOM is inlined, and the component's own stylesheet is rewritten against the classes that survive the flattening."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the one caveat, stated plainly"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"A "}
                      <code>{"foreignObject"}</code>
                      {
                        " is sandboxed: it cannot fetch anything over the network. Text and styles are inlined for you automatically, but an "
                      }
                      <code>{"<img>"}</code>
                      {" inside the receipt must be a "}
                      <code>{"data:"}</code>
                      {
                        " URI or it will not survive. When that happens the export "
                      }
                      <strong>{"rejects with an explicit error"}</strong>
                      {
                        " naming the cause, rather than quietly handing you a receipt with a hole in it. Fonts are subject to the same rule — a webfont that has not loaded falls back inside the export."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "None of that is specific to Tearline — it falls out of how browser-side rasterisation works at all. "
                      }
                      <a href={"/dom-to-png"}>
                        {"Export a DOM element as a PNG"}
                      </a>
                      {
                        " walks through the technique on its own, including the tainted-canvas rule that throws instead of returning a blank image, and how the zero-dependency packages on npm compare."
                      }
                    </p>
                    {/* THE EXPORT'S FAILURE CONTRACT, WRITTEN DOWN.
                        The element already rejected with an explicit error; what was missing is
                        anywhere an author could read what to DO with it, and what the four steps
                        even are. `data-tl-explains` marks this block for intent.json's
                        `export-failure-says-what-to-do`. */}
                    <p className={"tl-docs-label tl-docs-label-gap"} data-tl-explains={"stages"}>
                      {"watching it happen, and what to do when it stops"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"An export fires "}
                      <code>{"tearline:stage"}</code>
                      {
                        " as it moves through the four things it actually does — flatten, serialise, rasterise, encode. They are not a progress bar's worth of invented percentages: they are the real steps, and the third is where the time and the failures both live. On a long receipt "
                      }
                      <code>{"rasterise"}</code>
                      {
                        " is most of the wait, so a spinner tells the reader nothing a still frame would not."
                      }
                    </p>
                    <table className={"tl-table"}>
                      <tbody>
                        {STAGE_FAILURES.map(([stage, what]) => (
                          <tr key={stage}>
                            <td className={"tl-td-name"}>
                              <code>{stage}</code>
                            </td>
                            <td className={"tl-td-desc"}>{what}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className={"tl-docs-note"}>
                      {
                        "Which is why the playground names the step it stopped at rather than saying the export failed. \u201CAn error occurred\u201D tells a reader only that we noticed."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"making the image match the screen"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"Set a "}
                      <code>{"seed"}</code>
                      {
                        ". The tear and the bars come out of it, so the exported PNG is the same paper the visitor was looking at when they pressed the button. Without one, the export re-renders a different tear and the share image quietly stops being a picture of what happened."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"share.js"}</p>
                    <CodePanel title={"share.js"} lines={EXPORT} />
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"styling"}
                eyebrow={"Styling"}
                headingTop={"Opinionated defaults."}
                headingBottom={"No specificity fight."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"what is styled for you"}</p>
                    <p className={"tl-docs-note"}>
                      <code>{"h1"}</code>
                      {", "}
                      <code>{"h2"}</code>
                      {", "}
                      <code>{"hr"}</code>
                      {", "}
                      <code>{"p"}</code>
                      {", "}
                      <code>{"small"}</code>
                      {", "}
                      <code>{"strong"}</code>
                      {", "}
                      <code>{"table"}</code>
                      {", "}
                      <code>{"ul"}</code>
                      {" and "}
                      <code>{"ol"}</code>
                      {
                        " arrive looking like receipt type — centred uppercase headings, dashed rules, tight monospace rows — without you writing a line of CSS."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"and how to override it"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"Every one of those rules is written with "}
                      <code>{"::slotted()"}</code>
                      {
                        ", which loses to your own author styles by design. So a plain selector from the outside wins — no "
                      }
                      <code>{"!important"}</code>
                      {
                        ", no wrapper class, no fighting the shadow boundary. Paper and ink are custom properties on the host, so a whole retheme is five declarations."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"receipt.css"}</p>
                    <CodePanel title={"receipt.css"} lines={STYLING} />
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"frameworks"}
                eyebrow={"Frameworks"}
                headingTop={"It is a custom element."}
                headingBottom={"So it goes anywhere."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"react"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "React 19 passes unknown attributes straight through to the DOM, so "
                      }
                      <code>{"<tear-line seed={7}>"}</code>
                      {
                        " works with no wrapper and no ref dance. Import the module once, at the top of your app, for its side effect — it registers the element and guards against double registration itself."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"vue, svelte, astro"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "All three render custom elements natively. Vue wants the tag marked as a custom element in its compiler options so it stops warning about an unknown component; Svelte and Astro need nothing."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"server rendering"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "The receipt is drawn in the browser, so a server-rendered page ships the markup and paints the paper on hydration. Your content is in the HTML either way — which is the point of it being real elements rather than a canvas. Gate any fade-in on "
                      }
                      <code>{"data-ready"}</code>
                      {" and the swap is invisible."}
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"content security policy"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The component injects its own stylesheet into its shadow root, and the export builds a "
                      }
                      <code>{"data:"}</code>
                      {" image URL. A strict CSP therefore needs "}
                      <code>{"img-src data:"}</code>
                      {" for the export to rasterise."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"accessibility"}
                eyebrow={"Accessibility"}
                headingTop={"Real text."}
                headingBottom={"Not a picture of text."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"what that buys you"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Your markup stays in the light DOM, so the receipt is selectable, searchable, translatable and read by screen readers in document order. Headings stay headings, tables stay tables, links stay links. A canvas-based receipt loses all of that the moment it paints, and a screenshot never had it."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"motion"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The print-out reveal is inside a "}
                      <code>{"prefers-reduced-motion: no-preference"}</code>
                      {
                        " query, so it is not softened under a reduced-motion preference — it never runs at all."
                      }
                    </p>
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"contrast"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "The default paper and ink are a warm cream and a soft near-black, which is what a real till receipt looks like and is not always what an audit wants. "
                      }
                      <code>{"--ink"}</code>
                      {" and "}
                      <code>{"--paper"}</code>
                      {
                        " are exposed exactly so you can push the ratio past the look. The faded and strong inks are separate properties, so you can lift the quiet text without flattening the hierarchy."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"the barcode"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Decorative, and marked as such — it carries no text alternative because there is nothing to announce. The digits under it are real text and are read normally."
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
