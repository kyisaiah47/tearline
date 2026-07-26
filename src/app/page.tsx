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
          {/* Supplied as an app-icon tile. Two changes: the plate reads
            * --color-background so it retints with the theme like everything
            * else (a fixed purple tile on an amber page is the one thing on the
            * site that could not follow a product), and the three inner-shadow
            * filters are dropped — they are sub-pixel at the 20px the nav
            * renders this at, and they cost a filter region per paint. The
            * gradients and the geometry are untouched. */}
          <g>
            <clipPath id={"brand-mark-clip"}>
              <rect width={"48"} height={"48"} rx={"12"} />
            </clipPath>
            <g clipPath={"url(#brand-mark-clip)"}>
              <rect
                width={"48"}
                height={"48"}
                rx={"12"}
                fill={"var(--color-background, rgb(255, 165, 82))"}
              />
              <rect
                width={"48"}
                height={"48"}
                fill={"url(#brand-mark-sheen)"}
              />
              <path
                opacity={"0.6"}
                fillRule={"evenodd"}
                clipRule={"evenodd"}
                d={
                  "M16.0833 9.75C12.5855 9.75 9.75 12.5855 9.75 16.0833V31.9167C9.75 35.4145 12.5855 38.25 16.0833 38.25H31.9167C35.4145 38.25 38.25 35.4145 38.25 31.9167V16.0833C38.25 12.5855 35.4145 9.75 31.9167 9.75H16.0833ZM16.0833 13.7083C14.7717 13.7083 13.7083 14.7717 13.7083 16.0833V31.9167C13.7083 33.2283 14.7717 34.2917 16.0833 34.2917H21.625C22.9367 34.2917 24 33.2283 24 31.9167V16.0833C24 14.7717 22.9367 13.7083 21.625 13.7083H16.0833Z"
                }
                fill={"url(#brand-mark-ink)"}
              />
            </g>
            <rect
              x={"1"}
              y={"1"}
              width={"46"}
              height={"46"}
              rx={"11"}
              stroke={"url(#brand-mark-edge)"}
              strokeWidth={"2"}
              fill={"none"}
            />
            <linearGradient
              id={"brand-mark-sheen"}
              x1={"24"}
              y1={"0"}
              x2={"26"}
              y2={"48"}
              gradientUnits={"userSpaceOnUse"}
            >
              <stop stopColor={"white"} stopOpacity={"0"} />
              <stop offset={"1"} stopColor={"white"} stopOpacity={"0.12"} />
            </linearGradient>
            <linearGradient
              id={"brand-mark-ink"}
              x1={"24"}
              y1={"9.75"}
              x2={"24"}
              y2={"38.25"}
              gradientUnits={"userSpaceOnUse"}
            >
              <stop stopColor={"white"} stopOpacity={"0.9"} />
              <stop offset={"1"} stopColor={"white"} stopOpacity={"0.6"} />
            </linearGradient>
            <linearGradient
              id={"brand-mark-edge"}
              x1={"24"}
              y1={"0"}
              x2={"24"}
              y2={"48"}
              gradientUnits={"userSpaceOnUse"}
            >
              <stop stopColor={"white"} stopOpacity={"0.2"} />
              <stop offset={"1"} stopColor={"white"} stopOpacity={"0"} />
            </linearGradient>
          </g>
        </svg>
      </div>
    </>
  );
}
