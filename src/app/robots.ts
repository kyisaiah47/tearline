import type { MetadataRoute } from "next";

/**
 * robots.txt.
 *
 * The host answered 404 here until now, which means no crawler ever got a
 * sitemap pointer and Google reported both known URLs as "unknown to Google".
 *
 * Nothing is disallowed except the PostHog reverse-proxy path, which is an
 * analytics tunnel rather than a page — crawling it produces nothing and
 * charges us for the request. AI crawlers are deliberately NOT blocked: this
 * is an MIT component whose whole distribution model is being quoted back to
 * someone asking an assistant how to turn HTML into a receipt image.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* ⛔ THE CRAWL GUARD, WHICH THIS PRODUCT DID NOT HAVE (2026-08-22).
         * Measured that day: meta-externalagent was 92.8% of all estate traffic, 333,000
         * requests a day, 441 DISTINCT paths in 443 requests — minting URL combinations rather
         * than re-reading pages, 88.7% carrying a comma. Meta's docs say that agent respects
         * robots.txt, and robots.txt is a static asset, so a disallow stops the request before
         * it reaches Vercel — cheaper than the firewall rule that now backs it up.
         * ⛔ KEEP IN STEP WITH CRAWL_GUARD_DISALLOW in dev-shell/src/lib/crawl-guard.ts. */
        disallow: [
          "/ingest/",
          "/*?*_rsc=",
          "/*%2C",
          "/*,",
          "/*?*offset=",
          "/*?*page=",
          "/*?*q=",
        ],
      },
    ],
    sitemap: "https://tearline.kynth.studio/sitemap.xml",
    host: "https://tearline.kynth.studio",
  };
}
