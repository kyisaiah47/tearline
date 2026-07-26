import type { ReactNode } from "react";

/**
 * One cell of the features bento.
 *
 * The donor's grid is 3x3 and its six cells are not interchangeable — each one
 * is a named class carrying its own span, and swapping two of them silently
 * reflows the whole section. So the slot is a required prop with a fixed set of
 * values, and SLOT_ORDER below is the layout, written down.
 *
 * `feature-card-mobile` is not a breakpoint class despite the name — it is
 * where the donor put the card's `display: flex` and its column direction.
 * Drop it and the body's `flex: 1 0 0px` has no flex container to grow in, so
 * its `height: 1px` stands and every panel renders one pixel tall. The fixed
 * 747x400 that comes with it is overridden inline.
 *
 * The body sits in `agent-status-embed`, which the donor positions at
 * `inset: 48px 24px -48px` — the panel deliberately overflows the bottom of the
 * card and is clipped by it. That crop is the section's whole look: every panel
 * reads as a window onto something that continues past the frame. Do not
 * "fix" it by giving the card more height.
 */

export type Slot =
  /** 2 columns wide, 400px tall. Top-left. */
  | "feature-graphic-slot"
  /** 1x1. */
  | "feature-image-slot"
  /** 1 column, 2 rows tall. */
  | "feature-media-slot"
  /** 2 columns wide. */
  | "feature-demo-slot"
  /** 1x1. */
  | "feature-preview-slot"
  /** 1x1. */
  | "feature-visual-slot";

export default function FeatureCard({
  slot,
  id,
  title,
  description,
  children,
}: {
  slot: Slot;
  /** Anchor target, so a nav or a footer link can point at one feature. */
  id?: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className={slot} id={id}>
      <div
        className={
          "feature-card-tablet feature-card-responsive link-16 feature-card-mobile featuressection-text-6-state-6"
        }
        data-border={"true"}
        style={{ height: "100%", width: "100%" }}
      >
        <div className={"feature-card"}>
          <div className={"feature-title"} data-component={"RichTextContainer"}>
            <h3 className={"heading-4 heading-3"} dir={"auto"}>
              {title}
            </h3>
          </div>
          <div
            className={"feature-description"}
            data-component={"RichTextContainer"}
          >
            <p
              className={"heading-4 nav-link-text"}
              dir={"auto"}
              style={{
                "--rt-text-color":
                  "var(--extracted-r6o4lv, var(--value-gray-2, rgb(128, 128, 128)))",
              }}
            >
              {description}
            </p>
          </div>
        </div>
        <div className={"feature-card-body"}>
          <div className={"agent-status-embed"}>{children}</div>
        </div>
      </div>
    </div>
  );
}
