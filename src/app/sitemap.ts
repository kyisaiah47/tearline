import type { MetadataRoute } from "next";

/**
 * sitemap.xml.
 *
 * Two routes, both real pages that render server-side. `lastModified` is a
 * fixed date rather than `new Date()` on purpose: a sitemap that reports today
 * as the modification date on every crawl teaches Google that the field carries
 * no information, and it stops being a recrawl signal. Bump these by hand when
 * a page's content actually changes.
 */
const SITE = "https://tearline.kynth.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No trailing slash: this is the exact string Next emits as the home
      // page's rel=canonical, and a sitemap that disagrees with the canonical
      // is a second candidate URL for Google to pick between.
      url: SITE,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/docs`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
