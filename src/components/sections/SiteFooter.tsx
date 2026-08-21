import SocialRail from "@/components/SocialRail";
import Icon, { type IconName } from "@/components/Icon";
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
 * the bar below is one, the "A Kynth Studios project" badge beside it is another. The
 * destination did not go anywhere — it is still reached twice, from the signature that is
 * built for it. What went is a column heading standing over a single row.
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
      ["API reference", "/docs#api", "code"],
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

const VARIANTS: [string, string][] = [
  ["footer-2-state", "hide-phone hide-tablet"],
  ["footer-2-state-3", "hide-phone hide-desktop"],
  ["footer-2-state-2", "hide-desktop hide-tablet"],
];

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
              
        {/* ⛔ UNDER THE BRAND BLOCK, NOT A ROW OF ITS OWN AFTER THE LEGAL LINE. Isaiah rejected
            the bolted-on band twice: a new full-width strip below the copyright, with a dead gap
            above it, reads as an addition to the footer rather than as part of it. Placement
            picked 2026-08-21 off a rendered sheet of three candidates shot on all forty-two live
            footers — this container is the one option A measured into on THIS page.

            ⛔ AND IT IS §7b-SAFE: §7 exempts an icon-only social link ("already a mark"), so
            these marks are not a footer column however they are laid out. */}
        <div className={"kynth-social-slot"} style={{ width: "100%", marginTop: "18px" }}>
          <SocialRail />
        </div>
      </div>
            </div>
          </div>

          <div
            className={"right"}
            data-border={"true"}
            data-name={"Right"}
            style={{ "--border-left-width": "0px", "--border-top-width": "1px" }}
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
                    * side moved. The link is the signature below this paragraph. */}
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
                  * height reserves nothing until it decodes and reflows the bar. `-ondark`
                  * because the ground behind this bar measures rgb(26, 25, 23). */}
                <p className={"heading-4 body-text kynth-signature-line"} dir={"auto"}>
                  <a
                    className={"kynth-signature"}
                    href={"https://kynth.studio/?utm_source=tearline&utm_medium=studio_credit"}
                    target={"_blank"}
                    rel={"publisher noopener"}
                  >
                    <span>{"Built by"}</span>
                    <img
                      src={"/brand/kynth-studios-lockup.png"}
                      alt={"Kynth Studios"}
                      width={80}
                      height={20}
                      loading={"lazy"}
                      decoding={"async"}
                    />
                  </a>
                </p>
              </div>
              <div className={"status-badge-container"}>
                <a
                  className={
                    "herosection-dot-4 nav-dropdown-trigger herosection-dot herosection-dot-4-state herosection-dot-2"
                  }
                  data-name={"Dot"}
                  href={"https://kynth.studio/?utm_source=tearline&utm_medium=studio_credit"}
                  target={"_blank"}
                  rel={"noopener"}
                >
                  <div
                    className={"herosection-dot-3"}
                    data-border={"true"}
                    data-name={"Dot"}
                    style={{ borderRadius: "2px" }}
                  />
                  <div
                    className={"hiring-badge"}
                    data-component={"RichTextContainer"}
                  >
                    <p
                      className={"heading-4 menu-label"}
                      dir={"auto"}
                      style={{
                        "--rt-text-color":
                          "var(--extracted-r6o4lv, var(--color-background, rgb(255, 165, 82)))",
                      }}
                    >
                      {"A Kynth Studios project"}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <div className={"page-content-container"}>
      {VARIANTS.map(([state, hide]) => (
        <footer
          key={state}
          className={`${SHELL} ${state} ${hide}`}
          data-border={"true"}
          style={{ width: "100%" }}
        >
          <FooterBody />
      
        </footer>
      ))}
    </div>
  );
}
