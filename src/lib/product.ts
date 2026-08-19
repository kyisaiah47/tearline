import type { ProductSurfaces, SurfaceProduct } from "./surfaces";

/* WHAT TEARLINE IS, AND WHAT IT ANSWERS ON THE URLS THE OUTSIDE WORLD GUESSES.
 *
 * ⛔ EVERY VALUE BELOW WAS READ OUT OF THIS REPOSITORY OR OFF THE LIVE HOST ON 2026-08-15, NOT
 * REMEMBERED. Measured live and cache-busted: /docs and /llms.txt already answered 200 — this repo
 * publishes both — and /pricing, /demo, /faq, /sample, /login, /about, /status, /security and
 * /.well-known/security.txt were all 404.
 *
 * ⛔ NO `docs` SURFACE IS DECLARED. This repo owns `src/app/docs/page.tsx`, a real reference page
 * with every attribute and every method of the custom element on it. Next resolves a static
 * sibling before the dynamic `[surface]` route, so it keeps serving; declaring the surface would
 * put a second, thinner answer behind a URL that already has a good one.
 */

export const PRODUCT: SurfaceProduct & { surfaces: ProductSurfaces } = {
  slug: "tearline",
  name: "Tearline",
  url: "https://tearline.kynth.studio",
  /* The description this site's own root layout already publishes, verbatim. */
  blurb:
    "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG. Zero dependencies, no build step, MIT.",

  surfaces: {
    /* ⛔ `free: true` IS A CLAIM THE GATE CHECKS, NOT ONE IT BELIEVES — it fails this declaration
     * on any repo with a `src/app/api/checkout` route. This one has no `src/app/api` at all: the
     * whole product is one MIT-licensed ES module served as a static file, and the sentence the
     * landing repeats three times is "One tag, zero dependencies, no build step. MIT — free
     * forever." */
    pricing: {
      kind: "pricing",
      lede: "Tearline is free and MIT-licensed. There is nothing to buy, and this page exists to say so plainly.",
      free: true,
      note:
        "The package is published as @kynth/tearline on npm and the repository is public under the MIT licence. The " +
        "bare name `tearline` is unregisterable — npm rejects it as too similar to `readline` — which is why every " +
        "npm line on this site is scoped.",
      cta: { label: "The full reference", href: "/docs" },
    },

    about: {
      kind: "about",
      subject: "Renders any HTML you wrap in it as a thermal receipt, and exports it as a PNG in the browser",
      body: [
        "Tearline is one custom element. You load a single ES module, wrap markup you already know how to write — " +
          "headings, rules, tables, lists — in a <tear-line> tag, and the browser renders it as a receipt. The paper " +
          "is CSS wrapped around your content rather than a picture of it, so the text stays selectable and the " +
          "layout stays yours.",
        "The PNG export runs entirely in the browser: no canvas API, no dependency and no server. Nothing you put " +
          "inside the element is sent anywhere, because there is nowhere for it to be sent to.",
      ],
    },

    status: { kind: "status" },

    security: {
      kind: "security",
      /* Verified by enumerating this repo's route tree on 2026-08-15: there is no `src/app/api`
       * directory at all. No auth, no session, no database, no server-side anything. */
      accounts: false,
      collects: [],
      processors: [
        { name: "PostHog", purpose: "anonymous product analytics on this marketing site, proxied through this domain", url: "https://posthog.com/privacy" },
        { name: "Vercel", purpose: "serves this site and holds its access logs", url: "https://vercel.com/legal/privacy-policy" },
      ],
      notes: [
        "⛔ THE LIBRARY ITSELF MAKES NO NETWORK REQUESTS. Whatever you wrap in a <tear-line> element is rendered and exported in your own browser; it is never uploaded, and there is no endpoint here that could receive it.",
        "This site has no API routes of any kind — not a contact form, not a lead capture, not a checkout. There is nothing on this host that accepts a POST.",
        "The package is MIT-licensed and the repository is public, so every line of what runs in your page can be read before you load it.",
      ],
    },
  },
};
