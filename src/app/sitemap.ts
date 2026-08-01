import type { MetadataRoute } from "next";

/**
 * sitemap.xml.
 *
 * Four routes, all real pages that render server-side. `lastModified` is a
 * fixed date rather than `new Date()` on purpose: a sitemap that reports today
 * as the modification date on every crawl teaches Google that the field carries
 * no information, and it stops being a recrawl signal. Bump these by hand when
 * a page's content actually changes.
 *
 * Bumped to 2026-07-29: commit 8637e1c rewrote the install copy on BOTH routes
 * (the npm CTA came out of page.tsx and docs/page.tsx) after these dates were
 * set, so 2026-07-28 was under-reporting a real content change. This file has
 * never been served — the host still 404s /sitemap.xml — so no crawler has been
 * told the stale date yet, and the first crawl will get the honest one.
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
  ];
}
