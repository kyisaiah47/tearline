import type { MetadataRoute } from "next";

/**
 * sitemap.xml.
 *
 * Six routes, all real pages that render server-side. `lastModified` is a
 * fixed date rather than `new Date()` on purpose: a sitemap that reports today
 * as the modification date on every crawl teaches Google that the field carries
 * no information, and it stops being a recrawl signal. Bump these by hand when
 * a page's content actually changes.
 *
 * Bumped to 2026-07-29: commit 8637e1c rewrote the install copy on BOTH routes
 * (the npm CTA came out of page.tsx and docs/page.tsx) after these dates were
 * set, so 2026-07-28 was under-reporting a real content change.
 *
 * CRAWL STATE, measured 2026-08-06 (this comment used to say the file had never
 * been served; that stopped being true around 2026-07-30). /sitemap.xml now
 * returns 200 and Google has read it: /docs, /dom-to-png and
 * /spotify-receipt-generator all report "Discovered - currently not indexed" in
 * the URL Inspection API. The home page, /receipt-ui and
 * /share-image-custom-element still report "URL is unknown to Google".
 *
 * The home page was inspected in BOTH URL forms on 2026-08-06 —
 * `https://tearline.kynth.studio` and `https://tearline.kynth.studio/` — and
 * both returned "URL is unknown to Google". So the pathless <loc> below is NOT
 * the reason the root is undiscovered, and adding a trailing slash here would be
 * cargo cult: it would also put the sitemap at odds with the rel=canonical,
 * which is the one thing this file must never do. Leave it alone.
 *
 * What is left is the ordinary one: a host under ~90 days old with no inbound
 * links. Discovery is patchy rather than blocked, and the fix is links and time,
 * not markup.
 */
const SITE = "https://tearline.kynth.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No trailing slash: this is the exact string Next emits as the home
      // page's rel=canonical, and a sitemap that disagrees with the canonical
      // is a second candidate URL for Google to pick between.
      url: SITE,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/docs`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-07-31 with the page itself. Its numbers are dated on the
      // page and re-checked against FACTS.json, so when they are refreshed
      // this date moves with them — that is a real content change.
      url: `${SITE}/dom-to-png`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-08-01 with the page itself. Its claims are spec behaviour
      // rather than version numbers, so it will move less often than
      // /dom-to-png — but the CSS it quotes is read out of the shipped
      // component, so a change to tearline.js is a change here too.
      url: `${SITE}/receipt-ui`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-08-02 with the page itself. Its load-bearing claims are
      // Spotify quota POLICY, which is the fastest-decaying thing this host
      // publishes — the individual/organisation rule changed in May 2025 and
      // can change again — so this date is expected to move more often than
      // the three above it.
      url: `${SITE}/spotify-receipt-generator`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-08-05 with the page itself. Its load-bearing claims are
      // half npm metadata (versions, licences, sizes — these move) and half
      // quotations from the WHATWG HTML Standard (these effectively do not).
      // So this date will follow the registry figures.
      url: `${SITE}/share-image-custom-element`,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
