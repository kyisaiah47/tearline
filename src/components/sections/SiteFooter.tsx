import StudioSignature from "@/components/StudioSignature";
import Icon, { type IconName } from "@/components/Icon";
import SocialColumn from "@/components/SocialColumn";
/**
 * Site footer.
 *
 * Replaces the port's `PageContentContainer` (again, named after the slot it
 * landed in rather than what it is).
 *
 * What the donor's footer contained, and why almost none of it survived: five
 * social icons for accounts that do not exist; a newsletter form with a Submit
 * button and no backend, plus eleven hidden honeypot inputs behind it; four
 * link columns totalling twenty entries, pointing at About, Careers, Changelog,
 * Customers, Download, Docs, Blog and three legal pages, none of which are
 * pages here; and an "All systems operational" badge linking to instatus.com
 * for a component that runs entirely in the visitor's browser and has no
 * systems to be operational.
 *
 * What is left is what is true: the product, where the code is, and who made
 * it. Per the house rule, the social column becomes a single Kynth Studios link
 * rather than borrowing the parent's handles.
 *
 * ⛔ AND THAT LINK IS NO LONGER A COLUMN OF ITS OWN. It was one row under a "Studio" heading
 * beside columns of four and five, which is the shape Isaiah called a mess on 2026-08-19, and
 * it was the THIRD anchor to kynth.studio in this same footer: the "Built by" seal lockup in
 * the bar below is one, the "A Kynth Studios project" badge beside it was another. The
 * destination did not go anywhere — the signature that is built for it is the one anchor now.
 * What went is a column heading standing over a single row, and then, on 2026-08-22, the badge:
 * the copyright sentence in that same bar already reads "a Kynth Studios project.", and the
 * studio's name twice in one band is the TWO CREDITS defect. See the band below.
 *
 * The shell keeps all three of the donor's breakpoint variants, and it has to.
 * `site-footer-row` is not a phone class despite the name — it is where the
 * footer's `display: flex` and column direction live, exactly like
 * `feature-card-row` on the bento. Drop it and the footer has no layout at
 * all: the brand block floats off to the left of the section rules and the link
 * columns start halfway down the page. The content is still written once.
 */

/* ⛔ THE GLYPH IS PART OF THE ROW, NOT A LOOKUP BESIDE IT. Isaiah, 2026-08-19: "footer links,
 * pricing bullet points" — every product, present and future. §7 of
 * kynth-ops/standards/landing-layout-gate.mjs measures it on the rendered page, and it fails a
 * mark repeated across destinations, so the name sits in the row where the meaning is. */
type Group = { label: string; links: [string, string, IconName, boolean?][] };

/* Root-relative, not bare fragments: the footer renders on /docs as well, where
 * `#features` scrolls to nothing. */
const GROUPS: Group[] = [
  {
    label: "Product",
    links: [
      ["Overview", "/#hero-section", "home"],
      ["Features", "/#features", "star"],
      ["Playground", "/#playground", "play"],
      ["FAQ", "/#faq", "question"],
    ],
  },
  {
    label: "Docs",
    links: [
      ["Install", "/docs#install", "download"],
      ["API reference", "/docs#api", "api"],
      ["Exporting a PNG", "/docs#export", "export"],
      ["Accessibility", "/docs#accessibility", "eye"],
    ],
  },
  {
    /* ⛔ THESE FOUR WERE THE BOTTOM HALF OF "Docs" AND THEY ARE NOT DOCS. The comment that used
     * to sit above them said so outright — "None is a Tearline reference page" — and then filed
     * them under the reference heading anyway, "last in the group rather than among the API
     * rows". One explains the browser-side DOM-to-PNG technique generally, one the receipt look
     * and why it is packaged as a custom element, one what it takes to build a Receiptify-style
     * Spotify receipt, and one the client-versus-server decision behind any share image. They
     * are articles about the problem, not pages about this API.
     *
     * Naming them is also what balances the footer. It ran `Product 4 · Docs 8 · Code 5 ·
     * Studio 1` — Isaiah, 2026-08-19, looking at it: "extremely unbalanced and disorganized …
     * items per col and shit is like a mess". Docs was carrying two groups at once, which is
     * why it was twice the height of everything beside it. §7b of
     * kynth-ops/standards/landing-layout-gate.mjs fails a spread over two rows. */
    label: "Guides",
    links: [
      ["DOM to PNG, explained", "/dom-to-png", "image"],
      ["Receipt-style UI", "/receipt-ui", "receipt"],
      ["Spotify receipt generators", "/spotify-receipt-generator", "music"],
      ["Share images, four ways", "/share-image-custom-element", "share"],
      ["html2canvas alternatives", "/html2canvas-alternatives", "eye"],
    ],
  },
  {
    label: "Code",
    links: [
      /* THE GITHUB AND NPM ROWS ARE BACK. They were removed on 2026-07-29 because both
       * 404'd for an anonymous visitor, with a note saying they "come back when the repo
       * goes public and the package ships". Both of those happened and nothing came back:
       * measured 2026-08-13, api.github.com reports the repo `"private": false`, an
       * anonymous GET of raw.githubusercontent.com/.../src/tearline.js returns 200 and
       * 14,048 bytes, and @kynth/tearline is on the npm registry. FACTS.json still asserted
       * PRIVATE — re-verified as such as recently as 2026-08-12 — so the daily check was
       * passing on a stale reading and the site went on declining to mention an asset it
       * already had. A claim that decays toward MORE capability breaks nothing and shows
       * nothing; this product's only growth path is being found and trusted, and both of
       * its discovery surfaces were pointing nowhere. */
      ["Source on GitHub", "https://github.com/kyisaiah47/tearline", "github", true],
      ["@kynth/tearline on npm", "https://www.npmjs.com/package/@kynth/tearline", "box", true],
      ["Read the source", "/tearline.js", "doc", true],
      ["llms.txt", "/llms.txt", "txt", true],
      /* Now that the repo is readable, the licence links to the LICENSE file in it — the
       * primary artefact rather than a description of the licence. */
      ["MIT licence", "https://github.com/kyisaiah47/tearline/blob/main/LICENSE", "gavel", true],
    ],
  },
];

const LINK_COLOR =
  "var(--extracted-r6o4lv, var(--color-text, rgb(209, 209, 209)))";

const SHELL =
  "site-footer-phone link-16 nav-link nav-dropdown-trigger site-footer-row";

/* ⛔ ONE FOOTER, NOT THREE (2026-08-22).
 *
 * The capture ships this band three times — one <footer> per breakpoint, distinguished by a
 * single state class each, with two of the three hidden by `hide-phone` / `hide-tablet` /
 * `hide-desktop`. Those carry `display:none` inside a width query and nothing else, and the body
 * inside was already written once, so the two hidden copies were byte-identical markup no reader
 * could see at any width.
 *
 * They were not free. Measured on the rendered page that day this footer was 98,279 of 217,613
 * DOM bytes — 45 percent of it — serialised AGAIN into the RSC flight payload. SocialColumn's
 * marks alone appeared 6x a page (three copies x two LinkedIn rows): 13,265 bytes of duplicate
 * path data that the icon sprite cannot reach, because that file inlines its own bodies on
 * purpose (see its header — Icon.tsx is generated from a per-product name list and returns null
 * for a name that list missed).
 *
 * ⛔ ALL THREE STATE CLASSES STAY ON THE ONE ELEMENT, AND THAT IS LOAD-BEARING. `-3` and `-2`
 * each set a different fixed canvas width on `.site-footer-row` (810px and 390px), so one
 * element holding all three takes whichever `width` comes last in the file. globals.css now
 * gates each state's rules to the width at which that copy used to be the only visible one —
 * same breakpoints as `.hide-*`, same declarations byte for byte. Drop a class here and that
 * breakpoint loses its band width silently.
 *
 * SHELL is unchanged and still every donor class: `site-footer-row` is not a phone class despite
 * the name, it is where the footer's `display: flex` lives, and without it the footer has no
 * layout at all. */
const STATE_CLASSES = "footer-2-state footer-2-state-3 footer-2-state-2";

function FooterBody() {
  return (
    <div className={"content-4"} data-name={"Content"}>
          <div className={"left"} data-name={"Left"}>
            <div className={"top"} data-name={"Top"}>
              <div
                className={"logo-description"}
                data-name={"Logo + description"}
              >
                <div className={"footer-logo-container"}>
                  {/* The donor's link classes carry the mark's sizing — a bare
                   * <a> leaves .logo at 0x0 and the mark simply is not there. */}
                  <a
                    className={
                      "brand-logo-link-mobile footer-logo-link link-7-state brand-logo-link"
                    }
                    href={"/"}
                    rel={"noopener"}
                  >
                    <div
                      className={"logo"}
                      data-name={"Logo"}
                      aria-hidden={"true"}
                      data-component={"SVG"}
                    >
                      <div className={"svgContainer"}>
                        <svg
                          preserveAspectRatio={"none"}
                          width={"100%"}
                          height={"100%"}
                          style={{ width: "100%", height: "100%" }}
                        >
                          <use href={"#brand-mark"} />
                        </svg>
                      </div>
                    </div>
                    {/* Inside the anchor, as the donor has it — the container
                     * lays the mark and the wordmark out as one row only when
                     * they are siblings within the link. */}
                    <div
                      className={"brand-wordmark"}
                      data-component={"RichTextContainer"}
                    >
                      <h4
                        className={"heading-4"}
                        dir={"auto"}
                        style={{
                          "--rt-text-color":
                            "var(--extracted-1eung3n, var(--color-text, rgb(209, 209, 209)))",
                        }}
                      >
                        {"Tearline"}
                      </h4>
                    </div>
                  </a>
                </div>
                <div
                  className={"footer-tagline"}
                  data-component={"RichTextContainer"}
                >
                  <p className={"heading-4 nav-link-text"} dir={"auto"}>
                    {"Wrap any HTML in one tag and it prints as a receipt."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={"right"}
            data-border={"true"}
            data-name={"Right"}
            /* ⛔ THE TOP RULE IS OFF, AND IT HAD TO BE TURNED OFF HERE RATHER THAN IN A SHEET.
             * It was the seam between the brand column and the link columns while they sat side
             * by side. Stacked, it draws a second hairline directly above the column row, and the
             * approved shape has exactly one — the band's. `--border-top-width` is written INLINE
             * on this element, so no stylesheet can outbid it: footer.css set it to 0 and the
             * line stayed, measured on the running page. */
            style={{ "--border-left-width": "0px", "--border-top-width": "0px" }}
          >
            <div className={"content-stack"}>
              {GROUPS.map((group) => (
                <div className={"footer-product-group"} key={group.label}>
                  <div className={"label-4"} data-name={"Label"}>
                    <div
                      className={"footer-product-heading"}
                      data-component={"RichTextContainer"}
                    >
                      <p className={"heading-4 menu-label"} dir={"auto"}>
                        {group.label}
                      </p>
                    </div>
                  </div>
                  <div className={"links-6"} data-name={"Links"}>
                    {group.links.map(([label, href, icon, external]) => (
                      <div className={"menu-overview-link"} key={label + href}>
                        <a
                          className={
                            "small-3 link-16 nav-link small-2 small-3-state small tl-footer-row"
                          }
                          data-name={"Small"}
                          data-highlight={"true"}
                          href={href}
                          tabIndex={0}
                          {...(external
                            ? { target: "_blank", rel: "noopener" }
                            : {})}
                        >
                          <Icon name={icon} size={18} className={"tl-footer-mark"} />
                          <div
                            className={"nav-link-label"}
                            data-component={"RichTextContainer"}
                          >
                            <p
                              className={"heading-4 body-text"}
                              dir={"auto"}
                              style={{ "--rt-text-color": LINK_COLOR }}
                            >
                              {label}
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* ⛔ THE FIFTH COLUMN. The rail this replaces sat under the brand block as ten
                  coloured trademarks; it is a headed column in the same shell as the four beside
                  it now, so the marks are part of the footer rather than an addition to it. */}
              <SocialColumn />
            </div>

            <div className={"footer-bottom-bar"} data-border={"true"}>
              <div
                className={"footer-copyright-text"}
                data-component={"RichTextContainer"}
              >
                <p className={"heading-4 body-text"} dir={"auto"}>
                  {/* The © named the product and the licence and stopped there; the studio was
                    * named only as an unlinked line in the column above. Both names in one string
                    * is the form every other product ships. */}
                  {"© 2026 Tearline. MIT licensed — free forever. A "}
                  {/* The studio's name is PLAIN TEXT here now. It was the credit link, with the
                    * mark painted on it by a `::before` in globals.css — a lockup re-assembled
                    * out of a glyph and a word whose size, gap and lift were decided in a
                    * stylesheet in this repo, so it drifted from the real one the day either
                    * side moved. The link is the signature at the far end of this band. */}
                  {"Kynth Studios"}
                  {" project."}
                  {" The studio behind "}
                  <a className={"kynth-sibling"} href={"https://agentwire.kynth.studio"} rel={"noopener"}>{"Agentwire"}</a>
                  {", "}
                  <a className={"kynth-sibling"} href={"https://breachprobe.kynth.studio"} rel={"noopener"}>{"BreachProbe"}</a>
                  {" and "}
                  <a className={"kynth-sibling"} href={"https://citerank.kynth.studio"} rel={"noopener"}>{"CiteRank"}</a>
                  {"."}
                </p>
              </div>
              {/* ⛔ THE BAND'S MIDDLE GROUP IS EMPTY, AND THE BOX STAYS SO THE SEAL KEEPS THE
                * THIRD TRACK. What was here was an accent-coloured badge reading "A Kynth Studios
                * project", beside a copyright sentence that already says "a Kynth Studios
                * project." in the same band. Isaiah, off that render: "we dont need a kynth
                * studios project what?" One credit is a signature; two read as a template filled
                * in twice. `footer-shape.mjs`'s TWO CREDITS check is the standing measurement —
                * it counted the phrase twice in this footer at both 1440 and 390.
                *
                * ⛔ THE COPYRIGHT SENTENCE IS THE CREDIT AND IT STAYS, AND SO DOES THE SEAL. The
                * "Built by" lockup below is the signature, not a second credit — the spec names
                * it as the band's third group. The badge's destination went nowhere either: it
                * pointed at kynth.studio with the same utm pair the signature carries, and the
                * signature is the anchor built for that.
                *
                * ⛔ AND WHAT IS LEFT IS AN EMPTY CONTAINER RATHER THAN NOTHING. The band is
                * `1fr auto 1fr` with the three groups placed by `:nth-child`; drop this box and
                * the signature becomes child 2, lands in the centre track and paints in the
                * middle of the band. Tearline publishes no policy pages — its surfaces are
                * pricing, about, status and security, and there is no privacy/terms/cookie route
                * to link — so the centre is honestly empty, which the spec names as a fact about
                * a product rather than a defect to paper over. An empty box is 0x0
                * (`width: auto; height: auto`, globals.css:3257), so the auto track collapses to
                * it and the band reads as two groups. Same shape as dev-shell's `LegalLinks()`,
                * which returns an empty `.rs-footer-links-group` for exactly this reason. */}
              <div className={"status-badge-container"} />
                {/* THE STUDIO SIGNATURE — "Built by" + the seal lockup, approved by Isaiah
                  * 2026-08-19 off a rendered four-way comparison of this footer bar. Spec:
                  * kynth-ops/standards/STUDIO-CREDIT-SEAL.md. Reference implementation:
                  * kynth-agent-shell/frame/sections/SiteFooter.tsx, live on six products.
                  *
                  * ⛔ THIS PAGE WAS PAINTING THE OLD MARK THREE TIMES, and only one of the three
                  * was the credit. `footer a[href^="https://kynth.studio"]::before` in globals.css
                  * was keyed on the HREF rather than on a class, so it also drew on the footer nav
                  * link labelled "Kynth Studios" and on the status badge reading "A Kynth Studios
                  * project" — measured live at 1440 before this change. studio-gate fails a page
                  * that paints the lockup and the old glyph together, so the rule was deleted
                  * rather than overridden; the two other anchors are plain links now, which is
                  * what they always were.
                  *
                  * ⛔ IT IS A SECOND `heading-4 body-text` PARAGRAPH, NOT A BARE ANCHOR, so the
                  * signature inherits the credit sentence's own type and colour at every
                  * breakpoint instead of whatever the wrapping div computes.
                  *
                  * ⛔ `alt` IS LOAD-BEARING: the wordmark is inside the picture, so that string is
                  * the only machine-readable "Kynth Studios" on the signature, and studio-gate
                  * asserts it reads exactly that alongside the height and the 4:1 ratio. Both
                  * dimensions are declared — the shot is 1128x282, so 80x20; a PNG given only a
                  * height reserves nothing until it decodes and reflows the bar.
                  *
                  * ⛔ THE ONDARK/ONLIGHT CHOICE IS NO LONGER A CONSTANT. It used to be made here,
                  * "-ondark because the ground behind this bar measures rgb(26, 25, 23)". The site
                  * has two themes as of 2026-08-23 and that ground is now cream on one of them,
                  * where a white wordmark paints as a black slab. StudioSignature measures the
                  * attribute at runtime and swaps one img's src; see its header for why it is one
                  * element and one alt rather than two images with one hidden. */}
                <StudioSignature slug={"tearline"} />
            </div>
          </div>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <div className={"page-content-container"}>
      <footer
        className={`${SHELL} ${STATE_CLASSES}`}
        data-border={"true"}
        style={{ width: "100%" }}
      >
        <FooterBody />
      </footer>
    </div>
  );
}
