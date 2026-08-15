/* THE ROUTE SHIMS, FOR THE PRODUCTS THAT ARE NOT ON THE WORKBENCH SHELL.
 *
 * This is the second implementation of one contract, not a second contract. The first lives at
 * `workbench/src/lib/surfaces.ts` and reaches the thirteen products vendored off that shell.
 * Twelve more products are NOT on it — they are standalone Framer ports, each with its own route
 * tree, its own chrome and its own build — and `workbench sync` will never touch them. The names,
 * the kinds, the required set and the gate are deliberately identical, so that
 * `workbench/ops/qa/surface-gate.mjs` reads a repo carrying THIS file with no change to the gate:
 * both families export a `PRODUCT` from `src/lib/product.ts` with a `surfaces` map of this shape.
 *
 * ── WHAT WAS MEASURED, LIVE AND CACHE-BUSTED, ON 2026-08-15 BEFORE THIS FILE EXISTED ────────
 *
 * Twenty-one hosts, every one of the nine names plus /llms.txt and /.well-known/security.txt.
 * `/pricing`, `/about`, `/status` and `/security` were 404 on all but a handful:
 *
 *   /status      404 on all 21.        /security   404 on 20 of 21 — PartsProof publishes its own.
 *   /about       404 on 20 of 21 — AgentWire publishes its own.
 *   /pricing     404 on 14 of 21.      security.txt  404 on 20 of 21 — PartsProof again.
 *   /llms.txt    404 on 4 — starreply, cardchase, clausewatch, leadgrade.
 *
 * ── WHY THE ROUTE IS A ROOT-LEVEL `src/app/[surface]/page.tsx` HERE, AND `/s/[surface]` THERE ──
 *
 * The shell needed the indirection because a vendored file lands in thirteen repos at once and
 * StackTab already owns a root-level `src/app/[comparison]/` — two different slug names at one
 * level is a Next build error, so the shared file had to live somewhere nothing could collide
 * with, reached by a middleware rewrite.
 *
 * ⛔ THAT COLLISION WAS CHECKED FOR HERE RATHER THAN ASSUMED AWAY. Every dynamic segment in these
 * fifteen repos was enumerated on 2026-08-15: `news/[slug]` (standup), `r/[token]` (trustdesk),
 * `wire/[slug]` (agentwire), `ada/[domain]` (civicbinder), `reference/[[...slug]]` (parserail).
 * Every one is NESTED. Not one repo has a root-level dynamic segment, so a root-level `[surface]`
 * is legal in all of them — and it is BETTER than the rewrite, because Next resolves a static
 * sibling before a dynamic one. PartsProof's own `/security` and AgentWire's own `/about` keep
 * serving their own pages by the router's own rule, with nothing to configure and nothing that
 * can be forgotten. The shell's second collision — a vendored static route silently overwriting a
 * product's own page — cannot occur here at all.
 *
 * `dynamicParams = false` is what stops this becoming a soft-404 farm: a name this product does
 * not declare is not built, it 404s, and the product's own not-found answers it.
 *
 * ⛔ EVERY IMPORT IN THIS MODULE IS RELATIVE, NOT `@/`. Three of these repos are not at the root
 * of their checkout (`covercheck/app`, `civicbinder/web`, `parserail/apps/parserail`), and
 * `next.config.ts` — which reads this file to build the alias redirects — is loaded outside the
 * TypeScript path-alias resolver entirely. A `@/lib/...` import here compiles in ten repos and
 * dies in the other five, at config-load time, before any error message is useful.
 */

/** The product this site is. The same four fields the shell's `Product` carries, redeclared here
 *  rather than imported, because there is no shared package between these fifteen repos and
 *  inventing one to hold four strings would be the heavier mistake. */
export type SurfaceProduct = {
  slug: string;
  name: string;
  /** Absolute, no trailing slash. The canonical host, which is what every self-referencing URL on
   *  a surface is built from. */
  url: string;
  blurb: string;
};

/** The closed set, identical to the shell's. A tenth name is a change to this file AND to
 *  `workbench/ops/qa/surface-gate.mjs`, not a config value — these are the URLs the outside world
 *  already guesses, and guessing more of them is not a feature. */
export const SURFACE_NAMES = ["pricing", "demo", "faq", "sample", "docs", "login", "about", "status", "security"] as const;
export type SurfaceName = (typeof SURFACE_NAMES)[number];

/** The four every product can answer truthfully, so the four that are not optional. Every product
 *  has a price (including "none"), a publisher, an up-or-down state and a security posture. */
export const REQUIRED_SURFACES: SurfaceName[] = ["pricing", "about", "status", "security"];

/** A tier, as the product's own price module already holds it. `price` is a STRING because what a
 *  buyer reads is "$499 once" or "$199 / year", and rendering a number would make this file decide
 *  the billing period — the product's fact, not this module's. */
export type SurfaceTier = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
};

export type SurfaceLink = { label: string; href: string };

export type Surface =
  /** 308 to a route this product already publishes, emitted by `next.config.ts` rather than by a
   *  page: a redirect is not a page, and a route handler that returns one would be a static route
   *  the gate would then have to special-case. `to` may be product-relative (`/#pricing`) or, for
   *  a DELIBERATE cross-host split, absolute — see ParseRail's `login` and why it must stay. */
  | { kind: "alias"; to: string }
  | {
      kind: "pricing";
      /** One sentence, the product's own, about what the price buys. */
      lede: string;
      /** ⛔ CHECKED, NOT DECLARED. The gate fails a product claiming `free` that has a
       *  `src/app/api/checkout` route, and a product declaring tiers that does not. */
      free?: boolean;
      tiers?: SurfaceTier[];
      /** Anything the reader needs beside the number — a refund line, a cap, a billing period. */
      note?: string;
      cta?: SurfaceLink;
    }
  | {
      kind: "faq";
      /** ⛔ NEVER WRITTEN HERE. `true` means "read src/data/faq.json", derived by
       *  `ops/faq-derive.mjs` from the register this product ALREADY renders on a live page.
       *  There is no field for supplying questions inline, on purpose: an inline question is one
       *  nothing re-checks. Six of the fifteen repos hold a clean machine-readable `{q,a}[]`
       *  register and declare this; the other nine keep their answers as JSX inside guide pages,
       *  which is not a source a script can re-derive, so they declare no `faq` at all rather
       *  than have this page paraphrase them. */
      fromCompare: true;
      lede?: string;
    }
  | {
      kind: "about";
      /** The product's own sentences, lifted from copy it already publishes. */
      body?: string[];
      /** ONE CLAUSE, RENDERED VERBATIM, e.g. "Files NYC Local Law 84 benchmarking reports". */
      subject?: string;
    }
  | {
      /**
       * ⛔ NOTHING ON THE STATUS PAGE IS DECLARED HERE, AND THAT IS THE WHOLE POINT. A status page
       * a product writes about itself says "operational" on the morning it is down, because the
       * sentence and the outage come out of the same build. Every value comes from the estate's
       * own feed at https://kynth.studio/api/status — built by kynth-ops/roster/build-status.mjs
       * from a live probe of this host, this host's own published sitemap freshness and the
       * kynth_jobs ledger, none of which this repo can write to.
       *
       * When the feed cannot be read, the panel SAYS SO. It never falls back to green.
       */
      kind: "status";
    }
  | {
      kind: "security";
      /** Does this product have user accounts at all? ⛔ CHECKED, NOT BELIEVED — the gate fails a
       *  `false` on a repo that has an auth route. */
      accounts: boolean;
      /** What this product stores about a visitor, in plain words. Empty means nothing. */
      collects: string[];
      /** Third parties that process data on this product's behalf. The gate fails a product with
       *  a checkout route that does not name Stripe here. */
      processors: { name: string; purpose: string; url: string }[];
      /** Anything else true of this product's security posture — one clause each. */
      notes?: string[];
    };

export type ProductSurfaces = Partial<Record<SurfaceName, Surface>>;

/** The <title>, the meta description and the h1 for each surface. Shared so that twenty-one
 *  products cannot end up with twenty-one ways of saying "Pricing". Identical to the shell's. */
export const SURFACE_COPY: Record<SurfaceName, { heading: string; noun: string }> = {
  pricing: { heading: "Pricing", noun: "what it costs" },
  demo: { heading: "Demo", noun: "the live demo" },
  faq: { heading: "Questions", noun: "the questions people ask" },
  sample: { heading: "Sample", noun: "a sample of the output" },
  docs: { heading: "Docs", noun: "the documentation" },
  login: { heading: "Log in", noun: "the sign-in page" },
  about: { heading: "About", noun: "who publishes it" },
  status: { heading: "Status", noun: "whether it is up and when it last published" },
  security: { heading: "Security", noun: "what it stores and how to report a vulnerability" },
};

/** The surfaces that RENDER, in declaration order — aliases excluded, because a redirect is not a
 *  page. This is what `generateStaticParams` builds and what the sitemap lists: a sitemap that
 *  lists a 308 is telling a crawler to fetch a URL that will send it somewhere else. */
export function renderedSurfaces(surfaces: ProductSurfaces | undefined): SurfaceName[] {
  if (!surfaces) return [];
  return SURFACE_NAMES.filter((n) => surfaces[n] && surfaces[n]!.kind !== "alias");
}

/** Every surface this product answers on, rendered or redirected. */
export function declaredSurfaces(surfaces: ProductSurfaces | undefined): SurfaceName[] {
  if (!surfaces) return [];
  return SURFACE_NAMES.filter((n) => Boolean(surfaces[n]));
}

/** The public path. `/pricing` — there is no internal path in this family. */
export const surfacePath = (name: SurfaceName): string => `/${name}`;

/**
 * The surface rows for this product's `sitemap.ts`, so that fifteen sitemaps cannot end up with
 * fifteen hand-maintained lists of the same five URLs — and so a surface added to `product.ts` can
 * never be live and absent from the sitemap, which is the drift this returns a function to prevent.
 *
 *     export default function sitemap(): MetadataRoute.Sitemap {
 *       return [ …this product's own pages…, ...surfaceSitemapRows(PRODUCT.surfaces, SITE) ];
 *     }
 *
 * ⛔ `renderedSurfaces`, NOT `declaredSurfaces`. Aliases are excluded on purpose: a sitemap that
 * lists a 307 is telling a crawler to fetch a URL that will send it somewhere else, which spends
 * crawl budget to arrive at a page that is already listed under its own name.
 *
 * ⛔ `/status` IS STAMPED `daily` AND EVERY OTHER SURFACE `monthly`, and that is not a guess about
 * traffic. The other four are static text that changes when this repo changes. `/status` renders a
 * feed re-read every hour, so any fixed `lastModified` on it is a date that will be wrong tomorrow
 * morning — the same class of claim the rest of this file exists to keep off the site.
 */
export function surfaceSitemapRows(surfaces: ProductSurfaces | undefined, site: string) {
  const base = site.replace(/\/$/, "");
  return renderedSurfaces(surfaces).map((name) => ({
    url: base + surfacePath(name),
    /** The day these URLs first resolved on this host. Before it, every one of them was a 404. */
    lastModified: "2026-08-15",
    changeFrequency: (name === "status" ? "daily" : "monthly") as "daily" | "monthly",
    priority: name === "pricing" ? 0.8 : name === "status" ? 0.4 : 0.5,
  }));
}

/**
 * The alias redirects, for `next.config.ts`:
 *
 *     import { surfaceRedirects } from "./src/lib/surfaces";
 *     import { PRODUCT } from "./src/lib/product";
 *     async redirects() { return [...surfaceRedirects(PRODUCT.surfaces), ...whatever] }
 *
 * ⛔ `permanent: false` — a 307, not a 308. These aliases point at a section of a page or at a
 * sibling host, both of which are things this estate has already moved once: BenchFile's whole
 * host changed name in July, and ParseRail's /login moved to api.kynth.studio when the cookie
 * scope forced the split. A 308 is cached by browsers forever and cannot be taken back, so the
 * one thing it buys — a marginally stronger crawl signal on a URL that is not the canonical
 * anyway — is not worth being unable to change our minds. The gate requires the URL to RESOLVE,
 * and both codes resolve.
 */
export function surfaceRedirects(surfaces: ProductSurfaces | undefined) {
  return declaredSurfaces(surfaces)
    .filter((n) => surfaces![n]!.kind === "alias")
    .map((n) => ({
      source: surfacePath(n),
      destination: (surfaces![n] as Extract<Surface, { kind: "alias" }>).to,
      permanent: false,
    }));
}
