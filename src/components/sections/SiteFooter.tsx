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
 * The shell keeps all three of the donor's breakpoint variants, and it has to.
 * `site-footer-row` is not a phone class despite the name — it is where the
 * footer's `display: flex` and column direction live, exactly like
 * `feature-card-row` on the bento. Drop it and the footer has no layout at
 * all: the brand block floats off to the left of the section rules and the link
 * columns start halfway down the page. The content is still written once.
 */

type Group = { label: string; links: [string, string, boolean?][] };

/* Root-relative, not bare fragments: the footer renders on /docs as well, where
 * `#features` scrolls to nothing. */
const GROUPS: Group[] = [
  {
    label: "Product",
    links: [
      ["Overview", "/#hero-section"],
      ["Features", "/#features"],
      ["Playground", "/#playground"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    label: "Docs",
    links: [
      ["Install", "/docs#install"],
      ["API reference", "/docs#api"],
      ["Exporting a PNG", "/docs#export"],
      ["Accessibility", "/docs#accessibility"],
      /* Added 2026-07-31 and 2026-08-01. Neither is a Tearline reference page —
       * one explains the browser-side DOM-to-PNG technique generally, the other
       * the receipt look and why it is packaged as a custom element. Both sit
       * last in the group rather than among the API rows. */
      ["DOM to PNG, explained", "/dom-to-png"],
      ["Receipt-style UI", "/receipt-ui"],
    ],
  },
  {
    label: "Code",
    links: [
      /* The GitHub and npm rows are gone. Both 404 for an anonymous visitor:
       * the repository is PRIVATE and the package is unpublished (FACTS.json →
       * github-repo-public, npm-package-published; both re-checked 2026-07-29).
       * A footer column headed "Code" whose every link dead-ends is worse than
       * a shorter column. They come back when the repo goes public and the
       * package ships — the entries are still tracked in FACTS.json so the
       * check runs daily. */
      ["Read the source", "/tearline.js", true],
      ["llms.txt", "/llms.txt", true],
      /* Pointed at the licence text itself rather than at blob/main/LICENSE in
       * the repo, which is unreachable while the repo is private — and "MIT" is
       * the one claim on this page a reader should always be able to check. */
      ["MIT licence", "https://opensource.org/license/mit", true],
    ],
  },
  {
    label: "Studio",
    links: [["Kynth Studios", "https://kynth.studio", true]],
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
                    {group.links.map(([label, href, external]) => (
                      <div className={"menu-overview-link"} key={label + href}>
                        <a
                          className={
                            "small-3 link-16 nav-link small-2 small-3-state small"
                          }
                          data-name={"Small"}
                          data-highlight={"true"}
                          href={href}
                          tabIndex={0}
                          {...(external
                            ? { target: "_blank", rel: "noopener" }
                            : {})}
                        >
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
                  {"© 2026 Tearline. MIT licensed — free forever."}
                </p>
              </div>
              <div className={"status-badge-container"}>
                <a
                  className={
                    "herosection-dot-4 nav-dropdown-trigger herosection-dot herosection-dot-4-state herosection-dot-2"
                  }
                  data-name={"Dot"}
                  href={"https://kynth.studio"}
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
