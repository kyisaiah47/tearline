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
 * Bumped again 2026-08-07, and for the same reason: commits b76c925 and aac12af
 * on 2026-08-06 added the `tearline:stage` export event to the component, the
 * four-orb stage readout to the playground on the home page, and 47 lines
 * documenting the stages and their failure contract on /docs — none of which
 * moved these dates. The four content pages move to 2026-08-07 because the
 * served-size figure they each cite was corrected today (12,756 -> 14,048 bytes,
 * see FACTS.json#tearline-js-served-size); / and /docs move to 2026-08-06, the
 * day their content actually changed.
 *
 * CRAWL STATE, measured 2026-08-08 via the URL Inspection API. /sitemap.xml is
 * enrolled on sc-domain:kynth.studio and Google is reading it. /dom-to-png moved
 * from "URL is unknown to Google" to "Discovered - currently not indexed" today,
 * which makes it five of five subpages discovered: /docs, /dom-to-png,
 * /receipt-ui, /spotify-receipt-generator and /share-image-custom-element. Every
 * page this file lists except the home page is now known to Google. Indexed is
 * still 0 of 6.
 *
 * So discovery is working its way down the file in submission order, and the
 * home page is the last holdout rather than a systemic failure.
 *
 * 2026-08-09: unchanged on both counts — the home page is still the only URL
 * here Google reports as unknown, the other five are still discovered and
 * nothing is indexed yet. No new markup theory was tried, because the two
 * that were worth trying (a trailing slash, a sitemap/canonical mismatch) were
 * tested on 2026-08-06 and ruled out. Links and time, as below.
 *
 * 2026-08-12: THE PARAGRAPH ABOVE NO LONGER DESCRIBES THE MEASUREMENT. Today's
 * URL Inspection run reports six of seven URLs as "URL is unknown to Google" —
 * /docs, /dom-to-png, /receipt-ui and /share-image-custom-element have all gone
 * BACK to unknown, and /spotify-receipt-generator is the only subpage still
 * reading "Discovered - currently not indexed". So "five of five discovered"
 * was either transient or has since lapsed; it is not the current state and
 * this file should not have kept asserting it. Indexed is still 0 of 6.
 *
 * Two things were checked today rather than assumed:
 *
 * 1. The host is NOT orphaned. kynth.studio was fetched (HTTP 200) and it
 *    carries real crawlable `<a href="https://tearline.kynth.studio">` links —
 *    a Selected Work card and the logo ticker. So an inbound path from the
 *    parent domain exists and the "no inbound links" half of the note below is
 *    weaker than it reads; what the subdomain lacks is inbound links from
 *    anywhere Google already crawls often.
 *
 * 2. Every link from the HOME PAGE to the five subpages lived in SiteFooter.tsx
 *    and nowhere else. Sibling-to-sibling prose links between the content pages
 *    were already dense (/dom-to-png ↔ /receipt-ui ↔ /share-image-custom-element
 *    ↔ /spotify-receipt-generator, plus /docs), but those carry nothing while
 *    the siblings are themselves uncrawled. A sitewide boilerplate footer link
 *    is the weakest inbound signal a page can have, and it was the only one the
 *    home page gave them. Fixed the same day: four contextual prose links now
 *    sit in InstallSection.tsx, in visible body copy rather than a collapsed
 *    accordion or a footer nav. That is a real change to the home page's
 *    content, so / moves to 2026-08-12 below.
 *
 * This does not make discovery certain — it removes the one structural excuse
 * that was left. If the subpages are still unknown in a fortnight's rotation,
 * the remaining lever is external: links from somewhere Google crawls daily,
 * which is not a thing this repo can ship.
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
 * not markup. Note also that the dates below did NOT move on 2026-08-08: the
 * five npm rows and the served-size measurement were all re-fetched that day and
 * every one held, so no page content changed. Bumping lastModified without a
 * content change is the exact thing the first paragraph warns against.
 */
const SITE = "https://tearline.kynth.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No trailing slash: this is the exact string Next emits as the home
      // page's rel=canonical, and a sitemap that disagrees with the canonical
      // is a second candidate URL for Google to pick between.
      url: SITE,
      // Moves to 2026-08-12: four contextual prose links to the content pages
      // were added to the install section's body copy today. That is a content
      // change to this page, not a date bump — see the crawl-state note above.
      lastModified: new Date("2026-08-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/docs`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-07-31 with the page itself. Its numbers are dated on the
      // page and re-checked against FACTS.json, so when they are refreshed
      // this date moves with them — that is a real content change.
      url: `${SITE}/dom-to-png`,
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-08-01 with the page itself. Its claims are spec behaviour
      // rather than version numbers, so it will move less often than
      // /dom-to-png — but the CSS it quotes is read out of the shipped
      // component, so a change to tearline.js is a change here too.
      url: `${SITE}/receipt-ui`,
      lastModified: new Date("2026-08-07"),
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
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Added 2026-08-05 with the page itself. Its load-bearing claims are
      // half npm metadata (versions, licences, sizes — these move) and half
      // quotations from the WHATWG HTML Standard (these effectively do not).
      // So this date will follow the registry figures.
      // Moves to 2026-08-09: @vercel/og published 1.0.1 on 2026-08-08 and the
      // version, publish date and unpacked size in this page's routes table
      // were all wrong until today. A real figure changed, so the date moves —
      // the only one on this list that does. The other four pages had their
      // npm figures re-fetched the same day and every one held, so their dates
      // stay put; that re-verification is recorded in FACTS.json, which is
      // where "we checked and nothing moved" belongs.
      url: `${SITE}/share-image-custom-element`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
