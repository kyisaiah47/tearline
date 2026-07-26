/**
 * Site header.
 *
 * Replaces the port's `FooterColumnsSlot` (the pipeline names the header after
 * whatever slot it landed in — it is the top nav, not a footer).
 *
 * The donor shipped two mega-menu dropdowns — Platform and Resources, twelve
 * items between them, each with a title, a description and a "New" badge —
 * duplicated across three breakpoints. That is a navigation for a product with
 * twelve pages. This template is for products with one, so the dropdowns are
 * gone and the hamburger with them: every link here is an anchor on the page
 * the visitor is already on, and a menu that scrolls you 800px down the page
 * you are looking at is worse than no menu.
 *
 * Markup is lifted from the donor's desktop bar verbatim — same nav/content-2/
 * links-3/ctas-2 classes, same link chrome — so it inherits the captured
 * layout rather than approximating it. Only the link SET is ours, and it lives
 * in one array so a new product edits four lines.
 */

const LINKS: [string, string][] = [
  ["Playground", "#playground"],
  ["Install", "#install"],
  ["API", "#api"],
  ["FAQ", "#faq"],
];

const NAV_TEXT_COLOR =
  "var(--extracted-r6o4lv, var(--color-text, rgb(209, 209, 209)))";

function Brand() {
  return (
    <div className={"brand-logo-slot"}>
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
        <div className={"brand-wordmark"} data-component={"RichTextContainer"}>
          <h4
            className={"heading-4"}
            dir={"auto"}
            style={{
              "--font-selector": "R0Y7R2Vpc3QtcmVndWxhcg==",
              "--rt-font-family": '"Geist", "Geist Placeholder", sans-serif',
              "--rt-font-open-type-features":
                "'blwf' on, 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on",
              "--rt-font-size": "20px",
              "--rt-letter-spacing": "-0.01em",
              "--rt-line-height": "26px",
              "--rt-text-color":
                "var(--extracted-1eung3n, var(--color-text, rgb(209, 209, 209)))",
            }}
          >
            {"Tearline"}
          </h4>
        </div>
      </a>
    </div>
  );
}

function NavLinks() {
  return (
    <div className={"links-3"} data-name={"Links"} style={{ opacity: "1" }}>
      {LINKS.map(([label, href]) => (
        <div className={"footer-pricing-slot"} key={href}>
          <a
            className={"small-3 link-16 nav-link small-2 small-3-state-2 small"}
            data-highlight={"true"}
            href={href}
            tabIndex={0}
          >
            <div
              className={"nav-link-label"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"heading-4 nav-link-text"}
                dir={"auto"}
                style={{ "--rt-text-color": NAV_TEXT_COLOR }}
              >
                {label}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

function Ctas() {
  return (
    <div className={"ctas-2"} data-name={"CTAs"} style={{ opacity: "1" }}>
      <div className={"login-link-container"}>
        <a
          className={
            "login-link-mobile login-button login-link-tablet link-12-state-2 login-link"
          }
          data-name={"Tertiary"}
          data-highlight={"true"}
          href={"https://github.com/kyisaiah47/tearline"}
          rel={"noopener"}
          target={"_blank"}
          tabIndex={0}
        >
          <div
            className={"login-label"}
            data-component={"RichTextContainer"}
            style={{
              "--extracted-r6o4lv": "var(--color-text, rgb(209, 209, 209))",
            }}
          >
            <p
              className={"heading-4 login-link-text"}
              dir={"auto"}
              style={{ "--rt-text-color": NAV_TEXT_COLOR }}
            >
              {"GitHub"}
            </p>
          </div>
          {/* The donor's arrow glyph, kept: it reads as "leaves the page",
           * which is now literally true. */}
          <div className={"header-nav-slot"}>
            <svg
              viewBox={"0 0 256 256"}
              focusable={"false"}
              style={{
                userSelect: "none",
                width: "100%",
                height: "100%",
                display: "inline-block",
                fill: "currentcolor",
                flexShrink: "0",
                color: "var(--color-text)",
              }}
            >
              <g color={"currentColor"} weight={"regular"}>
                <path
                  d={
                    "M229.66,157.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,160H128A104.11,104.11,0,0,1,24,56a8,8,0,0,1,16,0,88.1,88.1,0,0,0,88,88h76.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,157.66Z"
                  }
                />
              </g>
            </svg>
          </div>
        </a>
      </div>
      <div className={"footer-get-started-cta"}>
        <a
          className={
            "login-link-mobile login-button login-link-tablet link-12-state-3 login-link"
          }
          data-name={"Primary"}
          data-highlight={"true"}
          href={"#install"}
          tabIndex={0}
        >
          <div
            className={"login-label"}
            data-component={"RichTextContainer"}
            style={{
              "--extracted-r6o4lv": "var(--color-black, rgb(26, 26, 26))",
            }}
          >
            <p
              className={"heading-4 login-link-text"}
              dir={"auto"}
              style={{
                "--rt-text-color":
                  "var(--extracted-r6o4lv, var(--color-black, rgb(26, 26, 26)))",
              }}
            >
              {"npm i tearline"}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  return (
    <div className={"footer-columns-slot"}>
      {/* Every variant uses `tablet-phone-closed-state` — the donor's open bar.
       * Its `-state-2` sibling is the COLLAPSED hamburger state: 74px tall with
       * the links and CTAs stacked vertically below the logo row and clipped
       * out of view, which is correct when a hamburger reveals them and simply
       * hides them when nothing does.
       *
       * Phone: brand + the one CTA. Four anchors do not fit in 390px, and the
       * footer carries the full set for anyone who wants to jump. */}
      <nav
        className={
          "tablet-phone-closed tablet-phone-closed-2 tablet-phone-closed-state hide-desktop hide-tablet"
        }
        data-border={"true"}
        style={{ width: "100%" }}
      >
        <div className={"content-2"} data-border={"true"} data-name={"Content"}>
          <div className={"logo-hamburger"} data-name={"Logo + Hamburger"}>
            <Brand />
          </div>
          <Ctas />
        </div>
      </nav>

      {/* Tablet and desktop both fit the full bar. */}
      <nav
        className={
          "tablet-phone-closed tablet-phone-closed-2 tablet-phone-closed-state hide-phone hide-desktop"
        }
        data-border={"true"}
        style={{ width: "100%" }}
      >
        <div className={"content-2"} data-border={"true"} data-name={"Content"}>
          <div className={"logo-hamburger"} data-name={"Logo + Hamburger"}>
            <Brand />
          </div>
          <NavLinks />
          <Ctas />
        </div>
      </nav>

      <nav
        className={
          "tablet-phone-closed tablet-phone-closed-2 tablet-phone-closed-state hide-phone hide-tablet"
        }
        data-border={"true"}
        style={{ width: "100%" }}
      >
        <div className={"content-2"} data-border={"true"} data-name={"Content"}>
          <div className={"logo-hamburger"} data-name={"Logo + Hamburger"}>
            <Brand />
          </div>
          <NavLinks />
          <Ctas />
        </div>
      </nav>
    </div>
  );
}
