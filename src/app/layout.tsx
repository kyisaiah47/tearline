import type { Metadata, Viewport } from "next";
import { IconDefs } from "@/components/Icon";
import Script from "next/script";
import "./globals.css";
import "./template.css";
import "./theme.css";
import "./mobile.css";
import "./footer.css";
import Analytics from '@/components/Analytics';
import BrandMark from '@/components/BrandMark';
import JsonLd, { siteGraph } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL("https://tearline.kynth.studio"),
  title: "Tearline — any HTML, printed as a receipt",
  description:
    "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG. Zero dependencies, no build step, MIT.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tearline — any HTML, printed as a receipt",
    description:
      "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG. Zero dependencies, no build step, MIT.",
    url: "https://tearline.kynth.studio",
    siteName: "Tearline",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Tearline — any HTML, printed as a receipt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

// The clone pipeline never emitted one, so phones fell back to the 980px desktop
// viewport and scaled the whole page down. No maximumScale/userScalable — pinch
// zoom has to stay available.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1a1917',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* The inline script below stamps `js` on <html> before React hydrates, so
     * the class is legitimately present on the client and absent on the server.
     * That is the whole point of it running early, and it is the one case
     * suppressHydrationWarning exists for. */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set BEFORE first paint. Everything a reveal hides is hidden by CSS
         * from the very first frame, and the class is what turns that on — so
         * with JS disabled or broken the rule never applies and the content is
         * simply visible, rather than hidden forever by a stylesheet whose
         * runtime never arrives to reveal it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* Sitewide structured data. In <head> so it is the same block on every
         * route; per-page schema (the FAQ, the docs article) is emitted by the
         * section that renders the copy it describes. */}
        <JsonLd data={siteGraph} />
      </head>
      <body>
        {/* ⛔ THE ICON SPRITE — every <Icon> on every route is a <use href="#i-name"> and paints
          * NOTHING without these <symbol>s in the same document. No error, no warning, no failed
          * build: just a missing glyph. gates/icon-defs.mjs proves the refs resolve in a browser. */}
        <IconDefs />
        <Analytics />
        {/* The <use href="#brand-mark"> sprite the header and footer logos
         * point at. It used to live at the bottom of the home page, which meant
         * the mark simply was not there on any other route — the logo slot
         * rendered an empty <svg>. It belongs to the shell, not to one page. */}
        <BrandMark />
        {children}
        {/* The product itself, loaded exactly the way the docs tell a visitor
         * to load it. Everything on this page that looks like a receipt is
         * rendered by this file — nothing is a screenshot, so a regression
         * ships as a visibly broken landing page rather than a silent one. */}
        <Script type={"module"} src={"/tearline.js"} strategy={"afterInteractive"} />
      </body>
    </html>
  );
}
