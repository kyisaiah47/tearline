/**
 * Structured data.
 *
 * The site shipped with zero JSON-LD, which is the one thing on a page that an
 * answer engine reads as a fact rather than as prose. Everything below is
 * emitted from the same constants the visible page renders from, or is a
 * property that can be checked against the shipped file — so the schema cannot
 * drift away from the copy without the copy changing too.
 *
 * `codeRepository` IS PRESENT AGAIN, and the reason it was absent is worth keeping.
 * From 2026-07-29 it was deliberately omitted, along with an npm `installUrl`,
 * because the repository was private and the package unpublished — asserting
 * either would have handed a machine a fact a human could immediately disprove.
 * Both of those states ended and neither was noticed: measured 2026-08-13,
 * api.github.com reports the repo `"private": false` and an anonymous read of
 * src/tearline.js returns 200 with the same 14,048 bytes the origin serves, and
 * @kynth/tearline is on the npm registry. FACTS.json had gone on asserting PRIVATE,
 * re-verified as such as late as 2026-08-12, so nothing downstream was ever told.
 *
 * The lesson this file should carry: a claim that decays toward MORE capability
 * fails silently in both directions. Nothing 404s, nothing errors, the schema is
 * simply quieter than the truth — and for a component whose only growth path is
 * being found and read, the missing property WAS the growth path.
 *
 * The Organization's `sameAs` GitHub link is still the publisher's profile page
 * rather than this repo, and says nothing about whether this product can be read.
 */

const SITE = "https://tearline.kynth.studio";

// Was `${SITE}/#studio` — the studio's node filed under TEARLINE's domain, which is a
// different entity to an engine no matter what it is named. The apex defines the studio once;
// everything else references that id.
export const ORG_ID = "https://kynth.studio/#organization";
export const SITE_ID = `${SITE}/#website`;
export const APP_ID = `${SITE}/#tearline`;

/** Renders one JSON-LD block. `id` only exists to keep React keys stable. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type={"application/ld+json"}
      // JSON.stringify output is inserted verbatim; the `<` escape is the
      // standard guard against a string in the data closing the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Sitewide graph: who publishes it, what the site is, what the thing is. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Copied field-for-field from the canonical studio node on kynth.studio,
      // so the publisher here resolves to the same entity rather than to a
      // fourth spelling of it. This page had been calling the studio "Kynth
      // Studio", which matches neither the canonical `name` ("Kynth") nor its
      // `legalName` ("Kynth Studios") — a publisher an engine cannot reconcile
      // is a publisher with no accumulated trust to lend.
      //
      // `sameAs` carries only the profile that was fetched and returned 200 on
      // 2026-08-01. The canonical node also lists a YouTube handle (404 on that
      // date) and a LinkedIn profile (LinkedIn answers 999 to anything that is
      // not a browser, so it could not be confirmed either way). Neither is
      // asserted here: an unverifiable sameAs is worse than a short one,
      // because it points an engine at a dead end under our name.
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Kynth Studios",
      alternateName: "Kynth",
      url: "https://kynth.studio",
      sameAs: ["https://github.com/kyisaiah47"],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${SITE}/`,
      name: "Tearline",
      description:
        "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG.",
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": ["SoftwareApplication", "SoftwareSourceCode"],
      "@id": APP_ID,
      name: "Tearline",
      alternateName: "tear-line",
      url: `${SITE}/`,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Web component",
      operatingSystem: "Any modern browser",
      programmingLanguage: "JavaScript",
      runtimePlatform: "Browser",
      codeSampleType: "full solution",
      description:
        "A single-file custom element. Wrap any HTML in <tear-line> and it renders as a thermal receipt — torn edge, barcode, receipt type — then exports itself as a PNG with toBlob, toDataURL or download. Zero dependencies, no build step, no server, MIT licensed. The receipt stays real text in the light DOM rather than a canvas or an image.",
      featureList: [
        "Renders arbitrary HTML as a thermal receipt with one custom element",
        "Exports the rendered receipt to a PNG in the browser, with no dependency and no server",
        "Deterministic torn edge and barcode from an integer seed, so the export matches what the user saw",
        "Real text in the light DOM: selectable, searchable, translatable, screen-reader readable",
        "Works in React, Vue, Svelte, Astro or a plain script tag",
      ],
      license: "https://github.com/kyisaiah47/tearline/blob/main/LICENSE",
      /* The one property that tells an answer engine where the source is. Absent while the
       * repo was private, and never restored when it went public — so the structured data
       * described a zero-dependency readable component and gave no way to read it. */
      codeRepository: "https://github.com/kyisaiah47/tearline",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": ORG_ID },
      author: { "@id": ORG_ID },
    },
  ],
};
