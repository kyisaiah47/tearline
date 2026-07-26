import SiteHeader from "@/components/sections/SiteHeader";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import InstallSection from "@/components/sections/InstallSection";
import FAQSection from "@/components/sections/FAQSection";
import SiteFooter from "@/components/sections/SiteFooter";
import EntranceAnimations from "@/components/EntranceAnimations";
import ScrollReveals from "@/components/ScrollReveals";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <EntranceAnimations />
      <ScrollReveals />
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
            className={
              "page-body section-wrapper faqsection-closed-3 footer-inner page-wrapper"
            }
            style={{ width: "auto", display: "contents" }}
          >
            <main className={"page"} data-name={"Main"}>
              <HeroSection />
              <FeaturesSection />
              <PlaygroundSection />
              <InstallSection />
              <FAQSection />
              <div className={"cta-button-slot hide-tablet hide-desktop"}>
                <section
                  className={
                    "section-mobile footer-inner faqsection-closed-3 mobile-section section-state"
                  }
                  data-border={"true"}
                  style={{ width: "100%" }}
                >
                  <div className={"content"} data-name={"Content"}>
                    <div className={"cta-secondary-slot"}>
                      <div
                        data-component={"Shader"}
                        style={{
                          display: "block",
                          flex: "0 0 auto",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          cornerShape: "inherit",
                          overflow: "hidden",
                          transform: "none",
                        }}
                      />
                    </div>
                    <div className={"overlay"} data-name={"Overlay"} />
                    <div className={"heading-5"} data-name={"Heading"}>
                      <div
                        className={"final-cta-heading"}
                        data-component={"RichTextContainer"}
                      >
                        <h2
                          className={"heading-4 section-heading"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"Wrap something in it"}
                        </h2>
                      </div>
                      <div
                        className={"final-cta-subhead"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"heading-4 hero-subtext"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"One tag, zero dependencies, no build step. MIT — free forever."}
                        </p>
                      </div>
                    </div>
                    <div className={"ctas"} data-name={"CTAs"}>
                      <div className={"get-started-cta-container"}>
                        <a
                          className={
                            "login-link-mobile login-button login-link-tablet link-12-state-3 login-link"
                          }
                          data-name={"Primary"}
                          data-highlight={"true"}
                          href={"#install"}
                          tabIndex={0}
                          style={{ width: "100%" }}
                        >
                          <div
                            className={"login-label"}
                            data-component={"RichTextContainer"}
                            style={{
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
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
                      <div className={"see-pricing-cta"}>
                        <a
                          className={
                            "login-link-mobile login-button login-link-tablet link-12-state login-link"
                          }
                          data-name={"Secondary"}
                          data-highlight={"true"}
                          data-border={"true"}
                          href={"#install"}
                          tabIndex={0}
                          style={{ borderRadius: "8px", width: "100%" }}
                        >
                          <div
                            className={"login-label"}
                            data-component={"RichTextContainer"}
                            style={{
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
                            }}
                          >
                            <p
                              className={"heading-4 login-link-text"}
                              dir={"auto"}
                            >
                              {"Read the docs"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className={"cta-button-slot hide-phone hide-desktop"}>
                <section
                  className={
                    "section-mobile footer-inner faqsection-closed-3 mobile-section section-state-3"
                  }
                  data-border={"true"}
                  style={{ width: "100%" }}
                >
                  <div className={"content"} data-name={"Content"}>
                    <div className={"cta-secondary-slot"}>
                      <div
                        data-component={"Shader"}
                        style={{
                          display: "block",
                          flex: "0 0 auto",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          cornerShape: "inherit",
                          overflow: "hidden",
                          transform: "none",
                        }}
                      />
                    </div>
                    <div className={"overlay"} data-name={"Overlay"} />
                    <div className={"heading-5"} data-name={"Heading"}>
                      <div
                        className={"final-cta-heading"}
                        data-component={"RichTextContainer"}
                      >
                        <h2
                          className={"heading-4 section-heading"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"Wrap something in it"}
                        </h2>
                      </div>
                      <div
                        className={"final-cta-subhead"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"heading-4 hero-subtext"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"One tag, zero dependencies, no build step. MIT — free forever."}
                        </p>
                      </div>
                    </div>
                    <div className={"ctas"} data-name={"CTAs"}>
                      <div className={"get-started-cta-container"}>
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
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
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
                      <div className={"see-pricing-cta"}>
                        <a
                          className={
                            "login-link-mobile login-button login-link-tablet link-12-state login-link"
                          }
                          data-name={"Secondary"}
                          data-highlight={"true"}
                          data-border={"true"}
                          href={"#install"}
                          tabIndex={0}
                          style={{ borderRadius: "8px" }}
                        >
                          <div
                            className={"login-label"}
                            data-component={"RichTextContainer"}
                            style={{
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
                            }}
                          >
                            <p
                              className={"heading-4 login-link-text"}
                              dir={"auto"}
                            >
                              {"Read the docs"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className={"cta-button-slot hide-phone hide-tablet"}>
                <section
                  className={
                    "section-mobile footer-inner faqsection-closed-3 mobile-section section-state-2"
                  }
                  data-border={"true"}
                  style={{ width: "100%" }}
                >
                  <div className={"content"} data-name={"Content"}>
                    <div className={"cta-secondary-slot"}>
                      <div
                        data-component={"Shader"}
                        style={{
                          display: "block",
                          flex: "0 0 auto",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          cornerShape: "inherit",
                          overflowX: "hidden",
                          overflowY: "hidden",
                          transform: "none",
                        }}
                      />
                    </div>
                    <div className={"overlay"} data-name={"Overlay"} />
                    <div className={"heading-5"} data-name={"Heading"}>
                      <div
                        className={"final-cta-heading"}
                        data-component={"RichTextContainer"}
                      >
                        <h2
                          className={"heading-4 section-heading"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"Wrap something in it"}
                        </h2>
                      </div>
                      <div
                        className={"final-cta-subhead"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"heading-4 hero-subtext"}
                          dir={"auto"}
                          style={{ "--rt-text-alignment": "center" }}
                        >
                          {"One tag, zero dependencies, no build step. MIT — free forever."}
                        </p>
                      </div>
                    </div>
                    <div className={"ctas"} data-name={"CTAs"}>
                      <div className={"get-started-cta-container"}>
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
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
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
                      <div className={"see-pricing-cta"}>
                        <a
                          className={
                            "login-link-mobile login-button login-link-tablet link-12-state login-link"
                          }
                          data-name={"Secondary"}
                          data-highlight={"true"}
                          data-border={"true"}
                          href={"#install"}
                          tabIndex={0}
                          style={{ borderRadius: "8px" }}
                        >
                          <div
                            className={"login-label"}
                            data-component={"RichTextContainer"}
                            style={{
                              "--extracted-r6o4lv":
                                "var(--color-black, rgb(26, 26, 26))",
                            }}
                          >
                            <p
                              className={"heading-4 login-link-text"}
                              dir={"auto"}
                            >
                              {"Read the docs"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
          <div id={"overlay"} />
          <div className={"spacer-block"} />
          <div className={"border"} data-border={"true"} data-name={"Border"} />
          <SiteFooter />
        </div>
        <div id={"template-overlay"} />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox={"0 0 48 48"}
          overflow={"visible"}
          id={"brand-mark"}
        >
          {/* Supplied at 36x48. The donor's logo slot is square and carries
            * preserveAspectRatio="none", so a 3:4 mark dropped straight in gets
            * stretched a third wider. Padded to 48x48 and centred instead —
            * that leaves the slot's own markup alone, which is the whole point
            * of it being a template.
            *
            * Fill reads --color-background so the mark retints with the theme
            * like everything else; the supplied red is one product's value, not
            * the template's. */}
          <g transform={"translate(6 0)"}>
              <path
                d={
                  "M0 7.5H28.8C31.3202 7.5 32.5804 7.5 33.543 7.99047C34.3897 8.4219 35.0781 9.11031 35.5095 9.95704C36 10.9196 36 12.1798 36 14.7V16.5H7.2C4.67976 16.5 3.41965 16.5 2.45704 16.0095C1.61031 15.5781 0.921901 14.8897 0.490471 14.043C0 13.0804 0 11.8202 0 9.3V7.5Z"
                }
                fill={"var(--color-background, rgb(255, 165, 82))"}
              />
              <path
                d={
                  "M0 28.5H28.8C31.3202 28.5 32.5804 28.5 33.543 28.0095C34.3897 27.5781 35.0781 26.8897 35.5095 26.043C36 25.0804 36 23.8202 36 21.3V19.5H7.2C4.67976 19.5 3.41965 19.5 2.45704 19.9905C1.61031 20.4219 0.921901 21.1103 0.490471 21.957C0 22.9196 0 24.1798 0 26.7V28.5Z"
                }
                fill={"var(--color-background, rgb(255, 165, 82))"}
              />
              <path
                d={
                  "M14 31.5H28.8C31.3202 31.5 32.5804 31.5 33.543 31.9905C34.3897 32.4219 35.0781 33.1103 35.5095 33.957C36 34.9196 36 36.1798 36 38.7V40.5H21.2C18.6798 40.5 17.4196 40.5 16.457 40.0095C15.6103 39.5781 14.9219 38.8897 14.4905 38.043C14 37.0804 14 35.8202 14 33.3V31.5Z"
                }
                fill={"var(--color-background, rgb(255, 165, 82))"}
              />
          </g>
        </svg>
      </div>
    </>
  );
}
