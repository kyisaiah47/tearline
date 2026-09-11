import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./tearline-theme.css";
import "@compound/landing/styles.css";
import "lenis/dist/lenis.css";
import Analytics from "@/components/Analytics";
import JsonLd, { siteGraph } from "@/components/JsonLd";
import LANDING from "@/landing.config";

/* THE ROOT LAYOUT, on the register. The register's one stylesheet carries the frame and the
 * document register for the landing, the docs, the guides and the route shims; the product
 * declares its accent in tearline-theme.css and nothing else, because the frame only reads the
 * --ui-brand-* contract. The element itself is loaded exactly the way the docs tell a visitor to
 * load it, so the playground on the landing drives the real thing. */

const DASH = String.fromCharCode(8212);
const TITLE = `Tearline ${DASH} any HTML, printed as a receipt`;

export const metadata: Metadata = {
  metadataBase: new URL(LANDING.domain),
  title: TITLE,
  description: LANDING.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: LANDING.tagline,
    url: LANDING.domain,
    siteName: LANDING.name,
    type: "website",
    images: [{ url: LANDING.ogImage, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    images: [LANDING.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-ui-brand={LANDING.slug} data-ui-theme={LANDING.slug} className="lenis lenis-autoToggle">
      <head>
        {/* Set BEFORE first paint. The register scopes every reveal start state to `.js
         * [data-reveal]`, so this class is what turns the hidden state on; with JS off it never
         * lands and the page is plainly visible. It is never set under reduced motion, and the 3s
         * failsafe drops it if the register's runtimes never take ownership. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.hasAttribute('data-reveals-ready')||!d.hasAttribute('data-enter-ready'))d.classList.remove('js')},3000)}catch(e){}})()",
          }}
        />
        {/* Sitewide structured data, the same block on every route. */}
        <JsonLd data={siteGraph} />
      </head>
      <body>
        {children}
        <Analytics />
        <Script type={"module"} src={"/tearline.js"} strategy={"afterInteractive"} />
      </body>
    </html>
  );
}
