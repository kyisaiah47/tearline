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
    <html lang="en">
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
