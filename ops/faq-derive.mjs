#!/usr/bin/env node
/* faq-derive.mjs — write `src/data/faq.json` from the question register this product ALREADY
 * renders on a live page.
 *
 *   node ops/faq-derive.mjs             derive, in this repo
 *   node ops/faq-derive.mjs --src ..    somewhere else
 *   node ops/faq-derive.mjs --print     print, write nothing
 *
 * ── WHY THIS IS A DERIVATION AND NOT A PAGE OF ANSWERS ──────────────────────────────────────
 *
 * An FAQ is the easiest page on a site to fill with sentences nobody checked. So there is no field
 * anywhere in `src/lib/surfaces.ts` for supplying a question inline: `/faq` renders this file, and
 * `workbench/ops/qa/surface-gate.mjs` re-runs this script at deploy and fails the build on a byte
 * of drift — the same contract `changelog-derive` and the shell's own `faq-derive` hold.
 *
 * ⛔ `build()` IS SYNCHRONOUS, AND THAT IS A HARD REQUIREMENT RATHER THAN A STYLE CHOICE. The gate
 * calls it as `JSON.stringify(derive.build(root), null, 2)` with no `await` — it was written
 * against the shell's derivation, which is sync — so an async `build` here does not fail loudly.
 * It stringifies a Promise to `{}`, and the gate then reports every repo in this family as
 * "faq.json is not the derivation" no matter what is in the file. That was the first version of
 * this script, and it took a gate run to see it. Sync it is, and the awkward part below is the
 * price of not editing a gate thirteen other products depend on.
 *
 * ── WHERE THE ANSWERS COME FROM, AND WHY IT IS NOT THE SAME FILE ON EVERY PRODUCT ───────────
 *
 * The shell derives its FAQ from each product's `competitors.json`. ⛔ NONE OF THESE FIFTEEN REPOS
 * HAS ONE — they are Framer ports, not comparison engines. What they have instead was enumerated
 * on 2026-08-15 by reading all fifteen:
 *
 *   src/components/faq-schema.json   a clean `{q,a}[]`, rendered as the landing page's FAQPage
 *                                    JSON-LD and as the visible accordion beside it. Five repos:
 *                                    truing, goodstanding, dosetrace, trustdesk, civicbinder-health.
 *   src/components/faq-data.ts       a module exporting `FAQS: {q,a}[]`, read by both the rendered
 *                                    accordion and the page's JSON-LD. One repo: benchfile, whose
 *                                    own header says "do not inline a second copy anywhere".
 *
 * ⛔ AND `src/components/faq-data.json` IS DELIBERATELY NOT A SOURCE, in the nine repos that have
 * one. It is a Framer-clone dump: its `q` field is the question and the answer CONCATENATED into
 * one string with no separator, beside two blobs of captured HTML. Splitting that back apart would
 * be guesswork, and guesswork is exactly what a derivation exists to keep off the page. A product
 * with no clean register declares no `faq` surface and answers 404 there, which is honest; the
 * gate agrees, and fails a repo that declares `faq` while deriving nothing.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const OUT_REL = "src/data/faq.json";

/**
 * Import an ES module and get a named export back, SYNCHRONOUSLY, by running one short-lived Node
 * process that does the import and prints JSON.
 *
 * ⛔ IT IS A REAL IMPORT, IN A REAL NODE, WHICH IS THE ONLY REASON THIS IS ACCEPTABLE. The two
 * files it loads are TypeScript — `src/lib/product.ts` and, in one repo, `src/components/faq-data.ts`
 * — and the alternative to a subprocess is parsing TypeScript with a regular expression. A regex
 * that reads a price or a URL out of a source file is right until somebody wraps a string, and
 * then it is silently wrong on a page a buyer reads. Node strips the types itself; neither file
 * imports anything, which is what makes them loadable this way and is checked by the fact that
 * this works at all.
 */
function importSync(root, file, exportName) {
  const url = pathToFileURL(file).href;
  /* ⛔ THE `@/` HOOK IS THE SAME ONE `workbench/ops/qa/surface-gate.mjs` REGISTERS, AND IT HAS TO
   * BE, because that gate imports `src/lib/product.ts` itself with only that hook installed. So
   * anything `product.ts` imports must be reachable through `@/` — which is why the price tables
   * are imported as `@/lib/prices` and not `./prices`. A relative extensionless specifier resolves
   * under Next and dies under raw Node (`ERR_MODULE_NOT_FOUND: …/src/lib/prices`), and it dies in
   * the gate rather than here, which is a worse place to find out.
   *
   * The extension probing is the gate's too, and for the reason its comment records: TypeScript's
   * `@/lib/prices` is extensionless and Node's resolver does not guess. */
  const src = [
    `import { registerHooks } from "node:module";`,
    `import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";`,
    `const ROOT = ${JSON.stringify(root)};`,
    `registerHooks({ resolve(spec, ctx, next) {`,
    `  const rel = spec.startsWith("./") || spec.startsWith("../");`,
    `  if (!spec.startsWith("@/") && !rel) return next(spec, ctx);`,
    `  const base = rel ? path.resolve(path.dirname(new URL(ctx.parentURL).pathname), spec) : path.join(ROOT, "src", spec.slice(2));`,
    `  for (const c of [base, base + ".ts", base + ".tsx", path.join(base, "index.ts")]) {`,
    `    if (fs.existsSync(c) && fs.statSync(c).isFile()) return next(pathToFileURL(c).href, ctx);`,
    `  }`,
    `  return next(spec, ctx);`,
    `} });`,
    `const m = await import(${JSON.stringify(url)});`,
    `process.stdout.write(JSON.stringify(m[${JSON.stringify(exportName)}] ?? null));`,
  ].join("\n");
  const out = execFileSync(process.execPath, ["--input-type=module", "--no-warnings", "-e", src], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return JSON.parse(out);
}

/** In order. The first that exists AND parses wins, and the winner is recorded in the output as
 *  `source`, so the page can say where its answers came from without anyone retyping it. */
const SOURCES = [
  { rel: "src/components/faq-schema.json", kind: "json" },
  { rel: "src/components/faq-data.ts", kind: "module", exportName: "FAQS" },
  /* The six products on the agent frame keep their register inside `landing.config.ts` — the one
   * config file a product on that frame IS — as `faq.items`, an array of `{tab, q, a}`. The
   * landing renders six of them at a time behind three tab chips; all of them are answered here.
   * The module imports that product's own guardrail constants through `@/`, which is why the
   * resolve hook below exists at all. */
  { rel: "src/app/(marketing)/landing.config.ts", kind: "module", exportName: "LANDING", pick: (m) => m?.faq?.items },
];

const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function readRegister(root) {
  for (const s of SOURCES) {
    const file = path.join(root, s.rel);
    if (!fs.existsSync(file)) continue;

    let rows;
    if (s.kind === "json") {
      const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
      rows = Array.isArray(parsed) ? parsed : parsed.mainEntity;
    } else {
      const value = importSync(root, file, s.exportName);
      rows = s.pick ? s.pick(value) : value;
    }

    if (!Array.isArray(rows)) continue;
    const qa = rows
      .filter((r) => r && typeof r.q === "string" && typeof r.a === "string")
      .map((r) => ({ q: clean(r.q), a: clean(r.a) }));
    if (qa.length) return { source: s.rel, qa };
  }
  return { source: null, qa: [] };
}

/** The OLDEST verification date in this product's claim register, or null.
 *
 *  ⛔ OLDEST, NOT NEWEST, for the reason `src/lib/surface-record.ts` records at length: the
 *  sentence it renders into is universally quantified, and a set is only as fresh as its stalest
 *  member. Read with `readFileSync` rather than an import, because a bare JSON import needs an
 *  import attribute under raw Node and this script is run by Node, by a deploy script and by the
 *  gate — three callers, none of them a bundler. */
function oldestVerified(root, factsRel) {
  const file = path.join(root, factsRel);
  if (!fs.existsSync(file)) return null;
  const reg = JSON.parse(fs.readFileSync(file, "utf8"));
  const claims = reg.claims ?? reg.facts ?? [];
  const dates = claims
    .filter((c) => !c.status || c.status === "verified")
    .map((c) => c.lastVerified || c.asOf)
    .filter(Boolean)
    .sort();
  return dates[0] ?? null;
}

/** Where FACTS.json is relative to the app root. Three of the fifteen repos keep the register one
 *  level above the Next app (covercheck/app, civicbinder/web, parserail/apps/parserail), so this
 *  is searched rather than assumed — and returns null rather than throwing, because a repo without
 *  a register still needs a derivable, gate-passing faq.json. */
function factsRel(root) {
  return ["FACTS.json", "../FACTS.json", "../../FACTS.json", "../../../FACTS.json"].find((rel) =>
    fs.existsSync(path.join(root, rel)),
  );
}

export function build(root) {
  const PRODUCT = importSync(root, path.join(root, "src/lib/product.ts"), "PRODUCT");
  const { source, qa } = readRegister(root);
  const rel = factsRel(root);
  return {
    slug: PRODUCT.slug,
    /* Where the answers came from, and where they are already visible. Both are printed at the
     * foot of the rendered page, so a reader can go and check that this page did not invent them. */
    source: source ?? "(no machine-readable question register in this repository)",
    verifiedAt: rel ? oldestVerified(root, rel) : null,
    qa: qa.map((r) => ({ ...r, page: `${PRODUCT.url}/` })),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const at = argv.indexOf("--src");
  const root = path.resolve(at === -1 ? "." : argv[at + 1]);
  const body = `${JSON.stringify(build(root), null, 2)}\n`;

  if (argv.includes("--print")) {
    process.stdout.write(body);
  } else {
    const file = path.join(root, OUT_REL);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const changed = !fs.existsSync(file) || fs.readFileSync(file, "utf8") !== body;
    if (changed) fs.writeFileSync(file, body);
    console.log(`${changed ? "✓ wrote" : "· unchanged"} ${OUT_REL} — ${JSON.parse(body).qa.length} answers`);
  }
}
