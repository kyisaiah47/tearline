import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PostHog reverse proxy: analytics posts to a same-origin /ingest path and is rewritten
  // here, so ad blockers that drop us.i.posthog.com can't drop first-party analytics.
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ];
  },
  skipTrailingSlashRedirect: true,
  // `npm run verify` sets this so a verification build writes somewhere other
  // than .next. Building into .next while `next dev` is running overwrites the
  // manifests the dev server holds open, and every request then 500s with
  // "Cannot find module './NNN.js'" until it is restarted.
  distDir: process.env.NEXT_DIST_DIR || ".next",};

export default nextConfig;
