import StatusPanel, { type StatusFeed } from "./StatusPanel";
import { SURFACE_COPY, surfacePath, type Surface, type SurfaceName, type SurfaceProduct } from "../../lib/surfaces";
import type { SurfaceRecord } from "../../lib/surface-record";

/* THE SHIM RENDERER — the body of `/pricing`, `/faq`, `/about`, `/status` and `/security` on the
 * fifteen products that are not on the workbench shell.
 *
 * ⛔ IT RENDERS A BODY, NOT A PAGE. The chrome — header, footer, fonts, palette, smooth-scroll,
 * analytics — is the product's own, supplied by that repo's `SurfaceShell.tsx`, which in ten of
 * the fifteen is literally the `Article` component the repo already uses for its guide and legal
 * pages. That is the point of the split: fifteen different design systems, one set of answers, and
 * no page that renders in the wrong chrome.
 *
 * ⛔ IT INTRODUCES NO PALETTE AND NO TYPE SCALE. Everything below is `h2`/`p`/`ul`/`li`/`a`/`code`,
 * which the host's own prose stylesheet already styles — `.guide-article__body` in the ten repos
 * that have `article.css`, the repo's own body rules in the rest. `surfaces.css` adds structure
 * only (a bordered panel, a state chip, a muted footnote) and takes every colour from
 * `currentColor`, so the same markup reads correctly on a light page and a dark one without either
 * being told about the other.
 *
 * ⛔ EVERY ANSWER IS VISIBLE `<h2>` + `<p>`, NEVER a `<details>` accordion, even where the host
 * repo ships one. Google requires FAQPage answer text to be visibly present, and an answer engine
 * lifting a passage lifts rendered text. Collapsed markup satisfies neither. Same decision the
 * shell's SurfacePage records, not a second one.
 *
 * ⛔ THE SCHEMA AND THE PAGE SAY THE SAME THING BECAUSE THEY ARE BUILT FROM THE SAME VALUE — the
 * price node below is the same string the reader sees, produced once. A structured price no reader
 * can see is a price inherited from somebody else's page.
 */

export type FaqData = {
  slug: string;
  source: string;
  verifiedAt: string | null;
  qa: { q: string; a: string; page: string }[];
};

const STUDIO_ID = "https://kynth.studio/#organization";

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
function longDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

function Pricing({ product, surface }: { product: SurfaceProduct; surface: Extract<Surface, { kind: "pricing" }> }) {
  return (
    <div className={"kx-block"}>
      {surface.free ? (
        /* A free product's pricing page is not an empty page and it is not a coming-soon notice.
         * It is the answer to the question the URL asks, and the gate checks the claim against the
         * absence of a checkout route rather than believing it. */
        <p>
          {`${product.name} is free to use. There is no account, no trial and no paid tier — nothing on ` +
            `this site is behind a payment, and no part of it asks for a card.`}
        </p>
      ) : (
        (surface.tiers ?? []).map((t) => (
          <div key={t.name} className={"kx-panel"}>
            <h2>
              {t.name} <span className={"kx-price"}>{t.price}</span>
            </h2>
            <p>{t.blurb}</p>
            <ul>
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))
      )}
      {surface.note ? <p className={"kx-hint"}>{surface.note}</p> : null}
      {/* ⛔ NO PER-TIER BUY BUTTON, and that is a finding rather than an omission. Checkout on this
        * estate is a POST from a client component that follows the returned Stripe Session URL, so
        * an `<a href>` on a statically rendered shim would have nowhere honest to point. The one
        * link below goes to the block on this product's own page where the working control already
        * is. A button that looks like checkout and is not one is worse than no button. */}
      {surface.cta ? (
        <p>
          <a href={surface.cta.href}>{surface.cta.label}</a>
        </p>
      ) : null}
    </div>
  );
}

function Faq({ faq, product }: { faq: FaqData; product: SurfaceProduct }) {
  return (
    <div className={"kx-block"}>
      {faq.qa.length === 0 ? (
        <p className={"kx-empty"}>{"No questions have been answered yet."}</p>
      ) : (
        faq.qa.map((f) => (
          <div key={f.q}>
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </div>
        ))
      )}
      <p className={"kx-hint"}>
        {`Every answer above is already published on ${product.name} itself, at ` +
          `${faq.qa[0]?.page ?? product.url}. Nothing on this page is written for it: the answers are ` +
          `read out of this product's own question register by a script, and a build gate re-runs that ` +
          `script and fails the deploy if a word here has drifted from it.`}
        {faq.verifiedAt ? ` The register was last re-checked against its sources on ${longDate(faq.verifiedAt)}.` : ""}
      </p>
    </div>
  );
}

function About({
  product,
  surface,
  record,
}: {
  product: SurfaceProduct;
  surface: Extract<Surface, { kind: "about" }>;
  record: SurfaceRecord | null;
}) {
  return (
    <div className={"kx-block"}>
      {(surface.body ?? []).map((p) => (
        <p key={p}>{p}</p>
      ))}

      {/* ⛔ COUNTED, NOT CLAIMED. Every figure below is read off this product's own FACTS.json,
        * the register that already fails this repo's build when a claim it renders is not
        * verified. An "about" page is where a studio is most tempted to write a number it likes. */}
      <div className={"kx-panel"}>
        <h2>{"The record"}</h2>
        <ul>
          {surface.subject ? <li>{surface.subject}</li> : null}
          <li>
            {"Published by "}
            <a href={`https://kynth.studio/?utm_source=${product.slug}&utm_medium=studio_credit`}>
              {"Kynth Studios"}
            </a>
          </li>
          <li>
            {"Live at "}
            <a href={product.url}>{product.url.replace(/^https?:\/\//, "")}</a>
          </li>
          {record && record.verified ? (
            <li>
              {`${record.verified} registered ${record.verified === 1 ? "claim" : "claims"}, ` +
                `${record.sourced} of them carrying the primary source they came from`}
            </li>
          ) : null}
          {record?.oldestVerifiedAt ? (
            <li>{`Every one of them re-verified against that source on or after ${longDate(record.oldestVerifiedAt)}`}</li>
          ) : null}
          <li>
            {"Whether it is up right now: "}
            <a href={"/status"}>{"the status page"}</a>
            {", measured from outside this site"}
          </li>
        </ul>
      </div>

      <p className={"kx-hint"}>
        {"The figures in that record are counted from this product's own claim register rather than " +
          "written beside it, and the date is the OLDEST verification in the set rather than the " +
          "newest — a register is only as fresh as its stalest entry, and the newest date is the " +
          "flattering answer. Nothing here is a round number somebody remembered."}
      </p>
    </div>
  );
}

function Security({ product, surface }: { product: SurfaceProduct; surface: Extract<Surface, { kind: "security" }> }) {
  return (
    <div className={"kx-block"}>
      <h2>{"Reporting a vulnerability"}</h2>
      <p>
        {/* ⛔ hello@, taken from the apex's own live /security page rather than chosen here. A
          * security.txt is EXPECTED to carry security@, which makes it exactly the kind of
          * plausible invention that publishes a bounce address on twenty domains under a heading
          * promising a reply. */}
        {"Email "}
        <a href={"mailto:hello@kynth.studio"}>{"hello@kynth.studio"}</a>
        {". Include the URL, what you did, and what you saw. There is no bounty and no NDA to sign. " +
          "We will confirm receipt, and we will tell you what we changed."}
      </p>
      <p className={"kx-hint"}>
        {"The same address, with a machine-readable expiry, is published at "}
        <a href={"/.well-known/security.txt"}>{"/.well-known/security.txt"}</a>
        {" under RFC 9116."}
      </p>

      <h2>{"Accounts"}</h2>
      <p>
        {surface.accounts
          ? `${product.name} has user accounts. What is stored against one, and who else touches it, is below.`
          : /* ⛔ CHECKED, NOT CLAIMED. The gate fails this declaration on any repo that has an auth
             * route, because "there is nothing to break into" is the single most damaging sentence
             * a security page can get wrong. */
            `${product.name} has no user accounts. There is nothing to sign in to, no password to reset ` +
            `and no session to steal, and a build gate fails the deploy if an authentication route ever ` +
            `appears in this repository while this page still says otherwise.`}
      </p>

      <h2>{"What is stored"}</h2>
      {surface.collects.length ? (
        <ul>
          {surface.collects.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : (
        <p>{"Nothing about a visitor is stored by this product."}</p>
      )}

      <h2>{"Who else processes data"}</h2>
      {surface.processors.length ? (
        <ul>
          {surface.processors.map((pr) => (
            <li key={pr.name}>
              <a href={pr.url}>{pr.name}</a>
              {` — ${pr.purpose}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>{"No third party processes data on this product's behalf."}</p>
      )}

      {surface.notes?.length ? (
        <>
          <h2>{"Also true"}</h2>
          <ul>
            {surface.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </>
      ) : null}

      <p className={"kx-hint"}>
        {`${product.name} is built and run by Kynth Studios. The declarations on this page are part of ` +
          "this product's own configuration and are re-checked at every deploy against the repository " +
          "they describe: a product that claims to have no accounts and ships an authentication route " +
          "fails the build, and so does one that takes payment without naming its payment processor here."}
      </p>
    </div>
  );
}

/** The @graph. One WebPage node for the surface, plus whatever the surface itself asserts.
 *
 *  ⛔ `@id` AND `url` ARE ON THIS ORIGIN, and the publisher is referenced BY @id rather than
 *  redefined. Two descriptions of one entity is what makes an engine choose between them — and on
 *  this estate that is not hypothetical: starreply and leadgrade were serving FetchDue's
 *  Organization node to crawlers on live domains while rendering perfectly for a person. */
export function surfaceSchema({
  name,
  surface,
  product,
  faq,
}: {
  name: SurfaceName;
  surface: Surface;
  product: SurfaceProduct;
  faq: FaqData | null;
}): object {
  const url = product.url + surfacePath(name);
  const graph: Record<string, unknown>[] = [
    {
      "@type": name === "about" ? "AboutPage" : name === "faq" ? "FAQPage" : "WebPage",
      "@id": `${url}#page`,
      url,
      name: `${SURFACE_COPY[name].heading} · ${product.name}`,
      isPartOf: { "@id": `${product.url}/#website` },
      publisher: { "@id": STUDIO_ID },
      ...(name === "faq" && faq && faq.qa.length
        ? {
            mainEntity: faq.qa.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#crumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: product.name, item: product.url },
        { "@type": "ListItem", position: 2, name: SURFACE_COPY[name].heading, item: url },
      ],
    },
  ];

  if (surface.kind === "pricing" && surface.tiers?.length) {
    graph.push({
      "@type": "Product",
      "@id": `${product.url}/#product`,
      name: product.name,
      offers: surface.tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        /* The STRING the reader sees, not a number this file re-derived. `price` on an Offer wants
         * a bare amount, so it is the digits out of that same string — never a second source. A
         * tier whose label carries no digits emits no price rather than a guess. */
        ...(t.price.match(/[\d.]+/) ? { price: t.price.match(/[\d.]+/)![0], priceCurrency: "USD" } : {}),
        description: t.blurb,
        url,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function surfaceLede(name: SurfaceName, surface: Surface, product: SurfaceProduct): string {
  if (surface.kind === "pricing") return surface.lede;
  if (surface.kind === "faq") {
    return surface.lede ?? `The questions people ask about ${product.name}, answered in full, read out of this product's own register.`;
  }
  if (surface.kind === "status") {
    return `Whether ${product.name} is up, when it last published a change, and whether the work behind it is still running — measured from outside this site, not declared by it.`;
  }
  if (surface.kind === "security") {
    return `What ${product.name} stores, who else processes it, and how to report a vulnerability.`;
  }
  return product.blurb;
}

export default function SurfaceBody({
  name,
  surface,
  product,
  faq,
  record,
  statusFeed,
  now,
}: {
  name: SurfaceName;
  surface: Surface;
  product: SurfaceProduct;
  faq: FaqData | null;
  record: SurfaceRecord | null;
  statusFeed?: StatusFeed | null;
  now?: number;
}) {
  return (
    <div className={"kx-surface"}>
      {/* Mounted here rather than in the route: a route cannot forget a block it does not have to
        * remember, and fifteen routes each remembering it is fifteen chances to not. */}
      <script
        type={"application/ld+json"}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(surfaceSchema({ name, surface, product, faq })).replace(/</g, "\\u003c"),
        }}
      />
      {surface.kind === "pricing" ? <Pricing product={product} surface={surface} /> : null}
      {surface.kind === "faq" && faq ? <Faq faq={faq} product={product} /> : null}
      {surface.kind === "about" ? <About product={product} surface={surface} record={record} /> : null}
      {surface.kind === "status" ? <StatusPanel product={product} feed={statusFeed ?? null} now={now ?? 0} /> : null}
      {surface.kind === "security" ? <Security product={product} surface={surface} /> : null}
    </div>
  );
}
