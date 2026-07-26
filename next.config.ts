import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // `npm run verify` sets this so a verification build writes somewhere other
  // than .next. Building into .next while `next dev` is running overwrites the
  // manifests the dev server holds open, and every request then 500s with
  // "Cannot find module './NNN.js'" until it is restarted.
  distDir: process.env.NEXT_DIST_DIR || ".next",};

export default nextConfig;
