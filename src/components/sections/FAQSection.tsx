"use client";

import { useState } from "react";
import JsonLd, { APP_ID, SITE_ID } from "@/components/JsonLd";

/**
 * FAQ.
 *
 * The port shipped this as a markup-swapping accordion: closed and open rows
 * were captured as separate DOM, stored in faq-data.json, and keyed BY QUESTION
 * TEXT. Editing a question — the first thing anyone does to an FAQ — silently
 * unkeys its row and the answer stops opening. That is a trap to hand the next
 * product, so the runtime and its data file are gone.
 *
 * This is the same markup with a boolean. The row classes, the plus glyph and
 * the `state-2` open class are all the donor's, so it looks and animates
 * identically; the difference is that the copy is copy.
 */

const FAQS: [string, string][] = [
  [
    "What is Tearline?",
    "One custom element. Wrap any HTML in <tear-line> and it renders as a thermal receipt — torn edge, barcode, receipt type — and exports itself as a PNG. It is not a template language and not an image service; it is styling wrapped around your own markup.",
  ],
  [
    "What is it actually for?",
    "Anything a user might want to keep or post: an order summary, a workout, a year in review, a booking, a set list, a diff. Receipts are shareable in a way that a screenshot of a table is not, which is the whole reason this exists.",
  ],
  [
    "Does the barcode scan?",
    "No, and it does not pretend to. The bars are generated from the seed for looks. If you need a scannable code, render a real one and put it inside the receipt as a data: URI image.",
  ],
  [
    "Will the image match what my user saw?",
    "Yes, as long as you set a seed. The torn edge and the barcode come from it, so the same seed always produces the same paper. Without one you get a new tear on every render — fine for a playground, wrong for an order confirmation.",
  ],
  [
    "Is the receipt accessible?",
    "It is real text in the light DOM, not a canvas and not an image, so it is selectable, searchable, translatable, and read by screen readers in document order. Your headings stay headings and your tables stay tables. The print-out animation is skipped entirely under prefers-reduced-motion.",
  ],
  [
    "Does it work with React, Vue, Svelte?",
    "It is a custom element, so it works anywhere HTML does — including a plain script tag in a static file. React 19 passes unknown attributes through, so the tag needs no wrapper.",
  ],
  [
    "What does it cost?",
    "Nothing, and there is nothing to check out. MIT, zero dependencies, one file, no account and no key. There is no paid tier and no service behind it — it runs on your page, so there is nothing for us to bill.",
  ],
  /* The PDF's blocker for this product is \u201cstate browser/server support precisely\u201d. Precisely
   * means naming the platform features it needs, not reciting version numbers nobody re-checked:
   * a version table goes stale silently and this one would have nothing behind it. */
  [
    "Which browsers does it work in, and does it need a server?",
    "To render it needs custom elements and shadow DOM. To export it additionally needs canvas toBlob and the ability to rasterise an SVG inside an <img>. Every current version of Chrome, Edge, Firefox and Safari has all four. There is no polyfill and no silent fallback: without them the tag stays an inert unknown element and the export rejects rather than producing a wrong image. It needs no server at all — if your page is server-rendered the markup ships in the HTML and the paper paints on hydration, because it is real elements rather than a picture of them.",
  ],
  [
    "Does anything I render leave my page?",
    "No. The receipt is drawn in the browser and the PNG is made in the browser — flatten, serialise, rasterise, encode, all in the tab. Nothing is uploaded, there is no render endpoint and no API key, so there is no retention policy to read and nothing of yours for us to delete.",
  ],
  [
    "Are there rate limits, and is there an SLA?",
    "Neither, because there is no service to limit or to guarantee. The only ceilings are the browser\u2019s own: the canvas has a maximum size, so a very long receipt at scale 2 can exceed it \u2014 the export then stops at the encode step and says so, and a narrower width or scale 1 clears it. The hosted script tag is a static file on this origin; if you want it to be impossible for us to affect, install from npm and serve it yourself.",
  ],
  [
    "What happens when an export fails?",
    "It names the step it stopped at rather than saying an error occurred. serialise stops on markup that is not valid XML, usually an unclosed tag. rasterise stops on an <img> pointing at a URL instead of a data: URI, because the SVG sandbox cannot reach the network \u2014 that one is the tainted-canvas rule and it is what makes most browser exports come out blank. encode stops when the canvas is larger than the browser allows. All four steps are documented, and the playground reports them.",
  ],
  [
    "Can I use it commercially, and does it drive a printer?",
    "Yes to the first: MIT, and the source is public. No to the second: it renders the look of a till receipt in the DOM and hands you a PNG. It is not an ESC/POS driver and does not talk to physical hardware \u2014 getting the image to a printer is your side of the line.",
  ],
];

// The fallback is not optional: nothing defines this token, and an undefined
// custom property is invalid at computed-value time — so `stroke` was being
// thrown away entirely and the icon never painted.
const ICON_STROKE =
  "var(--token-06c91b52-e1ea-4d2b-8cca-eda2631e998e, rgb(209, 209, 209))";

/* Built from the same FAQS array the accordion renders, so the schema cannot
 * describe an answer the page does not show — which is the one thing a
 * structured-data penalty is actually for. */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://tearline.kynth.studio/#faq",
  isPartOf: { "@id": SITE_ID },
  about: { "@id": APP_ID },
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={"faqsection-faq-section"}
      data-border={"true"}
      data-name={"FAQ Section"}
      id={"faq"}
    >
      <JsonLd data={FAQ_SCHEMA} />
      <div className={"faqsection-content"}>
        <div
          className={"faqsection-heading-wrapper"}
          data-name={"Heading wrapper"}
        >
          <div className={"faqsection-heading"}>
            <div className={"faq-eyebrow-container"} data-reveal={"0"}>
              <div className={"dot"} data-border={"true"} data-name={"Dot"} />
              <div
                className={"features-eyebrow-text"}
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
                  {"FAQ"}
                </p>
              </div>
            </div>
            <div
              className={"faq-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"Got questions?"}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"We've got answers"}
                </span>
              </h2>
            </div>
            <div className={"faq-subhead"} data-reveal={"2"} data-component={"RichTextContainer"}>
              <p
                className={"heading-4 hero-subtext"}
                dir={"auto"}
                style={{
                  "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                }}
              >
                {"Everything you need to know before you install it."}
              </p>
            </div>
          </div>
        </div>

        <div className={"faqsection-faq-wrapper"} data-name={"FAQ wrapper"}>
          <div className={"faq-content-wrap"}>
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div className={"faq-item"} key={q}>
                  <div className={"faq-accordion-slot"}>
                    <div
                      className={
                        isOpen
                          ? "faqsection-closed-2 faqsection-closed-3 link-16 faqsection-closed faqsection-closed-2-state state-2"
                          : "faqsection-closed-2 faqsection-closed-3 link-16 faqsection-closed faqsection-closed-2-state"
                      }
                      data-border={"true"}
                      style={{ width: "100%" }}
                    >
                      <div
                        className={"faqsection-top"}
                        data-name={"Top"}
                        role={"button"}
                        tabIndex={0}
                        aria-expanded={isOpen}
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpen(isOpen ? null : i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setOpen(isOpen ? null : i);
                          }
                        }}
                      >
                        <div
                          className={"faq-question-text"}
                          data-component={"RichTextContainer"}
                        >
                          <h3
                            className={"heading-4 hero-subtext"}
                            dir={"auto"}
                            style={{
                              "--rt-text-alignment": "start",
                              "--rt-text-color":
                                "var(--extracted-a0htzi, var(--color-text))",
                            }}
                          >
                            {q}
                          </h3>
                        </div>
                        <div className={"faq-item-container"}>
                          <svg
                            viewBox={"0 0 24 24"}
                            fill={"none"}
                            stroke={ICON_STROKE}
                            strokeWidth={"2"}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                            style={{
                              height: "100%",
                              width: "100%",
                              overflow: "visible",
                              transform: isOpen ? "rotate(45deg)" : "none",
                              transition: "transform 0.28s ease",
                            }}
                          >
                            <line x1={"3.75"} y1={"12"} x2={"20.25"} y2={"12"} />
                            <line x1={"12"} y1={"3.75"} x2={"12"} y2={"20.25"} />
                          </svg>
                        </div>
                      </div>
                      <div
                        className={"faqsection-bottom"}
                        data-name={"Bottom"}
                        style={{ opacity: isOpen ? 1 : 0 }}
                      >
                        <div
                          className={"faq-answer-text"}
                          data-component={"RichTextContainer"}
                        >
                          <p
                            className={"heading-4 nav-link-text"}
                            dir={"auto"}
                            style={{
                              "--rt-text-alignment": "start",
                              "--rt-text-color":
                                "var(--extracted-r6o4lv, var(--color-text))",
                            }}
                          >
                            {a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
