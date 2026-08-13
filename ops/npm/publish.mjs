#!/usr/bin/env node
/**
 * Stage and publish the `tearline` npm package.
 *
 * This exists because the repo root package.json is the SITE's manifest — it is
 * `"private": true` and it depends on next, react, posthog-js, lenis and sonner.
 * Publishing that would hand `npm i tearline` six runtime dependencies while the
 * package's own first line promises zero. The published manifest is
 * ops/npm/package.json instead: one file, no dependencies.
 *
 * THE GATE. On 2026-08-12 src/tearline.js — the file the root manifest's `main`
 * pointed at — was found 30 lines behind public/tearline.js. The 2026-08-06
 * commit that added the `tearline:stage` export events edited public/ only, so
 * `main` had been stale for two weeks and a publish would have shipped a
 * component OLDER than the one tearline.kynth.studio serves. Nothing detected it
 * because nothing compared them.
 *
 * So this script does not trust any file on disk. It fetches
 * https://tearline.kynth.studio/tearline.js and refuses to publish unless the
 * staged byte-for-byte sha256 matches what the site is serving right now. The
 * package and the playground can never document different components again.
 *
 *   node ops/npm/publish.mjs --dry-run   # stage + gate, npm pack, publish nothing
 *   node ops/npm/publish.mjs             # stage + gate + npm publish
 */

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, readFileSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..');
const LIVE = 'https://tearline.kynth.studio/tearline.js';

const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const die = (msg) => { console.error(`\n  REFUSED: ${msg}\n`); process.exit(1); };

const dryRun = process.argv.includes('--dry-run');

// 1. Stage. public/tearline.js is what the site deploys, so it is the candidate.
const staged = join(HERE, 'tearline.js');
rmSync(staged, { force: true });
copyFileSync(join(REPO, 'public', 'tearline.js'), staged);
copyFileSync(join(REPO, 'LICENSE'), join(HERE, 'LICENSE'));

const stagedBytes = readFileSync(staged);
const stagedSha = sha(stagedBytes);

// 2. The gate. Compare against what the origin is serving, not against a sibling file.
const res = await fetch(LIVE, { cache: 'no-store' });
if (!res.ok) die(`${LIVE} returned HTTP ${res.status}. Cannot prove the package matches the site.`);
const liveBytes = Buffer.from(await res.arrayBuffer());
const liveSha = sha(liveBytes);

console.log(`  staged  ${stagedBytes.length} bytes  ${stagedSha}`);
console.log(`  live    ${liveBytes.length} bytes  ${liveSha}`);

if (stagedSha !== liveSha) {
  die(
    `the staged component does not match ${LIVE}.\n` +
    `           Deploy the site first, or fix the drift. The package must never\n` +
    `           document a component the playground does not serve.`
  );
}

// 3. src/tearline.js is the declared source of truth for the repo. If it has
//    drifted from what ships, say so loudly — that was the original bug.
if (sha(readFileSync(join(REPO, 'src', 'tearline.js'))) !== liveSha) {
  die('src/tearline.js has drifted from the live component. Run `npm run sync` in the right direction and commit.');
}

console.log('\n  GATE PASSED — package, repo source and live origin are the same bytes.\n');

const run = (args) => execFileSync('npm', args, { cwd: HERE, stdio: 'inherit' });
run(dryRun ? ['pack', '--dry-run'] : ['publish', '--access', 'public']);
