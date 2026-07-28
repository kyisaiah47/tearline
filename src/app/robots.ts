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
        disallow: "/ingest/",
      },
    ],
    sitemap: "https://tearline.kynth.studio/sitemap.xml",
    host: "https://tearline.kynth.studio",
  };
}
