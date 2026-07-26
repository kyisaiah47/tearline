import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tearline — any HTML, printed as a thermal receipt",
  description:
    "Wrap any HTML in one tag and it prints out as a thermal receipt. Save it as a PNG. Zero dependencies, no build step, MIT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="lenis">
      <body>
        {children}
        {/* The component the whole page is about. Loaded as a plain module from
            /public rather than bundled, because that is exactly how a visitor
            would adopt it — if this tag ever breaks, the docs are wrong. */}
        <script type="module" src="/tearline.js" />
      </body>
    </html>
  );
}
