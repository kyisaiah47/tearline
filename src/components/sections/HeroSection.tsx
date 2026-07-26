"use client";

import Copyable from "@/components/Copyable";

/**
 * Hero, rebuilt from scratch.
 *
 * The template's hero was an absolute-pixel world sized around a square camera
 * render: a full-bleed fit-text wordmark with the product image pinned over its
 * centre and two copy columns anchored to the bottom corners. Nothing in it was
 * in flow, so nothing reflowed — dropping a tall receipt in put the paper
 * straight through the letterforms and the feature list on top of the "E".
 *
 * This is a normal two-column grid instead: wordmark and copy own the left, the
 * receipt owns the right, and they cannot collide at any width. What carries
 * over is the LOOK — oversized Chakra Petch, the staggered two-line wordmark,
 * mono eyebrows, the red accent.
 *
 * The receipt is the LIVE component, not a PNG of it. If the element breaks,
 * the hero visibly breaks — the correct failure mode for a page whose whole
 * claim is that the tag works.
 */
export default function HeroSection() {
  return (
    <header className={"tl-hero"} id={"hero-section"}>
      <div className={"tl-shell tl-hero-grid"}>
        <div className={"tl-hero-copy"}>
          <p className={"tl-eyebrow"}>{"MIT · zero dependencies · no build step"}</p>

          <h1 className={"tl-wordmark"} aria-label={"Tearline"}>
            <span aria-hidden={"true"} className={"tl-wordmark-a"}>
              {"TEAR"}
            </span>
            <span aria-hidden={"true"} className={"tl-wordmark-b"}>
              {"LINE"}
            </span>
          </h1>

          <p className={"tl-hero-title"}>
            {"Any HTML. "}
            <span className={"tl-accent"}>{"Printed."}</span>
          </p>

          <p className={"tl-hero-lede"}>
            {
              "One custom element that renders anything you wrap in it as a thermal receipt, then exports it as a PNG your users will actually post."
            }
          </p>

          <div className={"tl-hero-actions"}>
            <Copyable text={"npm i tearline"} />
            <a className={"tl-hero-link"} href={"#playground"}>
              {"Try it below →"}
            </a>
          </div>
        </div>

        <div className={"tl-hero-art"}>
          {/* @ts-expect-error — custom element, not in JSX.IntrinsicElements */}
          <tear-line animate="" seed={"20260726"} barcode={"047320260726"} width={"340"}>
            <h1>Tearline</h1>
            <p>
              <small>{"WRAP ANYTHING"}</small>
            </p>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Custom element</td>
                  <td align={"right"}>0.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Zero dependencies</td>
                  <td align={"right"}>0.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>No build step</td>
                  <td align={"right"}>0.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>PNG export</td>
                  <td align={"right"}>0.00</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Licence</td>
                  <td align={"right"}>MIT</td>
                </tr>
                <tr>
                  <td>
                    <strong>TOTAL</strong>
                  </td>
                  <td align={"right"}>
                    <strong>0.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
          </tear-line>
        </div>
      </div>
    </header>
  );
}
