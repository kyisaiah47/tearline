import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./template.css";
import "./theme.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tearline.kynth.studio"),
  title: "Tearline — any HTML, printed as a receipt",
  description:
    "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG. Zero dependencies, no build step, MIT.",
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
      </head>
      <body>
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
