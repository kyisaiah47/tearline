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

                    Every value below is this site's OWN, read off its own rendered pages rather
                    than chosen here: prose is `.tl-docs-note` at rgb(138, 138, 138), a heading is
                    rgb(209, 209, 209), and a link in the body is rgb(255, 165, 82) — the same
                    accent the install line and the nav use. `--value-gray-2` is the token the
                    stylesheet already names for the first of the three. */}
                <div
                  style={{
                    "--kx-surface-ink": "var(--value-gray-2, rgb(138, 138, 138))",
                    "--kx-surface-heading": "rgb(209, 209, 209)",
                    "--kx-surface-link": "rgb(255, 165, 82)",
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
