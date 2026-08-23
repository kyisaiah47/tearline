import CodePanel from "@/components/CodePanel";
import InstallCta from "@/components/InstallCta";
import type { Line } from "@/components/CodePanel";

/**
 * Hero.
 *
 * Structure is the donor's, unchanged: herosection-left carries the badge,
 * the two-line serif headline, the lede and the CTA pair; herosection-right
 * carries a full-bleed backdrop with a window floating over it. Those class
 * names hold the captured layout at all three breakpoints, so they stay.
 *
 * Two things are ours.
 *
 * The backdrop was a Framer Shader — a live WebGL canvas the port could not
 * carry across, which is why the right half arrived empty. It is now a plain
 * image read from --brand-backdrop, so each product drops in its own generated
 * art and nothing else moves.
 *
 * The window shows the markup on the left and, beside it, the actual receipt
 * that markup produces — rendered by the real custom element, not a picture of
 * one. The two halves are the same source. If the element regresses, the hero
 * is visibly wrong on the first paint of the first page, which is the only
 * kind of test that never rots.
 */

const MARKUP: Line[] = [
  [
    ["<", "text"],
    ["tear-line", "tag"],
    [" ", "text"],
    ["barcode", "attr"],
    ["=", "text"],
    ['"04732026"', "str"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["h2", "tag"],
    [" ", "text"],
    ["data-title", "attr"],
    [">", "text"],
    ["Meridian", "text"],
    ["</", "text"],
    ["h2", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["hr", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["p", "tag"],
    [">", "text"],
    ["Cortado · 4.25", "text"],
    ["</", "text"],
    ["p", "tag"],
    [">", "text"],
  ],
  [
    ["  <", "text"],
    ["p", "tag"],
    [">", "text"],
    ["Total · 4.25", "text"],
    ["</", "text"],
    ["p", "tag"],
    [">", "text"],
  ],
  [
    ["</", "text"],
    ["tear-line", "tag"],
    [">", "text"],
  ],
];

export default function HeroSection() {
  return (
    <section
      className={"herosection-hero-section"}
      data-name={"Hero Section"}
      id={"hero-section"}
    >
      <div className={"herosection-content"} data-name={"Content"}>
        <div className={"herosection-left"} data-name={"Left"}>
          <div
            className={"herosection-heading-wrapper"}
            data-name={"Heading wrapper"}
          >
            <div className={"herosection-heading"} data-name={"Heading"}>
              <div className={"hiring-badge-container"} data-reveal={"0"}>
                <a
                  className={
                    "herosection-dot-4 nav-dropdown-trigger herosection-dot herosection-dot-4-state herosection-dot-2"
                  }
                  data-name={"Dot"}
                  /* Back to the repository. It was repointed at opensource.org on
                   * 2026-07-29 because the repo was private and a licence claim whose only
                   * evidence link 404s is a claim the buyer cannot check — correct then,
                   * stale now: the repo has been public and anonymously readable since at
                   * least 2026-08-13 (api.github.com, `"private": false`). The badge says
                   * MIT AND zero-dependencies, and the repo is where a reader can verify
                   * both at once. */
                  href={"https://github.com/kyisaiah47/tearline"}
                  rel={"noopener"}
                  target={"_blank"}
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
                          "var(--extracted-r6o4lv, var(--color-background, #f2ece1))",
                      }}
                    >
                      {"MIT · zero dependencies"}
                    </p>
                  </div>
                </a>
              </div>

              <div
                className={"hero-headline"} data-reveal={"1"}
                data-component={"RichTextContainer"}
              >
                <h1 className={"heading-4 hero-heading"} dir={"auto"}>
                  <span style={{ display: "inline-block" }}>{"Any"}</span>{" "}
                  <span style={{ display: "inline-block" }}>{"HTML."}</span>
                  <br className={"heading-4"} />
                  <span
                    className={"heading-4"}
                    style={{
                      "--rt-text-color":
                        "var(--value-gray-2, rgb(128, 128, 128))",
                    }}
                  >
                    <span style={{ display: "inline-block" }}>
                      {"Printed."}
                    </span>
                  </span>
                </h1>
              </div>

              <div
                className={"hero-subhead"} data-reveal={"2"}
                data-component={"RichTextContainer"}
              >
                <p
                  className={"heading-4 hero-subtext"}
                  dir={"auto"}
                  style={{
                    "--rt-text-color":
                      "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {
                    "One custom element renders whatever you wrap in it as a thermal receipt — then hands your users a PNG of it."
                  }
                </p>
              </div>
            </div>

            <div className={"hero-content"} data-reveal={"32"}>
              <div className={"hero-primary-cta"}>
                {/* Was a filled "Try it" pill beside a second, outlined pill
                  * whose label was the literal install URL — 31 characters of
                  * mono, which is what made the row run half the column. One
                  * segmented control now carries both actions; the URL is on
                  * the clipboard rather than on the screen. See InstallCta. */}
                <InstallCta href={"#playground"} label={"Try it"} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={"herosection-right"}
          data-border={"true"}
          data-name={"Right"}
        >
          <div className={"hero-visual-container tl-backdrop"} />
          <div className={"hero-code-preview"} data-reveal={"33"}>
            <CodePanel
              title={"menu.html"}
              meta={<span>{"renders to ↓"}</span>}
              lines={MARKUP}
              footer={
                <div className={"panel-result"}>
                  <tear-line
                    seed={"20260726"}
                    barcode={"04732026"}
                    width={"236"}
                  >
                    <h2 data-title>{"Meridian"}</h2>
                    <hr />
                    <p>{"Cortado · 4.25"}</p>
                    <p>{"Total · 4.25"}</p>
                  </tear-line>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
