import InstallCta from "@/components/InstallCta";
import ThemeToggle from "@/components/ThemeToggle";

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
 * gone and the hamburger with them: a menu that scrolls you 800px down the
 * page you are looking at is worse than no menu.
 *
 * Markup is lifted from the donor's desktop bar verbatim — same nav/content-2/
 * links-3/ctas-2 classes, same link chrome — so it inherits the captured
 * layout rather than approximating it. Only the link SET is ours, and it lives
 * in one array so a new product edits four lines.
 *
 * Every href is ROOT-RELATIVE, not a bare fragment. The header renders on
 * /docs too, and `#playground` there scrolls to nothing and quietly rewrites
 * the URL to /docs#playground — a bare fragment is only correct on a site with
 * exactly one page, which this stopped being.
 */

const LINKS: [string, string][] = [
  ["Playground", "/#playground"],
  ["Docs", "/docs"],
  ["API", "/docs#api"],
  ["FAQ", "/#faq"],
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
      {/* WAS a second "Try it ↪" link. The segmented CTA beside it now
        * carries that exact action, so the two sat 16px apart pointing at the
        * same anchor. The header's one tertiary slot goes to Ink / Paper. */}
      <div className={"login-link-container"}>
        <ThemeToggle />
      </div>
      <div className={"footer-get-started-cta"}>
        {/* Not `npm i tearline` — but no longer because nothing is published.
          * @kynth/tearline@0.1.0 IS on the registry (FACTS.json →
          * npm-package-published; registry.npmjs.org returned 200 on
          * 2026-08-13). The bare name stays unregisterable: npm rejects it as
          * too similar to `readline`, which is why the package is scoped.
          *
          * The script tag keeps this slot because it is the install path with
          * no step before it — no package manager, no build. The scoped npm
          * line is equally supported and is documented on /docs, under "or
          * from npm" in the install section, added 2026-08-13. */}
        <InstallCta href={"/#playground"} label={"Try it"} />
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
