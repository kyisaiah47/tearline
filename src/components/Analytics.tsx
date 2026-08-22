'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

// House Kynth PostHog project (shared across apps; each app self-labels via the `app`
// for a marketing + checkout site (no auth / demo / dashboard).
//
// GENERATED from demos/roster/templates/Analytics.tsx.tmpl by the analytics-coverage step of
// the 05:20 roster sync. Safe to hand-edit afterwards — the step only ever writes this file
// when it is missing, never over an existing one.
// ⛔ IT TALKS TO us.i.posthog.com DIRECTLY, AND THE /ingest REVERSE PROXY IS NOT COMING BACK.
// This comment described one until 2026-08-22 and the mechanism had been removed that morning:
// rewriting /ingest/* to PostHog made every analytics beacon a Vercel function invocation, a
// Vercel edge request and Vercel origin transfer in both directions — 458 GB of Fast Origin
// Transfer ($13.04) and 11.1M function invocations ($2.75) on one invoice. The proxy exists to
// stop ad blockers dropping first-party analytics; that is worth something, but it was never
// priced against what it costs on this platform. Do not reinstate it without pricing it first.
const POSTHOG_KEY = 'phc_uHpxqQHE6veLG48Tv45K3myHfUG7ZGx28dRyFKCVtQox';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const POSTHOG_UI_HOST = 'https://us.posthog.com';

// The roster slug this app was built for. Every event carries it as the `app` property, and
// that property is what the estate digest and analytics dashboard group by.
const APP_SLUG = 'tearline';

// host -> clean app slug. Only *.kynth.studio encodes the slug in its subdomain; for any other
// host the subdomain is NOT the slug (health.civicbinder.org would resolve to "health", which
// is not a product), so the build-time slug is the answer. local/preview -> "dev" (excluded).
function appSlugFromHost(host: string): string {
  const bare = host.split(':')[0].toLowerCase();
  if (bare === 'localhost' || bare.endsWith('.localhost') || /^[\d.]+$/.test(bare) || bare.endsWith('.vercel.app')) return 'dev';
  if (bare.endsWith('.kynth.studio')) return bare.replace(/\.kynth\.studio$/, '').split('.')[0] || APP_SLUG;
  return APP_SLUG;
}

let initialized = false;
let purchaseFired = false;
let checkoutHooked = false;

function init() {
  if (initialized || typeof window === 'undefined') return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: POSTHOG_UI_HOST,
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    person_profiles: 'identified_only',
    disable_session_recording: true,
    capture_exceptions: true,
    // Error-tracking noise gate (2026-08-17). PostHog's weekly digest was 363 exceptions of
    // which 333 were two browser artifacts no code here can fix — Outlook's SafeLink wrapper
    // ("Object Not Found Matching Id:N, MethodName:update") and the benign ResizeObserver
    // loop notice — and the rest were a dev server's compile errors on localhost. All three
    // drown out real crashes, so they are dropped here, before the request leaves the page.
    before_send: (event) => {
      if (!event || event.event !== '$exception') return event;
      try {
        const host = window.location.host.split(':')[0].toLowerCase();
        if (host === 'localhost' || host.endsWith('.localhost') || /^[\d.]+$/.test(host) || host.endsWith('.vercel.app')) return null;
        const v = JSON.stringify(event.properties?.$exception_values ?? '');
        if (/Object Not Found Matching Id:\d+/.test(v)) return null;
        if (/ResizeObserver loop/.test(v)) return null;
      } catch {
        // a noise gate must never be the thing that breaks a page
      }
      return event;
    },
  });
  initialized = true;
  try {
    const slug = appSlugFromHost(window.location.host);
    posthog.register({ app: slug });
    posthog.group('app', slug, { name: slug });
  } catch {
    // a missing app label must never throw
  }
  // Funnel top: any pricing "buy" click (a[data-checkout-tier]) -> checkout_started.
  if (!checkoutHooked) {
    checkoutHooked = true;
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement)?.closest?.('a[data-checkout-tier]') as HTMLAnchorElement | null;
      if (a) {
        try { posthog.capture('checkout_started', { tier: a.getAttribute('data-checkout-tier') }); } catch {}
      }
    });
  }
}

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => { init(); }, []);

  useEffect(() => {
    if (!pathname || !initialized) return;

    // First-touch UTM attribution — rides on every later event (incl. checkout/purchase).
    const utm: Record<string, string> = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = searchParams?.get(k);
      if (v) utm[k] = v;
    }
    if (Object.keys(utm).length) {
      posthog.register_once(utm);
      posthog.setPersonProperties(undefined, utm);
    }

    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture('$pageview', { $current_url: url, $host: window.location.host });

    // Purchase: Stripe checkout success returns to /?paid=1 (api/checkout success_url).
    // Fire once per load so a refresh can't double-count.
    if (!purchaseFired && searchParams?.get('paid') === '1') {
      purchaseFired = true;
      posthog.capture('purchase_completed', { app: appSlugFromHost(window.location.host) });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
