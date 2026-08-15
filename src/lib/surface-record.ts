/* THE RECORD ON THE /about PAGE, COUNTED RATHER THAN CLAIMED.
 *
 * The shell's About surface counts releases out of `src/data/changelog.json`, which every product
 * on that shell generates from its own git history. ⛔ NONE OF THESE FIFTEEN REPOS HAS ONE —
 * checked on 2026-08-15, not assumed — so copying that page would have meant either shipping an
 * About page with an empty record or generating fifteen changelogs nobody asked for.
 *
 * What all fifteen DO have is `FACTS.json`: the dated claim register, one entry per figure the
 * product publishes, each carrying the primary source it came from and the date it was last
 * re-fetched. It is already load-bearing — `src/lib/facts.ts` throws at build time on a claim that
 * is not `verified`, so an entry parked mid-rotation cannot reach a buyer — and it is the one file
 * on these sites whose whole purpose is being re-checkable. So the About page's record is counted
 * off it.
 *
 * ⛔ THE DATE IS THE OLDEST IN THE SET, NOT THE NEWEST. The sentence it renders into is
 * universally quantified — "every figure this product publishes was re-verified against its
 * primary source on or after X" — and a set is only as fresh as its stalest member. Taking the
 * newest would date the whole register to whichever claim happened to be touched last, which is
 * the flattering answer and the wrong one. `src/lib/facts.ts` in these repos already makes exactly
 * this choice for its own on-page stamps; this is that rule, applied to the register as a whole.
 */

/** The two spellings of the register that exist across the estate. Some products key it `claims`,
 *  some `facts` — both are read here so this helper is one file rather than a per-product fork,
 *  which is the same accommodation `src/lib/facts.ts` already makes.
 *
 *  ⛔ THE ROW TYPE IS DELIBERATELY OPEN, AND THE FIRST VERSION OF IT WAS NOT. It declared `id`,
 *  `claim` and `value` as required strings, which is true of most rows in most of these fifteen
 *  registers and not of all of them — DoseTrace's has fourteen distinct row shapes, several with
 *  fields the others do not have and at least one without a field this type demanded. TypeScript
 *  rejected the whole import and the build failed. The register is a HAND-MAINTAINED file whose
 *  shape varies per product on purpose; a type that insists otherwise is a type that stops a
 *  product from publishing its own facts. Everything read below is read defensively, so an
 *  unexpected row costs a claim rather than a build. */
export type FactsFile = {
  claims?: readonly FactsClaim[];
  facts?: readonly FactsClaim[];
};

/* ⛔ EVERY FIELD IS OPTIONAL AND EVERY ONE ACCEPTS `null`. DoseTrace's register carries
 * `"sourceUrl": null` on the claims it holds without a public primary source, and a `string |
 * undefined` here rejected the whole file — the build failed on a page that renders three numbers
 * from it. A register is hand-maintained per product; the type describes what this function reads,
 * not what a product is allowed to write. */
export type FactsClaim = {
  sourceUrl?: string | null;
  /** The date the claim was taken from its source. Every register has this. */
  asOf?: string | null;
  /** The date it was last re-fetched, where the register tracks re-verification separately. */
  lastVerified?: string | null;
  status?: string | null;
};

export type SurfaceRecord = {
  /** How many claims are registered AND verified — the ones that can legally render. */
  verified: number;
  /** How many of those carry a primary-source URL. */
  sourced: number;
  /** The OLDEST verification date across the verified set, ISO, or null on an empty register. */
  oldestVerifiedAt: string | null;
};

const dateOf = (c: FactsClaim): string | null => c.lastVerified || c.asOf || null;

export function surfaceRecord(file: FactsFile): SurfaceRecord {
  const all = file.claims ?? file.facts ?? [];
  /* ⛔ A register with no `status` field at all is treated as verified, and that is a reading of
   * the data rather than a convenience: `src/lib/facts.ts` only refuses a claim whose status is
   * PRESENT and not "verified". Several of these registers carry no status key on any row, and
   * counting those as zero would print "0 registered claims" on a product with thirty-five. */
  const verified = all.filter((c) => !c.status || c.status === "verified");
  const dates = verified.map(dateOf).filter((d): d is string => Boolean(d)).sort();
  return {
    verified: verified.length,
    sourced: verified.filter((c) => /^https?:\/\//.test(c.sourceUrl || "")).length,
    oldestVerifiedAt: dates[0] ?? null,
  };
}
