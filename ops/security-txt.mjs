#!/usr/bin/env node
/* security-txt.mjs — write `public/.well-known/security.txt` from this product's own config.
 *
 *   node ops/security-txt.mjs             write, in this repo
 *   node ops/security-txt.mjs --src ..    somewhere else
 *   node ops/security-txt.mjs --print     print, write nothing
 *
 * Same derivation, same contact and same expiry rule as `workbench/ops/security-txt.mjs`, because
 * it is the same file on a different set of repos and a second answer to "who do I email" would be
 * worse than no answer. What differs is that every path is resolved against an explicit `root`
 * rather than the process's cwd: three of these fifteen repos keep the Next app below the
 * checkout root (covercheck is `app/`, civicbinder is `web/`, parserail is `apps/parserail/`), so
 * `--src` has to be able to point at the app rather than the repo.
 *
 * ── WHY IT IS GENERATED AND NOT WRITTEN ─────────────────────────────────────────────────────
 *
 * RFC 9116 makes `Expires` MANDATORY and says a file past its expiry SHOULD be considered stale
 * and not acted on. A hand-written security.txt is therefore a file that silently stops meaning
 * anything on a date nobody has in their calendar — and the failure is invisible, because the file
 * still returns 200 and still reads perfectly. Generating it means the expiry is re-stamped every
 * time the product deploys, and the gate fails the build when the file on disk has an expiry in
 * the past or does not match this derivation.
 *
 * ⛔ NOT A WALL CLOCK IN THE OUTPUT ITSELF, WHICH IS THE AWKWARD PART. Every other derived file is
 * a pure function of its source, so the gate can re-derive and compare byte for byte. An expiry
 * cannot be: it is a date in the future by construction. So the rule is split — the derivation
 * writes `Expires` as the FIRST OF THE MONTH one year out, stable for a whole month rather than
 * changing every day, and the gate compares everything except that line byte for byte while
 * checking that line is (a) parseable and (b) in the future.
 *
 * ── WHY /.well-known/ IS IN public/ AND NOT A ROUTE ─────────────────────────────────────────
 *
 * Next's App Router will not route a directory beginning with a dot. `public/` serves it verbatim.
 */

import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

/* ⛔ hello@, NOT security@. The address is taken from the apex's own live /security page, which
 * says "Found a vulnerability? Email hello@kynth.studio with details and steps to reproduce" —
 * read off kynth.studio/security, which returned 200 on 2026-08-15 when /status, /changelog and
 * /api/status on the same host did not. `security@` is the address a security.txt is EXPECTED to
 * carry and it is exactly the kind of plausible invention that would publish a bounce address on
 * twenty domains under a heading that promises a reply. */
const CONTACT = "mailto:hello@kynth.studio";

/* ⛔ THE POLICY IS THIS PRODUCT'S OWN /security, NOT THE APEX'S, and the first version of this
 * pointed at the apex. PartsProof already published a security.txt whose Policy was
 * `partsproof.kynth.studio/security` — a full coordinated-disclosure policy written for a product
 * whose entire subject is the Cyber Resilience Act's Article 14 reporting deadlines — and
 * regenerating it moved the pointer to a generic studio page. That is strictly worse for the one
 * product that had already done the work, which is the definition of a change that should not have
 * shipped. Every product in this family now serves /security, so every one can point at its own.
 *
 * The CONTACT above is the apex's, and that IS right: read off kynth.studio/security live on
 * 2026-08-15, where `hello@kynth.studio` appears three times and `security@` appears nowhere.
 * PartsProof's file carried `security@kynth.studio`, which is the address a security.txt is
 * EXPECTED to have and exactly the kind of plausible invention that publishes a bounce address
 * under a heading promising a reply. */
const policyFor = (PRODUCT) => `${PRODUCT.url}/security`;

/** First of the month, one year out. Stable for a month at a time, always in the future. */
export function expiryFrom(now) {
  const d = new Date(now);
  return new Date(Date.UTC(d.getUTCFullYear() + 1, d.getUTCMonth(), 1)).toISOString().replace(/\.\d{3}Z$/, "Z");
}

/* ⛔ THE `@/` HOOK IS NOT OPTIONAL, and dropping it was the first version of this file. Several of
 * these products import their own price table into `product.ts` as `@/lib/prices` — deliberately,
 * so that /pricing and the checkout route read one number — and TypeScript's specifier is
 * extensionless. Node's resolver does not guess an extension and does not know `@/` at all, so
 * without this the script dies with ERR_MODULE_NOT_FOUND on exactly the products whose pricing
 * page matters most. This is the same hook `workbench/ops/qa/surface-gate.mjs` registers, for the
 * same reason its own comment gives. */
function loadProduct(root) {
  registerHooks({
    resolve(spec, ctx, next) {
      /* ⛔ RELATIVE SPECIFIERS ARE PROBED TOO, NOT ONLY `@/`, and that is CoverCheck's doing.
       * `next.config.ts` is loaded outside the TypeScript path-alias resolver — a config that
       * imports `PRODUCT` (to generate the alias redirects) therefore cannot reach anything
       * through `@/`, and CoverCheck's build died with "Cannot find module './src/lib/prices'"
       * the moment its product.ts used it. So that one product's product.ts imports its price
       * module relatively, which Next resolves and raw Node does not: Node's ESM resolver never
       * guesses an extension. Both forms are handled here so the same product.ts loads under a
       * bundler, under this script, and under the gate. */
      const rel = spec.startsWith("./") || spec.startsWith("../");
      if (!spec.startsWith("@/") && !rel) return next(spec, ctx);
      const base = rel
        ? path.resolve(path.dirname(new URL(ctx.parentURL).pathname), spec)
        : path.join(root, "src", spec.slice(2));
      for (const c of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
        if (fs.existsSync(c) && fs.statSync(c).isFile()) return next(pathToFileURL(c).href, ctx);
      }
      return next(spec, ctx);
    },
  });
  return import(pathToFileURL(path.join(root, "src/lib/product.ts")).href).then((m) => m.PRODUCT);
}

export async function build(root, now = Date.now()) {
  const PRODUCT = await loadProduct(root);
  return [
    `# ${PRODUCT.name} — security contact, per RFC 9116.`,
    "# Generated by ops/security-txt.mjs from this product's own src/lib/product.ts.",
    "# Do not hand-edit: the surface gate re-runs the derivation at deploy and fails on drift.",
    "",
    `Contact: ${CONTACT}`,
    `Expires: ${expiryFrom(now)}`,
    `Policy: ${policyFor(PRODUCT)}`,
    `Canonical: ${PRODUCT.url}/.well-known/security.txt`,
    "Preferred-Languages: en",
    "",
  ].join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const at = argv.indexOf("--src");
  const root = path.resolve(at === -1 ? "." : argv[at + 1]);
  const body = await build(root);
  const rel = "public/.well-known/security.txt";

  if (argv.includes("--print")) {
    process.stdout.write(body);
  } else {
    const file = path.join(root, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const changed = !fs.existsSync(file) || fs.readFileSync(file, "utf8") !== body;
    if (changed) fs.writeFileSync(file, body);
    console.log(`${changed ? "✓ wrote" : "· unchanged"} ${rel} — expires ${expiryFrom(Date.now())}`);
  }
}
