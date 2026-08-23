import type { CSSProperties, ReactNode } from "react";

import { DocsSection } from "../DocsShell";
import SiteHeader from "../sections/SiteHeader";
import SiteFooter from "../sections/SiteFooter";
import SmoothScroll from "../SmoothScroll";
import { SURFACE_COPY, type SurfaceName } from "../../lib/surfaces";
import "./surfaces.css";

/* THE PER-PRODUCT HALF OF THE ROUTE SHIMS: what Tearline's own chrome is.
 *
 * ⛔ EVERY WRAPPER BELOW IS COPIED VERBATIM FROM `src/app/docs/page.tsx`, which is this site's one
 * existing prose page. The capture scopes its rules under `page-root` and the long `page-body …`
 * class list, and `DocsSection` is — in its own words — "InstallSection's shell, lifted whole".
 * Reproducing that chain is what makes a surface page look like this site rather than like a
 * document that landed on it.
 *
 * ⛔ THE INLINE <style> IS PART OF THE CHROME, NOT DECORATION. `/docs` sets the body background and
 * a 93.75% root font size there because the capture's dark ground is a token the layout does not
 * apply on its own. Omitting it renders a dark-ink page on a white body — nothing errors, and it
 * is the first thing anyone would notice.
 *
 * ⛔ AND NO `data-reveal` ANYWHERE, for the reason DocsShell's own header gives at length:
 * globals.css hides every `[data-reveal]` while JavaScript is on, and ScrollReveals only un-hides
 * the ids listed under the CURRENT ROUTE in motion-data.json — which has entries for `/` alone. A
 * reveal attribute on a prose page renders the whole thing invisible to anyone with JS enabled.
 */

export default function SurfaceShell({
  name,
  heading,
  lede,
  children,
}: {
  name: SurfaceName;
  heading: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <div id={"main"}>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ":root body { background: var(--token-2677a7ab-1420-48e4-957c-83a3935eeb1d, rgb(26, 26, 26)); } :root { font-size: 93.75%; }",
          }}
        />
        <div
          className={"page-root-mobile page-root"}
          data-layout-template={"true"}
          style={{ minHeight: "100vh", width: "auto" }}
        >
          <SiteHeader />
          <div
            className={"page-body section-wrapper faqsection-closed-3 footer-inner page-wrapper"}
            style={{ width: "auto", display: "contents" }}
          >
            <main className={"page"} data-name={"Main"}>
              {/* The two-line heading is the section shell's own shape, so the surface's heading
                  takes the first line and its one-clause noun — "what it costs", "whether it is up
                  and when it last published" — takes the second, rather than a second sentence
                  written here for each of four pages. */}
              <DocsSection
                id={name}
                eyebrow={heading}
                headingTop={`${heading}.`}
                headingBottom={SURFACE_COPY[name].noun}
                lead
              >
                <p className={"tl-docs-note"}>{lede}</p>
                {/* ⛔ THE INK TOKENS, BECAUSE THIS SITE NEVER SETS A COLOUR ON A BARE ELEMENT.
                    Measured in a real browser at 1440px on 2026-08-15: `body` computes to
                    rgb(0, 0, 0) against a rgb(26, 25, 23) ground, so a `<p>` with no class of its
                    own renders near-black on near-black and an `<a>` renders the browser's default
                    blue. The first version of this page did exactly that — 200, correct canonical,
                    correct title, correct JSON-LD, and unreadable.

                    Every value below is this site's OWN — and as of 2026-08-23 every one of the
                    three is a TOKEN, not a literal. Two of them used to be hexes read off the
                    rendered page: rgb(209, 209, 209) for a heading and rgb(255, 165, 82) for a
                    link. A measured literal is correct exactly until the palette moves, and the
                    palette has now moved twice — the accent is gone, and the site has a light
                    theme, on which a hardcoded #d1d1d1 heading would have rendered near-white on
                    cream across all four surface routes with nothing to catch it. */}
                <div
                  style={{
                    "--kx-surface-ink": "var(--value-gray-2, #8f8b84)",
                    "--kx-surface-heading": "var(--color-text, #e8e2d8)",
                    "--kx-surface-link": "var(--color-background, #f2ece1)",
                  } as CSSProperties}
                >
                  {children}
                </div>
              </DocsSection>
            </main>
          </div>
          <SiteFooter />
        </div>
        <div id={"template-overlay"} />
      </div>
    </>
  );
}
