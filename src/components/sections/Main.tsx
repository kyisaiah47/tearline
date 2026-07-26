export default function Main() {
  return (
    <main className={"main"} data-name={"Main"}>
      <section
        className={"main-intro-section"}
        data-name={"intro-Section"}
        id={"intro-section"}
      >
        <div
          className={"main-image-2 hide-tablet hide-desktop"}
          data-name={"Image"}
          style={{
            opacity: "0.25",
            transform: "translateX(-50%) translateY(-160px) rotate(84deg)",
          }}
        >
          <figure className={"captured-figure"} as={"figure"}>
            <div
              style={{
                position: "absolute",
                borderRadius: "inherit",
                inset: "0px",
              }}
            >
              <img
                decoding={"auto"}
                width={"1024"}
                height={"1536"}
                sizes={"88.5px"}
                srcSet={"/images/img-4.png 682w,/images/img-3.png 1024w"}
                src={"/images/img-4.png"}
                alt={""}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center center",
                  objectFit: "contain",
                }}
              />
            </div>
          </figure>
        </div>
        <div
          className={"main-image-2 hide-phone"}
          data-name={"Image"}
          style={{
            opacity: "0.25",
            transform: "translateX(-50%) translateY(-350px) rotate(84deg)",
          }}
        >
          <figure className={"captured-figure"} as={"figure"}>
            <div
              style={{
                position: "absolute",
                borderRadius: "inherit",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
              }}
            >
              <img
                decoding={"auto"}
                loading={"lazy"}
                width={"1024"}
                height={"1536"}
                sizes={"235px"}
                srcSet={"/images/img-4.png 682w,/images/img-3.png 1024w"}
                src={"/images/img-4.png"}
                alt={""}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "inherit",
                  objectPosition: "center",
                  objectFit: "contain",
                }}
              />
            </div>
          </figure>
        </div>
        <div className={"main-mask"} data-name={"mask"} />
        <div className={"main-text-15"} data-name={"Text"}>
          <div
            className={"minimal-gear-heading"}
            data-component={"RichTextContainer"}
          >
            <h2
              className={"body-text section-heading"}
              style={{ "--rt-text-alignment": "center" }}
            >
              {"One Tag"}
              <span
                className={"body-text"}
                style={{
                  "--rt-text-color": "var(--color-black-2, rgb(27, 28, 30))",
                }}
              >
                {"."}
              </span>
              {" Any Receipt"}
              <span
                className={"body-text"}
                style={{
                  "--rt-text-color": "var(--color-red, rgb(255, 79, 94))",
                }}
              >
                {"."}
              </span>
            </h2>
          </div>
          <div className={"about-intro-copy"}>
            <p
              className={"hide-tablet hide-desktop"}
              style={{
                color: "var(--color-text, rgb(46, 47, 51))",
                userSelect: "none",
                pointerEvents: "none",
                margin: "0px",
                fontFamily:
                  '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                letterSpacing: "0em",
                lineHeight: "1.25em",
                textAlign: "center",
                maxWidth: "100%",
                width: "100%",
              }}
            >
              {
                "Built for the people who ship the thing users screenshot. Wrap any markup you already have, get paper back, and hand your users an image worth posting. No dependencies. No build step. No account."
              }
            </p>
            <p
              className={"hide-phone"}
              style={{
                color: "var(--color-text, rgb(46, 47, 51))",
                userSelect: "none",
                pointerEvents: "none",
                margin: "0",
                fontFamily:
                  '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: "500",
                letterSpacing: "0em",
                lineHeight: "1.25em",
                textAlign: "center",
                width: "100%",
              }}
            >
              {
                "Built for the people who ship the thing users screenshot. Wrap any markup you already have, get paper back, and hand your users an image worth posting. No dependencies. No build step. No account."
              }
            </p>
          </div>
          <div className={"closer-look-slot hide-tablet hide-desktop"}>
            <div
              className={"variant-frame variant-panel main-media-38-state-3"}
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group-item"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg10095908874"} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={"closer-look-slot hide-phone"}>
            <div
              className={
                "variant-frame variant-panel main-media-38-state hide-desktop hide-phone"
              }
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group-item"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg12198861445"} />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className={
                "variant-frame variant-panel main-media-38-state-2 hide-tablet"
              }
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group-item"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg8693554867"} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={"main-features-section"}
        data-name={"Features-Section"}
        id={"features-section"}
      >
        <div className={"content-container"}>
          <div className={"main-left-3"} data-name={"Left"}>
            <div className={"main-headings"} data-name={"Headings"}>
              <div
                className={"engineered-heading"}
                data-component={"RichTextContainer"}
              >
                <h2 className={"body-text section-heading"}>
                  {"Built to Drop In"}
                  <span
                    className={"body-text"}
                    style={{
                      "--rt-text-color": "var(--color-red, rgb(255, 79, 94))",
                    }}
                  >
                    {"."}
                  </span>
                </h2>
              </div>
            </div>
            <div className={"main-features-2"} data-name={"Features"}>
              <div className={"main-feature-1"} data-name={"Feature-1"}>
                <div className={"marquee-4k-capture"}>
                  <h3
                    className={"hide-tablet hide-desktop"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0px",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "28px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Wrap Any HTML"}
                  </h3>
                  <h3
                    className={"hide-phone"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "32px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Wrap Any HTML"}
                  </h3>
                </div>
                <div
                  className={"feature-copy-4k"}
                  data-component={"RichTextContainer"}
                >
                  <p className={"body-text nav-label-caps"}>
                    {
                      "A div, a table, a whole order summary — wrap it and it comes out as paper."
                    }
                  </p>
                </div>
              </div>
              <div className={"main-feature-2"} data-name={"Feature-2"}>
                <div className={"battery-feature-slot"}>
                  <h3
                    className={"hide-tablet hide-desktop"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0px",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "28px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Export to PNG"}
                  </h3>
                  <h3
                    className={"hide-phone"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "32px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Export to PNG"}
                  </h3>
                </div>
                <div
                  className={"feature-copy-battery"}
                  data-component={"RichTextContainer"}
                >
                  <p className={"body-text nav-label-caps"}>
                    {"One call turns any receipt into a "}
                    <span
                      className={"body-text"}
                      style={{
                        "--rt-text-color": "var(--color-red, rgb(255, 79, 94))",
                      }}
                    >
                      {"PNG"}
                    </span>
                    {" your users can post."}
                  </p>
                </div>
              </div>
              <div className={"main-feature-3"} data-name={"Feature-3"}>
                <div className={"marquee-live-streaming"}>
                  <h3
                    className={"hide-tablet hide-desktop"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0px",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "28px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Deterministic by Seed"}
                  </h3>
                  <h3
                    className={"hide-phone"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "32px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Deterministic by Seed"}
                  </h3>
                </div>
                <div
                  className={"feature-copy-streaming"}
                  data-component={"RichTextContainer"}
                >
                  <p className={"body-text nav-label-caps"}>
                    {
                      "The same seed always prints the same torn edge and the same barcode."
                    }
                  </p>
                </div>
              </div>
              <div className={"main-feature-4"} data-name={"Feature-4"}>
                <div className={"marquee-touchscreen"}>
                  <h3
                    className={"hide-tablet hide-desktop"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0px",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "28px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Real Text, Not Pixels"}
                  </h3>
                  <h3
                    className={"hide-phone"}
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0",
                      whiteSpace: "nowrap",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "32px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                    }}
                  >
                    {"Real Text, Not Pixels"}
                  </h3>
                </div>
                <div
                  className={"feature-copy-touchscreen"}
                  data-component={"RichTextContainer"}
                >
                  <p className={"body-text nav-label-caps"}>
                    {
                      "Selectable, searchable and screen-reader friendly — it is your markup, styled."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={"closer-look-media hide-tablet hide-desktop"}>
            <div
              className={"step-marker-badge step-marker-01 main-media-36-state"}
              style={{ width: "100%" }}
            >
              <div className={"main-image-phone"} data-name={"Image - Phone"}>
                <figure className={"gallery-figure-one"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      inset: "0px",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      sizes={"179px"}
                      srcSet={"/images/img-4.png 682w,/images/img-3.png 1024w"}
                      src={
                        "/images/asset.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
                <figure className={"closer-look-figure-02"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      inset: "0px",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      sizes={"179px"}
                      srcSet={
                        "/images/image-phone-2.png 682w,/images/image-phone.png 1024w"
                      }
                      src={
                        "/images/asset-3.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
                <figure className={"gallery-figure-03"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      inset: "0px",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      sizes={"179px"}
                      srcSet={
                        "/images/image-phone-4.png 682w,/images/image-phone-3.png 1024w"
                      }
                      src={
                        "/images/asset-4.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
              </div>
              <div className={"main-picker-phone"} data-name={"Picker - Phone"}>
                <div
                  className={"gallery-index-01"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"showcase-figure"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        inset: "0px",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/img-4.png 682w,/images/img-3.png 1024w"
                        }
                        src={
                          "/images/asset.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"slide-two-frame"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"product-figure"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        inset: "0px",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/image-phone-2.png 682w,/images/image-phone.png 1024w"
                        }
                        src={
                          "/images/asset-3.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"step-index-03"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"main-media-52"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        inset: "0px",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/image-phone-4.png 682w,/images/image-phone-3.png 1024w"
                        }
                        src={
                          "/images/asset-4.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"main-selector-2"}
                  data-border={"true"}
                  data-name={"Selector"}
                />
              </div>
            </div>
          </div>
          <div className={"closer-look-media hide-phone"}>
            <div
              className={"step-marker-badge step-marker-01 main-media-36-state"}
              style={{ height: "100%", width: "100%" }}
            >
              <div className={"main-image"} data-name={"Image"}>
                <figure className={"closer-look-figure-01"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      top: "0",
                      right: "0",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      srcSet={"/images/img-4.png 682w,/images/img-3.png 1024w"}
                      src={
                        "/images/asset.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
                <figure className={"gallery-figure-two"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      top: "0",
                      right: "0",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      srcSet={
                        "/images/image-phone-2.png 682w,/images/image-phone.png 1024w"
                      }
                      src={
                        "/images/asset-3.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
                <figure className={"closer-look-figure-03"} as={"figure"}>
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      top: "0",
                      right: "0",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    <img
                      decoding={"auto"}
                      width={"1024"}
                      height={"1536"}
                      srcSet={
                        "/images/image-phone-4.png 682w,/images/image-phone-3.png 1024w"
                      }
                      src={
                        "/images/asset-4.png?scale-down-to=512&width=1024&height=1536"
                      }
                      alt={""}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectPosition: "center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </figure>
              </div>
              <div className={"main-picker"} data-name={"Picker"}>
                <div
                  className={"figure-index-01"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"gallery-figure"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        loading={"lazy"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/img-4.png 682w,/images/img-3.png 1024w"
                        }
                        src={
                          "/images/asset.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"slide-two-panel"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"feature-figure"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        loading={"lazy"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/image-phone-2.png 682w,/images/image-phone.png 1024w"
                        }
                        src={
                          "/images/asset-3.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"gallery-index-03"}
                  data-highlight={"true"}
                  tabIndex={0}
                >
                  <figure className={"spec-figure"} as={"figure"}>
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0",
                      }}
                    >
                      <img
                        decoding={"auto"}
                        loading={"lazy"}
                        width={"1024"}
                        height={"1536"}
                        sizes={"64px"}
                        srcSet={
                          "/images/image-phone-4.png 682w,/images/image-phone-3.png 1024w"
                        }
                        src={
                          "/images/asset-4.png?scale-down-to=512&width=1024&height=1536"
                        }
                        alt={""}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "center",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </figure>
                </div>
                <div
                  className={"main-selector"}
                  data-border={"true"}
                  data-name={"Selector"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"main-cta-section"} data-name={"CTA-Section"}>
        <section className={"section-container"} id={"cta-section"}>
          <div
            className={"main-mesh-gradient-2"}
            data-name={"Mesh-gradient-2"}
            aria-hidden={"true"}
            data-component={"SVG"}
          >
            <div className={"svgContainer"}>
              <svg
                viewBox={"0 0 1000 500"}
                preserveAspectRatio={"none"}
                width={"100%"}
                height={"100%"}
                style={{ width: "100%", height: "100%" }}
              >
                <use href={"#svg989598464_659"} />
              </svg>
            </div>
          </div>
          <div className={"cta-container"}>
            <div className={"main-left-2"} data-name={"Left"}>
              <div
                className={"cta-heading"}
                data-component={"RichTextContainer"}
              >
                <h2
                  className={"body-text section-heading"}
                  style={{
                    "--rt-text-alignment": "left",
                    "--rt-text-color": "var(--color-black-2, rgb(27, 28, 30))",
                  }}
                >
                  {"Ready to Print Something"}
                  <span
                    className={"body-text"}
                    style={{
                      "--rt-text-color":
                        "var(--color-sand, rgb(211, 211, 212))",
                    }}
                  >
                    {"?"}
                  </span>
                </h2>
              </div>
              <div className={"main-cta-button"} data-name={"CTA Button"}>
                <div className={"buy-now-slot hide-tablet hide-desktop"}>
                  <a
                    className={
                      "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state-4 nav-link-item"
                    }
                    data-border={"true"}
                    data-name={"CTA - Phone"}
                    data-highlight={"true"}
                    href={"https://github.com/kyisaiah47/tearline"}
                    target={"_blank"}
                    rel={"noopener"}
                    tabIndex={0}
                    style={{ width: "100%" }}
                  >
                    <div
                      className={"main-bg"}
                      data-name={"BG"}
                      style={{
                        backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    />
                    <div
                      className={"nav-label-home"}
                      data-component={"RichTextContainer"}
                      style={{
                        "--extracted-r6o4lv":
                          "var(--color-background, rgb(244, 244, 245))",
                        "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                          "var(--color-black-2, rgb(27, 28, 30))",
                        "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                          "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    >
                      <p
                        className={"body-text brand-wordmark-text"}
                        style={{
                          "--rt-text-color":
                            "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                        }}
                      >
                        {"GET IT FREE"}
                      </p>
                    </div>
                    <div className={"gallery-scene-slot"}>
                      <div
                        className={
                          "variant-shell variant-wrap main-media-37-state"
                        }
                        data-highlight={"true"}
                        tabIndex={-1}
                      >
                        <div
                          className={"icon-group"}
                          tabIndex={-1}
                          aria-hidden={"true"}
                          data-component={"SVG"}
                        >
                          <div className={"svgContainer"}>
                            <svg style={{ width: "100%", height: "100%" }}>
                              <use href={"#svg12344161007"} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"buy-now-slot hide-desktop hide-phone"}>
                  <a
                    className={
                      "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state-3 nav-link-item"
                    }
                    data-border={"true"}
                    data-name={"CTA"}
                    data-highlight={"true"}
                    href={"https://github.com/kyisaiah47/tearline"}
                    target={"_blank"}
                    rel={"noopener"}
                    tabIndex={0}
                  >
                    <div
                      className={"main-bg"}
                      data-name={"BG"}
                      style={{
                        backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    />
                    <div
                      className={"nav-label-home"}
                      data-component={"RichTextContainer"}
                      style={{
                        "--extracted-r6o4lv":
                          "var(--color-background, rgb(244, 244, 245))",
                        "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                          "var(--color-black-2, rgb(27, 28, 30))",
                        "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                          "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    >
                      <p
                        className={"body-text brand-wordmark-text"}
                        style={{
                          "--rt-text-color":
                            "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                        }}
                      >
                        {"GET IT FREE"}
                      </p>
                    </div>
                    <div className={"gallery-scene-slot"}>
                      <div
                        className={
                          "variant-shell variant-wrap main-media-37-state"
                        }
                        data-highlight={"true"}
                        tabIndex={-1}
                      >
                        <div
                          className={"icon-group"}
                          tabIndex={-1}
                          aria-hidden={"true"}
                          data-component={"SVG"}
                        >
                          <div className={"svgContainer"}>
                            <svg style={{ width: "100%", height: "100%" }}>
                              <use href={"#svg12344161007"} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"buy-now-slot hide-tablet hide-phone"}>
                  <a
                    className={
                      "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state-3 nav-link-item"
                    }
                    data-border={"true"}
                    data-name={"CTA"}
                    data-highlight={"true"}
                    href={"https://github.com/kyisaiah47/tearline"}
                    target={"_blank"}
                    rel={"noopener"}
                    tabIndex={0}
                  >
                    <div
                      className={"main-bg"}
                      data-name={"BG"}
                      style={{
                        backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    />
                    <div
                      className={"nav-label-home"}
                      data-component={"RichTextContainer"}
                      style={{
                        "--extracted-r6o4lv":
                          "var(--color-background, rgb(244, 244, 245))",
                        "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                          "var(--color-black-2, rgb(27, 28, 30))",
                        "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                          "var(--color-blue, rgb(58, 90, 255))",
                      }}
                    >
                      <p
                        className={"body-text brand-wordmark-text"}
                        style={{
                          "--rt-text-color":
                            "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                        }}
                      >
                        {"GET IT FREE"}
                      </p>
                    </div>
                    <div className={"gallery-scene-slot"}>
                      <div
                        className={
                          "variant-shell variant-wrap main-media-37-state-2"
                        }
                        data-highlight={"true"}
                        tabIndex={-1}
                      >
                        <div
                          className={"icon-group"}
                          tabIndex={-1}
                          aria-hidden={"true"}
                          data-component={"SVG"}
                        >
                          <div className={"svgContainer"}>
                            <svg style={{ width: "100%", height: "100%" }}>
                              <use href={"#svg9856800816"} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className={"guarantee-note"}
                  data-component={"RichTextContainer"}
                >
                  <p
                    className={"body-text nav-label-caps"}
                    style={{
                      "--rt-text-alignment": "left",
                      "--rt-text-color":
                        "var(--color-black-2, rgb(27, 28, 30))",
                    }}
                  >
                    {"MIT Licensed — Free Forever"}
                  </p>
                </div>
              </div>
            </div>
            <div className={"main-right-2"} data-name={"Right"}>
              <div className={"main-price"} data-name={"Price"}>
                <div className={"price-amount"}>
                  <h2
                    style={{
                      color: "var(--color-black-2, rgb(27, 28, 30))",
                      userSelect: "none",
                      pointerEvents: "none",
                      margin: "0",
                      fontFamily:
                        '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                      fontSize: "120px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      letterSpacing: "0em",
                      lineHeight: "1.2em",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <span className={"hide-tablet"}>
                      {"FREE"}
                    </span>
                  </h2>
                </div>
                <div
                  className={"bundle-note"}
                  data-component={"RichTextContainer"}
                >
                  <p
                    className={"body-text nav-label-caps"}
                    style={{
                      "--rt-text-alignment": "left",
                      "--rt-text-color":
                        "var(--color-sand, rgb(211, 211, 212))",
                    }}
                  >
                    <strong className={"body-text"}>
                      {"npm i tearline — or one script tag"}
                    </strong>
                  </p>
                </div>
              </div>
              <div className={"main-features"} data-name={"Features"}>
                <div className={"main-row"} data-name={"Row"}>
                  <div
                    className={"gallery-plate-slot hide-tablet hide-desktop"}
                  >
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-plate-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-plate-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-video-4k"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span className={"hide-tablet"}>
                        {"Wrap any HTML in one tag"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-2"} data-name={"Row"}>
                  <div className={"gallery-cell-slot hide-tablet hide-desktop"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-cell-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-cell-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-battery"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span className={"hide-tablet"}>
                        {"PNG export built in"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-4"} data-name={"Row"}>
                  <div className={"gallery-view-slot hide-tablet hide-desktop"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-view-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-view-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-live-streaming"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span className={"hide-tablet"}>
                        {"Zero dependencies, no build step"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-5"} data-name={"Row"}>
                  <div className={"gallery-shot-slot hide-tablet hide-desktop"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-shot-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-shot-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-touchscreen"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span
                        className={"hide-tablet hide-phone"}
                      >
                        {"Seeded, deterministic output"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-7"} data-name={"Row"}>
                  <div
                    className={"gallery-shot-frame hide-tablet hide-desktop"}
                  >
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-shot-frame hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-shot-frame hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-waterproof"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span
                        className={"hide-tablet hide-phone"}
                      >
                        {"Real text, not a canvas"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-8"} data-name={"Row"}>
                  <div className={"gallery-card-slot hide-tablet hide-desktop"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-card-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-card-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-audio"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span
                        className={"hide-tablet hide-phone"}
                      >
                        {"Paper and ink are CSS variables"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-3"} data-name={"Row"}>
                  <div
                    className={"gallery-thumb-slot hide-tablet hide-desktop"}
                  >
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-thumb-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-thumb-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-connectivity"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span className={"hide-phone"}>
                        {"React, Vue, or plain HTML"}
                      </span>
                    </h2>
                  </div>
                </div>
                <div className={"main-row-6"} data-name={"Row"}>
                  <div
                    className={"gallery-frame-slot hide-tablet hide-desktop"}
                  >
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-frame-slot hide-desktop hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state-2"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg9920087728"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"gallery-frame-slot hide-tablet hide-phone"}>
                    <div
                      className={
                        "variant-layer variant-inner main-media-30-state"
                      }
                      data-highlight={"true"}
                      tabIndex={-1}
                    >
                      <div
                        className={"icon-group-wrap"}
                        tabIndex={-1}
                        aria-hidden={"true"}
                        data-component={"SVG"}
                      >
                        <div className={"svgContainer"}>
                          <svg style={{ width: "100%", height: "100%" }}>
                            <use href={"#svg12158370878"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"spec-app-updates"}>
                    <h2
                      style={{
                        color: "var(--color-background, rgb(244, 244, 245))",
                        userSelect: "none",
                        pointerEvents: "none",
                        margin: "0",
                        whiteSpace: "nowrap",
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        letterSpacing: "0em",
                        lineHeight: "1.4em",
                      }}
                    >
                      <span className={"hide-phone"}>
                        {"MIT licensed, free forever"}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"feature-image-slot"}>
            <div
              style={{
                borderRadius: "0px",
                overflow: "hidden",
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <canvas
                width={"1440"}
                height={"760"}
                data-paper-shaders={"true"}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </section>
      </section>
      <section
        className={"main-faq-section"}
        data-name={"FAQ-Section"}
        id={"faq-section"}
      >
        <div className={"main-header"} data-name={"Header"}>
          <div className={"faq-heading"} data-component={"RichTextContainer"}>
            <h2
              className={"body-text section-heading"}
              style={{
                "--rt-text-alignment": "left",
                "--rt-text-color":
                  "var(--color-background, rgb(244, 244, 245))",
              }}
            >
              {"Frequently Asked Questions"}
              <span
                className={"body-text"}
                style={{
                  "--rt-text-color": "var(--color-red, rgb(255, 79, 94))",
                }}
              >
                {"."}
              </span>
            </h2>
          </div>
          <div className={"gallery-still-slot hide-tablet hide-desktop"}>
            <div
              className={"variant-shell variant-wrap main-media-37-state"}
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg12344161007"} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={"gallery-still-slot hide-desktop hide-phone"}>
            <div
              className={"variant-shell variant-wrap main-media-37-state"}
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg12344161007"} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={"gallery-still-slot hide-tablet hide-phone"}>
            <div
              className={"variant-shell variant-wrap main-media-37-state-2"}
              data-highlight={"true"}
              tabIndex={-1}
            >
              <div
                className={"icon-group"}
                tabIndex={-1}
                aria-hidden={"true"}
                data-component={"SVG"}
              >
                <div className={"svgContainer"}>
                  <svg style={{ width: "100%", height: "100%" }}>
                    <use href={"#svg9856800816"} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"main-not-answered-2 hide-phone"}
            data-name={"Not answered"}
          >
            <div
              className={"faq-contact-prompt"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"body-text nav-label-caps"}
                style={{
                  "--rt-text-alignment": "left",
                  "--rt-text-color": "var(--color-gray, rgb(154, 154, 158))",
                }}
              >
                {"Question not answered?"}
                <br className={"body-text"} />
                {"contact us at "}
              </p>
            </div>
            <div
              className={"support-email"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"body-text nav-label-caps"}
                style={{
                  "--rt-text-alignment": "left",
                  "--rt-text-color":
                    "var(--color-background, rgb(244, 244, 245))",
                }}
              >
                <a
                  className={"body-text support-email-link"}
                  href={"mailto:hello@kynth.studio"}
                  target={"_blank"}
                  rel={"noopener"}
                >
                  {"HELLO@KYNTH.STUDIO"}
                </a>
              </p>
            </div>
            <div className={"main-buttom-2"} data-name={"Buttom"}>
              <div
                className={"or-divider"}
                data-component={"RichTextContainer"}
              >
                <p
                  className={"body-text nav-label-caps"}
                  style={{
                    "--rt-text-alignment": "left",
                    "--rt-text-color": "var(--color-gray, rgb(154, 154, 158))",
                  }}
                >
                  {"Or"}
                </p>
              </div>
              <div className={"help-center-cta hide-desktop hide-phone"}>
                <a
                  className={
                    "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state-2 nav-link-item"
                  }
                  data-border={"true"}
                  data-highlight={"true"}
                  href={"https://github.com/kyisaiah47/tearline"}
                  tabIndex={0}
                  style={{
                    "--1yk5wzj": "6px 20px 6px 20px",
                    "--border-color":
                      "var(--color-background, rgb(244, 244, 245))",
                    "--border-left-width": "1.5px",
                    "--border-right-width": "1.5px",
                    "--border-top-width": "1.5px",
                  }}
                >
                  <div
                    className={"main-bg"}
                    data-name={"BG"}
                    style={{
                      backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                    }}
                  />
                  <div
                    className={"nav-label-home"}
                    data-component={"RichTextContainer"}
                    style={{
                      "--extracted-r6o4lv":
                        "var(--variable-reference-unstr4Kxq-sTmWiG2Zm)",
                      "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                        "var(--color-background, rgb(244, 244, 245))",
                      "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                        "var(--color-background, rgb(244, 244, 245))",
                    }}
                  >
                    <p
                      className={"body-text nav-label-caps"}
                      style={{
                        "--rt-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-unstr4Kxq-sTmWiG2Zm))",
                      }}
                    >
                      {"Read the docs >"}
                    </p>
                  </div>
                </a>
              </div>
              <div className={"help-center-cta hide-tablet"}>
                <a
                  className={
                    "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state-2 nav-link-item"
                  }
                  data-border={"true"}
                  data-highlight={"true"}
                  href={"https://github.com/kyisaiah47/tearline"}
                  tabIndex={0}
                  style={{
                    "--1yk5wzj": "6px 20px 6px 20px",
                    "--border-color":
                      "var(--color-background, rgb(244, 244, 245))",
                    "--border-left-width": "1.5px",
                    "--border-right-width": "1.5px",
                    "--border-top-width": "1.5px",
                  }}
                >
                  <div
                    className={"main-bg"}
                    data-name={"BG"}
                    style={{
                      backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                    }}
                  />
                  <div
                    className={"nav-label-home"}
                    data-component={"RichTextContainer"}
                    style={{
                      "--extracted-r6o4lv":
                        "var(--variable-reference-unstr4Kxq-sTmWiG2Zm)",
                      "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                        "var(--color-background, rgb(244, 244, 245))",
                      "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                        "var(--color-background, rgb(244, 244, 245))",
                    }}
                  >
                    <p
                      className={"body-text nav-label-caps"}
                      style={{
                        "--rt-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-unstr4Kxq-sTmWiG2Zm))",
                      }}
                    >
                      {"Read the docs >"}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={"main-content"} data-name={"Content"}>
          <div
            className={"gallery-tile-slot hide-tablet hide-desktop"}
            style={{ height: "439.156px" }}
          >
            <div
              className={
                "faq-panel-phone phone-showcase-grid main-group-14-state"
              }
              style={{ width: "100%" }}
            >
              <div className={"gallery-panel-slot"}>
                <div />
              </div>
              <div
                className={"gallery-tile-frame"}
                style={{ opacity: "0.994305", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Do I need a build step or a framework?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "No. It is a custom element — one script tag and the tag works. React, Vue, Svelte and plain HTML all treat it the same."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-embed-slot"}
                style={{ opacity: "0.994344", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I change how the paper and ink look?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Yes. Paper, ink and font are CSS custom properties, and every built-in style loses to your own CSS."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-photo-slot"}
                style={{ opacity: "0.994305", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Does the exported PNG match what I see?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Exactly. The torn edge and barcode come from a seed, so a receipt renders identically every time and the export matches the screen."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-asset-slot"}
                style={{ opacity: "0.994344", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Is it really free?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "MIT licensed, free forever. No account, no paid tier, nothing to upgrade to."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-widget-slot"}
                style={{ opacity: "0.994344" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I put an image inside a receipt?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {"Yes, but it must be a data: URI to survive the PNG export — the export sandbox cannot fetch over the network."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"gallery-tile-slot hide-desktop hide-phone"}
            style={{ height: "408px" }}
          >
            <div
              className={
                "faq-panel-phone phone-showcase-grid main-group-14-state"
              }
              style={{ width: "100%" }}
            >
              <div className={"gallery-panel-slot"}>
                <div />
              </div>
              <div
                className={"gallery-tile-frame"}
                style={{ opacity: "1", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Do I need a build step or a framework?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "No. It is a custom element — one script tag and the tag works. React, Vue, Svelte and plain HTML all treat it the same."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-embed-slot"}
                style={{ opacity: "0.994023", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I change how the paper and ink look?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Yes. Paper, ink and font are CSS custom properties, and every built-in style loses to your own CSS."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-photo-slot"}
                style={{ opacity: "0.994023", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Does the exported PNG match what I see?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Exactly. The torn edge and barcode come from a seed, so a receipt renders identically every time and the export matches the screen."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-asset-slot"}
                style={{ opacity: "0.994023", transform: "none" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Is it really free?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "MIT licensed, free forever. No account, no paid tier, nothing to upgrade to."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-widget-slot"}
                style={{ opacity: "0.994023" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I put an image inside a receipt?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {"Yes, but it must be a data: URI to survive the PNG export — the export sandbox cannot fetch over the network."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"gallery-tile-slot hide-tablet hide-phone"}
            style={{ height: "420px" }}
          >
            <div
              className={
                "faq-panel-phone phone-showcase-grid main-group-14-state-2"
              }
              style={{ width: "100%" }}
            >
              <div className={"gallery-panel-slot"}>
                <div />
              </div>
              <div
                className={"gallery-tile-frame"}
                data-reveal={"19"}
                style={{
                  opacity: "0.878428",
                  transform: "translateX(36.4717px) scale(0.951371)",
                }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Do I need a build step or a framework?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "No. It is a custom element — one script tag and the tag works. React, Vue, Svelte and plain HTML all treat it the same."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-embed-slot"}
                data-reveal={"20"}
                style={{
                  opacity: "0.950418",
                  transform: "translateX(14.8745px) scale(0.980167)",
                }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I change how the paper and ink look?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Yes. Paper, ink and font are CSS custom properties, and every built-in style loses to your own CSS."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-photo-slot"}
                data-reveal={"21"}
                style={{
                  opacity: "0.982762",
                  transform: "translateX(5.17135px) scale(0.993105)",
                }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Does the exported PNG match what I see?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "Exactly. The torn edge and barcode come from a seed, so a receipt renders identically every time and the export matches the screen."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"gallery-asset-slot"}
                data-reveal={"22"}
                style={{
                  opacity: "0.996731",
                  transform: "translateX(0.980573px) scale(0.998693)",
                }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Is it really free?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {
                            "MIT licensed, free forever. No account, no paid tier, nothing to upgrade to."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"main-widget-slot"}
                data-reveal={"23"}
                style={{ opacity: "1" }}
              >
                <div
                  className={
                    "faq-list-phone main-light-8 phone-panel main-group-5-state-2"
                  }
                  data-highlight={"true"}
                  tabIndex={0}
                  style={{ width: "100%" }}
                >
                  <div className={"main-top-line"} data-name={"Top Line"} />
                  <div className={"faq-item"} data-border={"true"}>
                    <div className={"main-question"} data-name={"Question"}>
                      <div
                        className={"faq-question"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-background, rgb(244, 244, 245)))",
                          }}
                        >
                          {"Can I put an image inside a receipt?"}
                        </p>
                      </div>
                      <div className={"faq-item-slot"}>
                        <svg
                          viewBox={"0 0 256 256"}
                          focusable={"false"}
                          color={
                            "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                          }
                          style={{
                            userSelect: "none",
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            fill: "var(--color-background, rgb(244, 244, 245))",
                            color:
                              "var(--color-background, rgb(244, 244, 245))",
                            flexShrink: "0",
                          }}
                        >
                          <g
                            color={
                              "var(--token-ba5469a1-3890-44cc-aaeb-d6b7e143f20d, rgb(244, 244, 245))"
                            }
                            weight={"bold"}
                          >
                            <path
                              d={
                                "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                              }
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className={"main-answer"} data-name={"answer"}>
                      <div
                        className={"faq-answer"}
                        data-component={"RichTextContainer"}
                      >
                        <p
                          className={"body-text spec-label"}
                          style={{
                            "--rt-text-color":
                              "var(--extracted-r6o4lv, var(--color-gray, rgb(154, 154, 158)))",
                          }}
                        >
                          {"Yes, but it must be a data: URI to survive the PNG export — the export sandbox cannot fetch over the network."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={"main-faq-nav-trigger"}
          data-name={"faq-nav-trigger"}
          id={"faq-nav-trigger"}
        />
        <div
          className={"main-not-answered hide-desktop hide-tablet"}
          data-name={"Not answered"}
        >
          <div
            className={"faq-contact-note"}
            data-component={"RichTextContainer"}
          >
            <p
              className={"body-text nav-label-caps"}
              style={{
                "--rt-text-alignment": "left",
                "--rt-text-color": "var(--color-gray, rgb(154, 154, 158))",
              }}
            >
              {"Question not answered?"}
              <br className={"body-text"} />
              {"contact us at "}
            </p>
          </div>
          <div
            className={"support-email-alt"}
            data-component={"RichTextContainer"}
          >
            <p
              className={"body-text nav-label-caps"}
              style={{
                "--rt-text-alignment": "left",
                "--rt-text-color":
                  "var(--color-background, rgb(244, 244, 245))",
              }}
            >
              <a
                className={"body-text support-email-link"}
                href={"mailto:hello@kynth.studio"}
                target={"_blank"}
                rel={"noopener"}
              >
                {"HELLO@KYNTH.STUDIO"}
              </a>
            </p>
          </div>
          <div className={"main-buttom"} data-name={"Buttom"}>
            <div
              className={"or-divider-alt"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"body-text nav-label-caps"}
                style={{
                  "--rt-text-alignment": "left",
                  "--rt-text-color": "var(--color-gray, rgb(154, 154, 158))",
                }}
              >
                {"Or"}
              </p>
            </div>
            <div className={"help-center-link"}>
              <a
                className={
                  "nav-link-default main-light-5 site-nav main-light-8 nav-link main-link-3-state nav-link-item"
                }
                data-border={"true"}
                data-name={"Default - Phone"}
                data-highlight={"true"}
                href={"https://github.com/kyisaiah47/tearline"}
                tabIndex={0}
              >
                <div
                  className={"main-bg"}
                  data-name={"BG"}
                  style={{
                    backgroundColor: "var(--color-blue, rgb(58, 90, 255))",
                  }}
                />
                <div
                  className={"nav-label-home"}
                  data-component={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-unstr4Kxq-sTmWiG2Zm)",
                    "--variable-reference-Frm0CN6hZ-sTmWiG2Zm":
                      "var(--color-background, rgb(244, 244, 245))",
                    "--variable-reference-unstr4Kxq-sTmWiG2Zm":
                      "var(--color-background, rgb(244, 244, 245))",
                  }}
                >
                  <p
                    className={"body-text nav-label-caps"}
                    style={{
                      "--rt-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-unstr4Kxq-sTmWiG2Zm))",
                    }}
                  >
                    {"Read the docs >"}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
