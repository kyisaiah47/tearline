import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SurfaceShell from "../../components/surfaces/SurfaceShell";
import SurfaceBody, { surfaceLede, type FaqData } from "../../components/surfaces/SurfaceBody";
import { readStatusFeed } from "../../components/surfaces/StatusPanel";
import { surfaceRecord } from "../../lib/surface-record";
import { PRODUCT } from "../../lib/product";
import { SURFACE_COPY, renderedSurfaces, surfacePath, type SurfaceName } from "../../lib/surfaces";
import faqRaw from "../../data/faq.json";
import FACTS from "../../../FACTS.json";

/* THE ROUTE SHIMS — the URLs a backlink, an outreach email, a paid placement or an AI answer
 * deep-links to. Every one of them 404'd on this host until this file existed; the measurement is
 * in `src/lib/surfaces.ts`.
 *
 * ⛔ THIS PAGE HAS NO CONTENT OF ITS OWN, and that is deliberate rather than lazy. It reads
 * `PRODUCT`, this repo's derived `src/data/faq.json` and this repo's own `FACTS.json`, and there is
 * nothing left for a route to supply — which is what stops the fifteen copies of it drifting into
 * fifteen slightly different pages.
 *
 * ⛔ A ROOT-LEVEL `[surface]` IS SAFE HERE AND WOULD NOT BE ON THE SHELL. Every dynamic segment in
 * these repos was enumerated before this file was written and all of them are nested, so there is
 * no second root-level slug name to collide with. Better still, Next resolves a STATIC sibling
 * before a dynamic one: a repo that already publishes its own `/security` or `/about` keeps
 * serving it, by the router's own rule, with nothing to configure.
 *
 * `dynamicParams = false` is what keeps a shim from becoming a soft-404 farm: a surface this
 * product does not declare is not rendered at all, it 404s, and the product's own not-found
 * answers it.
 *
 * ⛔ A DAY, AND /status IS STILL 600 — MEASURED, NOT ASSUMED. This said "one hour, not a day,
 * because /status is in this route". That was wrong. Next takes the MINIMUM of this route's
 * `revalidate` and every fetch a path renders through, and `readStatusFeed()` sits behind
 * `surface.kind === "status"` with `next: { revalidate: 600 }` — so /status is pinned to 600 by
 * its own fetch no matter what this line says, and no other surface touches that fetch. Verified
 * 2026-08-22 against `.next/prerender-manifest.json`. Holding the route at an hour bought /status
 * nothing and re-rendered the static shims 23 extra times a day. Change the FETCH, never this.
 */

const FAQ = faqRaw as FaqData;
const RECORD = surfaceRecord(FACTS);

if (FAQ.slug !== PRODUCT.slug) {
  /* A faq.json copied from a sibling repo would publish that sibling's answers under this
   * product's name, and every shape check would pass because the shapes are identical. */
  throw new Error(
    `src/data/faq.json is ${FAQ.slug}'s, and this product is ${PRODUCT.slug}. Re-run: node ops/faq-derive.mjs`,
  );
}

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return renderedSurfaces(PRODUCT.surfaces).map((surface) => ({ surface }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ surface: string }>;
}): Promise<Metadata> {
  const { surface: name } = await params;
  const surface = PRODUCT.surfaces?.[name as SurfaceName];
  if (!surface || surface.kind === "alias") return {};

  const heading = SURFACE_COPY[name as SurfaceName].heading;
  const description = surfaceLede(name as SurfaceName, surface, PRODUCT);

  return {
    /* ⛔ `absolute`, WHICH BYPASSES ANY LAYOUT TEMPLATE. These fifteen layouts do not agree on what
     * a title template is — some append the product name, some are a bare `%s`, several declare
     * none — so a plain string here would render "About · BenchFile · BenchFile" on one host and a
     * bare "About" on the next. A bare title is what the live gate already fails ParseRail's /docs
     * for. One form, stated once, on all fifteen. */
    title: { absolute: `${heading} · ${PRODUCT.name}` },
    description,
    alternates: { canonical: PRODUCT.url + surfacePath(name as SurfaceName) },
    openGraph: {
      title: `${heading} · ${PRODUCT.name}`,
      description,
      url: PRODUCT.url + surfacePath(name as SurfaceName),
    },
  };
}

export default async function Surface({ params }: { params: Promise<{ surface: string }> }) {
  const { surface: name } = await params;
  const surface = PRODUCT.surfaces?.[name as SurfaceName];
  if (!surface || surface.kind === "alias") notFound();

  /* ⛔ THE FEED IS READ HERE AND NOWHERE ELSE, and only for /status. Every other shim is data
   * already in this repo, and a network call on the pricing page would make the build of one
   * product depend on the availability of another host. `readStatusFeed` returns null on any
   * failure and the panel renders that as "the feed could not be read" — never as green. */
  const statusFeed = surface.kind === "status" ? await readStatusFeed() : null;

  return (
    <SurfaceShell
      name={name as SurfaceName}
      heading={SURFACE_COPY[name as SurfaceName].heading}
      lede={surfaceLede(name as SurfaceName, surface, PRODUCT)}
    >
      <SurfaceBody
        name={name as SurfaceName}
        surface={surface}
        product={PRODUCT}
        faq={FAQ}
        record={RECORD}
        statusFeed={statusFeed}
        now={Date.now()}
      />
    </SurfaceShell>
  );
}
