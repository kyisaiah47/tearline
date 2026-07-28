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
                          href={"/docs"}
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
                          href={"/docs"}
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
                          href={"/docs"}
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
    </>
  );
}
