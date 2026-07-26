"use client";

import ScrambleText from "../runtime/ScrambleText";

export default function HeroSection() {
  return (
    <header
      className={"herosection-hero-section"}
      data-name={"Hero-Section"}
      id={"hero-section"}
    >
      <div className={"herosection-fit-text"} data-name={"Fit-text"}>
        <svg
          className={"hero-wordmark-lx41"}
          viewBox={"0 0 110 64"}
          data-component={"RichTextContainer"}
        >
          <foreignObject
            className={"hero-fit-text"}
            width={"100%"}
            height={"100%"}
            transform={"scale(1)"}
          >
            <p
              className={"body-text"}
              style={{
                "--font-selector": "R0Y7Q2hha3JhIFBldGNoLTUwMA==",
                "--rt-font-family":
                  '"Chakra Petch", "Chakra Petch Placeholder", sans-serif',
                "--rt-font-size": "32px",
                "--rt-font-weight": "500",
                "--rt-line-height": "1em",
                "--rt-text-color": "var(--color-black-2, rgb(27, 28, 30))",
              }}
            >
              {/* Staggered: line 1 hard left, line 2 hard right. The viewBox is
                  wider than either word so there is room to offset them — at a
                  word-width viewBox both lines would pin to the same edge. */}
              <span style={{ display: "block", textAlign: "left" }}>
                {"TEAR"}
              </span>
              <span style={{ display: "block", textAlign: "right" }}>
                {"LINE"}
              </span>
            </p>
          </foreignObject>
        </svg>
      </div>
      <div className={"hero-container"}>
        <div className={"herosection-left-text"} data-name={"Left-Text"}>
          <div
            className={"hero-title-wrap"}
            data-component={"RichTextContainer"}
          >
            <h1
              className={"body-text hero-title"}
              style={{ "--rt-text-alignment": "left" }}
            >
              {"Any HTML. "}
              <span
                className={"body-text"}
                style={{
                  "--rt-text-color": "var(--color-red, rgb(255, 79, 94))",
                }}
              >
                {"Printed"}
              </span>
              {"."}
            </h1>
          </div>
          <div className={"herosection-highlights"} data-name={"Highlights"}>
            <div
              className={"hero-counter-01"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"body-text nav-label-caps"}
                style={{ "--rt-text-alignment": "left" }}
              >
                {"01/"}
              </p>
            </div>
            <div className={"hero-subcopy"}>
              <ScrambleText
                as={"h2"}
                text={
                  "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG your users will actually post. Zero dependencies, no build step, works from a script tag."
                }
                style={{
                  color: "var(--color-text, rgb(46, 47, 51))",
                  userSelect: "none",
                  pointerEvents: "none",
                  margin: "0",
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  letterSpacing: "0em",
                  lineHeight: "1.4em",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={"herosection-right-text"}
          data-animate={"g3emyj"}
          data-name={"Right-Text"}
          style={{ willChange: "transform" }}
        >
          <div
            className={"hero-counter-02"}
            data-component={"RichTextContainer"}
          >
            <p
              className={"body-text nav-label-caps"}
              style={{ "--rt-text-alignment": "left" }}
            >
              {"02/"}
            </p>
          </div>
          <div
            className={"hero-feature-list"}
            data-component={"RichTextContainer"}
          >
            <ul className={"body-text nav-label-caps"}>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"Wrap any HTML in one tag"}
                </p>
              </li>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"Export any receipt as a PNG"}
                </p>
              </li>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"Zero dependencies, no build step"}
                </p>
              </li>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"Seeded — the same receipt every render"}
                </p>
              </li>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"Real text, not a canvas or an image"}
                </p>
              </li>
              <li className={"body-text"}>
                <p className={"body-text"}>
                  {"MIT licensed and free forever"}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={"herosection-image-phone hide-desktop hide-tablet"}
          data-name={"Image-Phone"}
        >
          <figure className={"herosection-img"} as={"figure"} data-name={"img"}>
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
                sizes={"152px"}
                srcSet={"/images/product-shot.png 1000w"}
                src={"/images/product-shot.png"}
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
      </div>
      <div
        className={"herosection-image hide-phone hide-desktop"}
        data-animate={"1frr7pm"}
        data-name={"Image"}
        style={{ transform: "none", willChange: "transform" }}
      >
        <figure className={"herosection-img-2"} as={"figure"} data-name={"img"}>
          <div
            style={{
              position: "absolute",
              borderRadius: "inherit",
              inset: "0px",
            }}
          >
            <img
              decoding={"auto"}
              width={"1000"}
              height={"1000"}
              sizes={"max(min(100vw, 2056px) * 0.6, 1px)"}
              srcSet={"/images/product-shot.png 1000w"}
              src={"/images/product-shot.png"}
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
        <div className={"herosection-mask"} data-name={"mask"} />
      </div>
      <div
        className={"herosection-image hide-phone hide-tablet"}
        data-animate={"1frr7pm"}
        data-name={"Image"}
        style={{ transform: "translateX(-50%)", willChange: "transform" }}
      >
        <figure className={"herosection-img-2"} as={"figure"} data-name={"img"}>
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
              width={"1000"}
              height={"1000"}
              sizes={"max(min(100vw, 2056px) * 0.43, 1px)"}
              srcSet={"/images/product-shot.png 1000w"}
              src={"/images/product-shot.png"}
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
        <div className={"herosection-mask"} data-name={"mask"} />
      </div>
    </header>
  );
}
