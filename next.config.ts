import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ⛔ THE POSTHOG REVERSE PROXY WAS REMOVED 2026-08-22. It rewrote /ingest/* to
      // us.i.posthog.com, which made every analytics beacon a Vercel function invocation, a
      // Vercel edge request, and Vercel origin transfer in both directions. On one invoice that
      // was 458 GB of Fast Origin Transfer ($13.04) and 11.1M function invocations ($2.75).
      // posthog-js now talks to us.i.posthog.com directly; see src/components/Analytics.tsx.
      // Do not put this rewrite back without pricing it first.
    ];
  },
  skipTrailingSlashRedirect: true,
  // `npm run verify` sets this so a verification build writes somewhere other
  // than .next. Building into .next while `next dev` is running overwrites the
  // manifests the dev server holds open, and every request then 500s with
  // "Cannot find module './NNN.js'" until it is restarted.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The dev badge sits bottom-left on top of the footer and reads as a clipped
  // footer in every screenshot. Measured 2026-08-22: it painted over the left end
  // of this footer's band in the 1440 capture that goes on the review sheet, which
  // is the same reason agentwire and standup already carry this line.
  devIndicators: false,
};

export default nextConfig;
