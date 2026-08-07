/* The shared bits must not import a product's own type file. `ShareBar` used to take
 * RuleStack's `Adoption` from `@/lib/types`, which made every consumer owe the workbench a
 * `types.ts` it had no other reason to have — a product whose data layer is shaped differently
 * could not compile the shell at all. It only ever reads one field, so it asks for one field. */
type Share = { share_pct: number | null };

/** The template's corner ticks, as a reusable child rather than eight hand-placed divs. */
export function Ticks() {
  return (
    <span className={"rs-ticks"} aria-hidden={"true"}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export const fmtInt = (n: number | null | undefined) =>
  n === null || n === undefined ? "—" : n.toLocaleString("en-US");

export const fmtPct = (n: number | null | undefined, dp = 1) =>
  n === null || n === undefined ? "—" : `${n.toFixed(dp)}%`;

export const fmtStars = (n: number | null | undefined) => {
  if (n === null || n === undefined) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
};

export const fmtDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

/** "3 days ago" for freshness, which is the thing this product is actually selling. */
export const ago = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

/**
 * A number the nightly counted. It never appears without the day it was counted — that stamp
 * is the only thing separating this product from a blog post with a table in it.
 */
export function Measured({
  value,
  unit,
  label,
  day,
  small,
}: {
  value: string | number;
  unit?: string;
  label?: string;
  day?: string | null;
  small?: boolean;
}) {
  return (
    <>
      {label ? <p className={"rs-label"}>{label}</p> : null}
      <p className={small ? "rs-measured rs-measured--sm" : "rs-measured"}>
        {value}
        {unit ? <span style={{ fontSize: "16px", marginLeft: 4 }}>{unit}</span> : null}
      </p>
      {day ? <span className={"rs-stamp rs-stamp--measured"}>{day}</span> : null}
    </>
  );
}

/** A capability someone typed in, with the date it was last checked against the docs. */
export function Asserted({ children, verifiedAt }: { children: React.ReactNode; verifiedAt?: string }) {
  return (
    <>
      <span className={"rs-asserted"}>{children}</span>
      {verifiedAt ? <> <span className={"rs-stamp rs-stamp--asserted"}>{verifiedAt}</span></> : null}
    </>
  );
}

export function Legend() {
  return (
    <div className={"rs-legend"}>
      <span className={"rs-legend-item"}>
        <span className={"rs-legend-swatch rs-legend-swatch--measured"} />
        Measured — counted from real repositories, nightly
      </span>
      <span className={"rs-legend-item"}>
        <span className={"rs-legend-swatch rs-legend-swatch--asserted"} />
        Asserted — read from the vendor docs, dated
      </span>
    </div>
  );
}

/**
 * Adoption history as a sparkline. Drawn from `rs_format_stats` rows, not decoration: a
 * format card would otherwise show one number with no direction.
 */
export function Sparkline({
  points,
  height = 34,
}: {
  points: { day: string; repo_count: number }[];
  height?: number;
}) {
  if (points.length < 2) {
    return <div className={"rs-bar rs-bar--dim"} aria-hidden={"true"} />;
  }
  const ys = points.map((p) => p.repo_count);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const span = max - min || 1;
  const w = 100;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = height - 3 - ((p.repo_count - min) / span) * (height - 6);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      className={"rs-spark"}
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio={"none"}
      role={"img"}
      aria-label={`Repositories carrying this format, ${points[0].day} to ${points[points.length - 1].day}`}
    >
      <path d={`${path} L${w} ${height} L0 ${height} Z`} fill={"var(--rs-accent)"} fillOpacity={0.1} />
      <path d={path} fill={"none"} stroke={"var(--rs-accent)"} strokeWidth={1.5} vectorEffect={"non-scaling-stroke"} />
    </svg>
  );
}

/** Adoption share as a bar. Share is repos, never files — see the engine's README. */
export function ShareBar({ adoption }: { adoption: Share | null | undefined }) {
  const pct = adoption?.share_pct ?? 0;
  return (
    <div className={"rs-bar"} role={"img"} aria-label={`${fmtPct(pct)} of indexed repositories`}>
      <i style={{ width: `${Math.max(1.5, Math.min(100, pct))}%` }} />
    </div>
  );
}
