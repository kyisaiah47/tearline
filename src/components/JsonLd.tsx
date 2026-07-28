/**
 * Structured data.
 *
 * The site shipped with zero JSON-LD, which is the one thing on a page that an
 * answer engine reads as a fact rather than as prose. Everything below is
 * emitted from the same constants the visible page renders from, or is a
 * property that can be checked against the shipped file — so the schema cannot
 * drift away from the copy without the copy changing too.
 *
 * Two claims are deliberately absent. There is no `codeRepository` and no npm
 * `installUrl`, because as of 2026-07-28 the GitHub repository is private and
 * the npm package is unpublished (see FACTS.json). Asserting either in schema
 * would be handing a machine a fact a human can immediately disprove.
 */

const SITE = "https://tearline.kynth.studio";

export const ORG_ID = `${SITE}/#studio`;
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
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Kynth Studio",
      url: "https://kynth.studio",
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
      license: "https://opensource.org/license/mit",
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
