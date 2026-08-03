import type { Metadata } from "next";
import CodePanel from "@/components/CodePanel";
import type { Line } from "@/components/CodePanel";
import { DocsSection, RefTable } from "@/components/DocsShell";
import JsonLd, { APP_ID, ORG_ID } from "@/components/JsonLd";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * "Receiptify-style Spotify receipt generators."
 *
 * The fifth page, and the last of this product's six measured queries to have
 * no page at all: "spotify receiptify style generator library". /dom-to-png
 * answers the export, /receipt-ui answers the look, and neither answers the
 * question the person typing that query is actually asking, which is "what do
 * I assemble to build one of these".
 *
 * The honest answer is mostly bad news, and that is the reason the page is
 * worth writing. Every listicle on this query walks someone through OAuth and
 * stops before the part where their app is capped at five users forever. The
 * quota-modes page on developer.spotify.com was fetched twice on 2026-08-02 —
 * once for the mode definitions, once to confirm the eligibility bullets and
 * the policy date — because the whole page turns on it and a paraphrase from
 * memory would be worse than no page.
 *
 * Positioning: Tearline is two of the three jobs and none of the hard one. The
 * page says that in the first section rather than burying it, and the
 * comparison table lists Tearline beside four alternatives with the same
 * columns. The npm metrics for those four are NOT restated here — they live on
 * /dom-to-png with their fetch date, and one source of truth beats two copies
 * that drift.
 *
 * No `data-reveal` anywhere: see the note in DocsShell.
 */

const SITE = "https://tearline.kynth.studio";

const TITLE =
  "Receiptify-style Spotify receipt generators — libraries and limits (2026)";
const DESCRIPTION =
  "What you actually assemble to build a Receiptify-style Spotify receipt: the top-tracks endpoint, the five-user cap that stops most of these apps shipping, and the five ways to turn the result into a shareable PNG.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/spotify-receipt-generator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/spotify-receipt-generator`,
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
  "@id": `${SITE}/spotify-receipt-generator#article`,
  url: `${SITE}/spotify-receipt-generator`,
  headline: "Receiptify-style Spotify receipt generators",
  description: DESCRIPTION,
  about: { "@id": APP_ID },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: "2026-08-02",
  dateModified: "2026-08-02",
  proficiencyLevel: "Beginner",
  dependencies:
    "A Spotify developer app, any HTTP client, and one way to rasterise a DOM node.",
  articleSection: [
    "Three jobs, not one library",
    "The five-user cap",
    "The endpoint that shapes the UI",
    "Five ways to make the picture",
    "What an individual can still ship",
    "Sources",
  ],
};

/* ---- content ------------------------------------------------------------ */

/**
 * The top-tracks call, written against the reference page fetched 2026-08-02:
 * GET /me/top/{type}, scope user-top-read, limit default 20 / max 50,
 * time_range one of long_term | medium_term | short_term. Nothing here is
 * Tearline-specific — it is the data half, which Tearline has no part in.
 */
const TOP_TRACKS_JS: Line[] = [
  [["// scope: user-top-read", "muted"]],
  [
    ["const", "kw"],
    [" params = ", "text"],
    ["new", "kw"],
    [" ", "text"],
    ["URLSearchParams", "fn"],
    ["({", "text"],
  ],
  [
    ["  time_range", "attr"],
    [": ", "text"],
    ["'short_term'", "str"],
    [",", "text"],
    ["   // ~4 weeks", "muted"],
  ],
  [
    ["  limit", "attr"],
    [": ", "text"],
    ["'50'", "str"],
    [",", "text"],
    ["            // max is 50", "muted"],
  ],
  [["});", "text"]],
  [["", "text"]],
  [
    ["const", "kw"],
    [" res = ", "text"],
    ["await", "kw"],
    [" ", "text"],
    ["fetch", "fn"],
    ["(", "text"],
  ],
  [
    ["  ", "text"],
    ["`https://api.spotify.com/v1/me/top/tracks?${params}`", "str"],
    [",", "text"],
  ],
  [
    ["  { ", "text"],
    ["headers", "attr"],
    [": { ", "text"],
    ["Authorization", "attr"],
    [": ", "text"],
    ["`Bearer ${token}`", "str"],
    [" } }", "text"],
  ],
  [[");", "text"]],
  [
    ["const", "kw"],
    [" { items } = ", "text"],
    ["await", "kw"],
    [" res.", "text"],
    ["json", "fn"],
    ["();", "text"],
  ],
];

/**
 * The render half. This is the only panel on the page that is about Tearline,
 * and it is deliberately the shortest one — the point of the page is that this
 * is the easy job.
 */
const RECEIPT_HTML: Line[] = [
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
    ["id", "attr"],
    ["=", "text"],
    ['"r"', "str"],
    [" ", "text"],
    ["barcode", "attr"],
    ["=", "text"],
    ['"20260802"', "str"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["h1", "tag"],
    [">", "text"],
    ["Last 4 weeks", "text"],
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
    ["  ", "text"],
    ["// one <p> per item, artist + title + duration", "muted"],
  ],
  [
    ["</", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
  [["", "text"]],
  [
    ["<", "text"],
    ["script", "tag"],
    [">", "text"],
  ],
  [
    ["  r.", "text"],
    ["download", "fn"],
    ["(", "text"],
    ["'receipt.png'", "str"],
    [");", "text"],
    ["   // PNG, client-side", "muted"],
  ],
  [
    ["</", "text"],
    ["script", "tag"],
    [">", "text"],
  ],
];

/** Quota modes, verbatim from developer.spotify.com, fetched 2 August 2026. */
const QUOTA_ROWS: [string, string, string][] = [
  [
    "development mode",
    "up to 5 users",
    "Where every newly-created app starts. Spotify's wording: \"Up to 5 authenticated Spotify users can use an app that is in development mode.\" The app owner must hold a Spotify Premium account for the app to function at all.",
  ],
  [
    "extended quota mode",
    "unrestricted",
    "Removes the user cap and raises the rate limits. This is the mode every public Receiptify-style app needs, and it is granted by application rather than by request.",
  ],
  [
    "who may apply",
    "organisations only",
    "Since 15 May 2025: \"Spotify only accepts applications from organizations (not individuals).\"",
  ],
  [
    "eligibility bar",
    "250k MAUs",
    "The stated criteria include an \"Established Business Entity (legally registered business or organisation)\", \"Operating an active, and Launched Service\", and \"Maintaining a minimum of active users (at least 250k MAUs)\".",
  ],
];

/** GET /me/top/{type}, verbatim from the reference page, fetched 2 August 2026. */
const ENDPOINT_ROWS: [string, string, string][] = [
  [
    "GET /me/top/{type}",
    "artists | tracks",
    "The single endpoint behind every listening-history receipt. One required OAuth scope: user-top-read.",
  ],
  [
    "time_range",
    "default medium_term",
    "long_term is \"calculated from ~1 year of data and including all new data as it becomes available\"; medium_term is \"approximately last 6 months\"; short_term is \"approximately last 4 weeks\".",
  ],
  [
    "limit",
    "default 20 · max 50",
    "The reason these apps offer a top 10 and a top 50 and nothing in between. Fifty is the ceiling on one call.",
  ],
  [
    "offset",
    "default 0",
    "\"The index of the first item to return.\" Paging past 50 is possible, but the receipt stops being readable long before the API stops answering.",
  ],
];

/**
 * Five approaches, compared on the same three columns. The npm packages are
 * named but their version/size/dependency figures are NOT repeated here —
 * those are dated on /dom-to-png and restating them creates a second copy to
 * keep in sync. Tearline is in the table on the same terms as the rest.
 */
const APPROACH_ROWS: [string, string, string][] = [
  [
    "canvas 2D, by hand",
    "you write everything",
    "Total control, and you re-implement text wrapping, ellipsis, tabular alignment and RTL yourself. Reasonable for a fixed 10-row layout; miserable the moment the design changes.",
  ],
  [
    "headless Chrome, server-side",
    "a server per screenshot",
    "Pixel-exact and it can load remote album art without a CORS argument. It also puts a browser in your deploy, a cold start in front of every share, and a bill on a free toy.",
  ],
  [
    "html-to-image / modern-screenshot",
    "you write the CSS",
    "The zero-dependency DOM-to-image route: serialise the node into an SVG foreignObject and paint it to a canvas. You still design the receipt from scratch. Compared on today's npm numbers at /dom-to-png.",
  ],
  [
    "html2canvas",
    "you write the CSS",
    "Re-implements a renderer rather than using the browser's, so unsupported CSS silently comes out wrong. Its last release predates most of the CSS a modern receipt uses.",
  ],
  [
    "Tearline",
    "you write the rows",
    "The receipt look and the PNG export are both already written, as one custom element with no build step. It does nothing about the Spotify half, which is the half that is hard.",
  ],
];

const SOURCES: [string, string][] = [
  [
    "developer.spotify.com — quota modes",
    "The five-user development-mode cap, the Premium requirement, the 15 May 2025 organisations-only rule and the extended-quota eligibility criteria including 250k MAUs. Fetched twice on 2 August 2026.",
  ],
  [
    "developer.spotify.com — Get User's Top Items",
    "GET /me/top/{type}, the user-top-read scope, the three time_range values with their stated windows, and limit (default 20, maximum 50) and offset (default 0). Fetched 2 August 2026.",
  ],
  [
    "tearline.kynth.studio/tearline.js",
    "The component the render panel loads. 12,756 bytes, unminified, HTTP 200 on 2 August 2026.",
  ],
];

/* ---- page --------------------------------------------------------------- */

export default function SpotifyReceiptGenerator() {
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
                id={"jobs"}
                eyebrow={"Method"}
                headingTop={"There is no Receiptify library."}
                headingBottom={"There are three jobs."}
                lead
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"what you are assembling"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Nobody publishes a package that builds a Receiptify-style Spotify receipt, because a receipt generator is not one problem. It is three, and they are wildly unequal. Job one: get the listening history out of Spotify, which means OAuth, one endpoint, and a quota policy that decides whether the app can ever have users. Job two: draw a page that looks like till paper. Job three: turn that page into a PNG the user can post."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Jobs two and three are a weekend and are solved several different ways, compared further down. Job one is the entire difficulty of the project, and almost every tutorial on this topic ends before reaching it. Anyone deciding what to build should read the quota section first, because it determines whether the other two are worth starting."
                      }
                    </p>
                    <p className={"tl-docs-label tl-docs-label-gap"}>
                      {"where Tearline sits"}
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Tearline is jobs two and three in one custom element, and has nothing to do with job one. That is worth saying plainly at the top rather than at the bottom: it removes the easy work, not the hard work. If the Spotify side does not clear, no rendering library rescues the project."
                      }
                    </p>
                  </div>

                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"receipt.html"}</p>
                    <CodePanel title={"receipt.html"} lines={RECEIPT_HTML} />
                    <p className={"tl-docs-note"}>
                      {
                        "Jobs two and three, complete. The markup stays real text in the light DOM, so the track titles are still selectable and still read in order by a screen reader, and the PNG is produced in the browser with no server. The rest of the API is in the "
                      }
                      <a href={"/docs"}>{"reference"}</a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"quota"}
                eyebrow={"The cap"}
                headingTop={"Five users."}
                headingBottom={"That is the real limit."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"Spotify quota modes · fetched 2 August 2026"}
                      rows={QUOTA_ROWS}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"what this means in practice"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "A Spotify app built by one person today can serve five authenticated users. Not five hundred in a trial tier, not five thousand pending review — five, and only while the owner holds a Premium subscription. Spotify's own wording is \"Up to 5 authenticated Spotify users can use an app that is in development mode.\""
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The escape hatch, extended quota mode, closed to individuals on 15 May 2025: \"Spotify only accepts applications from organizations (not individuals).\" The published criteria go further and ask for a registered business entity, a launched service, and \"a minimum of active users (at least 250k MAUs)\" — a bar that requires already having the audience the quota would let you serve."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "So the honest read on this query in 2026 is that the popular Receiptify-style sites are grandfathered, operating under an organisation, or working from data the user supplies rather than from a live OAuth session. A new individual build is a five-seat toy unless it takes the third route, which the last section covers."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"endpoint"}
                eyebrow={"The call"}
                headingTop={"One endpoint."}
                headingBottom={"It shapes the whole UI."}
              >
                <div className={"tl-api"}>
                  <div className={"tl-api-col"}>
                    <RefTable
                      label={"GET /me/top/{type} · fetched 2 August 2026"}
                      rows={ENDPOINT_ROWS}
                    />
                  </div>

                  <div className={"tl-api-col"}>
                    <p className={"tl-docs-label"}>{"top-tracks.js"}</p>
                    <CodePanel title={"top-tracks.js"} lines={TOP_TRACKS_JS} />
                    <p className={"tl-docs-note"}>
                      {
                        "Every listening-history receipt on the web offers the same three periods and the same two lengths, and it is not a shared design convention. It is the parameter list. Spotify defines exactly three time_range values — roughly four weeks, roughly six months, and about a year of data — and caps limit at 50, so \"last month / last 6 months / all time\" and \"top 10 / top 50\" are the API's shape showing through the UI."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "One consequence worth designing around: long_term is not a lifetime history. Spotify describes it as calculated from about a year of data, so a receipt headed \"all time\" is overclaiming. Label it the way the source does."
                      }
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"picture"}
                eyebrow={"The picture"}
                headingTop={"Five ways to turn"}
                headingBottom={"the rows into a PNG."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <RefTable
                      label={"approach · what you write · trade"}
                      rows={APPROACH_ROWS}
                    />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"the failure everyone hits"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Album art is the reason most first attempts export a receipt with holes in it. Four of the five approaches above rasterise in the browser, and the browser will not let a canvas holding cross-origin pixels give them back: drawing cross-origin data without CORS approval taints the canvas, after which toBlob() and toDataURL() throw instead of returning. Spotify's image CDN is a different origin, so covers pulled straight from the API trip it."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "The fixes are to proxy the images through your own origin, to inline them as data: URIs before exporting, or to design a receipt that uses type instead of artwork — which is what actual till paper does. The mechanics, the second failure mode that looks identical but is not, and today's npm figures for the packages named above are all at "
                      }
                      <a href={"/dom-to-png"}>
                        {"export a DOM element as a PNG"}
                      </a>
                      {". The look itself — the monospace grid, the tabular figures, the torn edge — is given away in copyable CSS at "}
                      <a href={"/receipt-ui"}>{"receipt-style UI on the web"}</a>
                      {"."}
                    </p>
                  </div>
                </div>
              </DocsSection>

              <DocsSection
                id={"ship"}
                eyebrow={"Plan B"}
                headingTop={"What one person"}
                headingBottom={"can still ship."}
              >
                <div className={"tl-docs"}>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"three routes that survive the cap"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Build it for five people and stop pretending otherwise. A development-mode app is a perfectly good personal tool, and Spotify says as much — it describes the mode as suited to apps built for accessing data in a single account. Add the five allowed users by hand, ship it as a thing you and your friends use, and skip the landing page."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Or take the data from the user instead of from the API. A paste box, a CSV upload, or a file from a personal-data export removes OAuth entirely, which means no quota mode, no Premium requirement on the owner, no five-user ceiling, and no access token to store. The receipt is identical. This is the route that scales for an individual, and it is under-built relative to how many people want one."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Or make a receipt of something that is not Spotify. The format carries anything with rows, a total and a date: a month of expenses, a workout log, a reading list, a git history, an order confirmation. None of those have a gatekeeper, and the rendering and export work is the same work."
                      }
                    </p>
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"if you want the render half done"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "Tearline is the second and third jobs as one tag. Load one file, wrap your rows in "
                      }
                      <code>{"<tear-line>"}</code>
                      {
                        ", and it renders as the paper — torn edge, dashed rules, seeded barcode — and exports itself with "
                      }
                      <code>{"download()"}</code>
                      {
                        ". Zero dependencies, no build step, MIT. It makes no claim about the Spotify half and never will."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {"The "}
                      <a href={"/"}>{"playground on the home page"}</a>
                      {" edits a live receipt in the browser, and the "}
                      <a href={"/docs"}>{"documentation"}</a>
                      {
                        " has every attribute and method. Everything on this page is also buildable from scratch, and both linked write-ups exist so that it can be."
                      }
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
                    <RefTable label={"checked 2 August 2026"} rows={SOURCES} />
                  </div>
                  <div className={"tl-docs-col"}>
                    <p className={"tl-docs-label"}>{"what is deliberately not here"}</p>
                    <p className={"tl-docs-note"}>
                      {
                        "No ranking of the receipt-generator sites currently serving this query, and no claim about which of them is the original. Several are running on domains that did not exist when the genre started, their operators are not identifiable from the pages themselves, and a ranked list assembled from search results would be a guess wearing a table's clothes."
                      }
                    </p>
                    <p className={"tl-docs-note"}>
                      {
                        "Quota policy is the fastest-decaying claim on this page — it changed for individuals in May 2025 and can change again. Both figures above carry the date they were read, and the Spotify documentation is the authority, not this page. The cross-origin canvas behaviour in the export section is browser security rather than policy and moves far more slowly; it is sourced to MDN on "
                      }
                      <a href={"/dom-to-png"}>{"the export page"}</a>
                      {"."}
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
