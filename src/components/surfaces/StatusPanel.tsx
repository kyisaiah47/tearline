import type { SurfaceProduct } from "../../lib/surfaces";

/* THE STATUS PANEL — one product's row out of the estate's own status feed.
 *
 * ⛔ THE PRODUCT DOES NOT WRITE ITS OWN STATUS, AND THAT IS THE WHOLE DESIGN. A status page a
 * product composes about itself says "All systems operational" on the morning it is down, because
 * the sentence and the outage are produced by the same build. Every value here comes from
 * `https://kynth.studio/api/status`, which `kynth-ops/roster/build-status.mjs` writes from a LIVE
 * cache-busted probe of this host, this host's own published sitemap freshness, and the
 * `public.kynth_jobs` ledger — three things this repo cannot write to.
 *
 * ⛔ AND WHEN THE FEED CANNOT BE READ, IT SAYS SO RATHER THAN FALLING BACK TO GREEN. A page that
 * renders "operational" out of a failed fetch is worse than no status page: it converts an unknown
 * into a reassurance, on the one surface whose entire value is that it is not doing that.
 *
 * ⛔ THIS IS NOT A REWRITE OF THE SHELL'S PANEL — IT IS THE SAME PANEL IN DIFFERENT CHROME. The
 * copy, the field list, the fallback and the ordering are the workbench's, verbatim where the
 * sentence carries meaning. What changed is the markup: the shell's version is written in
 * `register.css` class names (`rs-panel`, `rs-facts`, `rs-chip`) which exist in exactly thirteen
 * repos and none of these fifteen. Here it is semantic `h2`/`ul`/`li` inside `.kx-surface`, which
 * inherits the host page's own type and colour rather than importing a second visual system.
 *
 * ⛔ MEASURED 2026-08-15, CACHE-BUSTED: https://kynth.studio/api/status returned 404. The route
 * exists in kynth-portfolio and is committed but not yet deployed, so until the estate's deploy
 * watcher fires, every /status page built from this component renders the "could not be read"
 * branch. That is the correct output for that state, and it is why the branch is not a stub.
 */

export const STATUS_FEED = "https://kynth.studio/api/status";

export type StatusJob = {
  job: string;
  lastAt: string | null;
  ok: boolean;
  /** Minutes since its last row, against the cadence its own history establishes. */
  overdueBy: number | null;
};

export type StatusProduct = {
  slug: string;
  name: string;
  url: string;
  /** The live probe: what this host answered when the feed was built. */
  http: { ok: boolean; status: number; latencyMs: number | null };
  /** The newest lastmod this host publishes in its own sitemap. ISO date, or null. */
  lastPublished: string | null;
  jobs: StatusJob[];
  state: "operational" | "degraded" | "down";
};

export type StatusFeed = {
  generatedAt: string;
  products: StatusProduct[];
};

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

/** Deterministic and locale-free: `toLocaleDateString` depends on the build host's ICU data, so
 *  the same input can render two strings on two machines and the diff reads as a content change. */
export function longDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** How long ago, in the coarsest unit that is still honest. */
export function ago(iso: string, now: number): string {
  const mins = Math.max(0, Math.round((now - Date.parse(iso)) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} days ago`;
}

/**
 * Read the estate feed. Returns null on ANY failure — a bad status code, a parse error, a network
 * error — and the caller renders that as "the feed could not be read", never as green.
 *
 * ⛔ REVALIDATED SHORT. Vercel serves edge copies with max-age up to an hour, and a status page
 * reading an hour-old copy reports a host that came back as still down and a host that just fell
 * over as fine. Ten minutes is the shortest window that does not put a fetch on every render.
 */
export async function readStatusFeed(): Promise<StatusFeed | null> {
  try {
    const res = await fetch(STATUS_FEED, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const feed = (await res.json()) as StatusFeed;
    if (!feed || !Array.isArray(feed.products)) return null;
    return feed;
  } catch {
    return null;
  }
}

function StateChip({ state }: { state: StatusProduct["state"] }) {
  const label = state === "operational" ? "Operational" : state === "degraded" ? "Degraded" : "Down";
  return <span className={`kx-chip kx-chip--${state}`}>{label}</span>;
}

export default function StatusPanel({
  product,
  feed,
  now,
}: {
  product: SurfaceProduct;
  feed: StatusFeed | null;
  /** The build's clock, passed in rather than read here, so the component is pure. */
  now: number;
}) {
  const row = feed?.products.find((p) => p.slug === product.slug) ?? null;

  if (!feed || !row) {
    return (
      <div className={"kx-block"}>
        <p className={"kx-empty"}>
          {feed
            ? `The estate status feed does not carry a row for ${product.name}.`
            : "The estate status feed could not be read."}
        </p>
        <p className={"kx-hint"}>
          {"This page reports nothing rather than reporting good news it cannot support. The feed is " +
            "built from a live probe of this host, this host's own published freshness, and the job " +
            "ledger — none of which this site writes. Until it can be read, the honest answer is that " +
            "the state of this product is unknown from here."}{" "}
          <a href={STATUS_FEED}>{STATUS_FEED}</a>
        </p>
      </div>
    );
  }

  return (
    <div className={"kx-block"}>
      <div className={"kx-panel"}>
        <h2>
          {product.name} <StateChip state={row.state} />
        </h2>
        <ul>
          <li>
            {row.http.ok
              ? `The site answered ${row.http.status}${row.http.latencyMs === null ? "" : ` in ${row.http.latencyMs} ms`}`
              : `The site answered ${row.http.status || "nothing"} — this is a failed probe, not a slow one`}
          </li>
          <li>
            {row.lastPublished
              ? `Last published change ${longDate(row.lastPublished)}, taken from this host's own sitemap`
              : "This host publishes no freshness date in its sitemap"}
          </li>
          <li>{`Probed ${ago(feed.generatedAt, now)}`}</li>
        </ul>
      </div>

      {row.jobs.length ? (
        <>
          <h2>{"Scheduled work"}</h2>
          {row.jobs.map((j) => (
            <p key={j.job}>
              <code>{j.job}</code>
              {" — "}
              {j.lastAt
                ? `last reported ${ago(j.lastAt, now)}${j.ok ? "" : ", and it reported a failure"}${j.overdueBy ? `, which is ${j.overdueBy} min later than it normally does` : ""}`
                : "has never written a row to the ledger"}
            </p>
          ))}
        </>
      ) : (
        <p>{"No scheduled job on this estate reports for this product."}</p>
      )}

      <p className={"kx-hint"}>
        {"Every figure above is measured rather than declared. The probe is a live request to this " +
          "host with a cache-buster on it; the freshness date is the newest lastmod this host " +
          "publishes in its own sitemap; the job lines come from the estate's job ledger, which each " +
          "job writes to on completion whether it succeeded or not. Nothing on this page is written " +
          "by the product it describes."}{" "}
        <a href={"https://kynth.studio/status"}>{"The whole estate"}</a>
        {" · "}
        <a href={STATUS_FEED}>{"the feed as JSON"}</a>
      </p>
    </div>
  );
}
