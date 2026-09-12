import type { CSSProperties, ReactNode } from "react";

/**
 * CodePanel — the template's window chrome, extracted.
 *
 * The donor drew this by hand, inline, once per instance: a 16px-radius frame,
 * a 40px title bar with three traffic lights, a 40px gutter of line numbers and
 * a body of pre-formatted spans, every value repeated at every call site. There
 * are nine of them across the page and no two agree on their padding.
 *
 * It is also the single most reusable thing in the template — every product
 * built on this donor is a developer tool, and a developer tool's hero is a
 * window with code in it. So it lives here, once, with the donor's exact
 * measurements, and sections pass content instead of chrome.
 *
 * Syntax colours come from the donor's own palette, with one change: its
 * string/accent green was the hard-coded lime. Here it reads --color-background,
 * so a product that retints the theme retints its code samples with it.
 */

export type Tok = "tag" | "attr" | "str" | "text" | "kw" | "fn" | "muted" | "ok";

/* ⛔ NO HUE. The blue and lilac here were the donor editor's theme, and they
 * were the last two foreign colours on a page that is now two values — on the
 * light theme they came out as pale sky and lavender on cream, which is the
 * exact "third palette" the backdrop was removed for.
 *
 * Syntax now separates by VALUE and by weight, not by hue: the element's own
 * tag is the accent at full strength, attributes step down one tier, strings
 * sit on the quiet tier, and the gutter is quieter still. That survives the
 * theme flip with no second map, because every entry reads a token that
 * already inverts.
 *
 * `ok` was a green. Nothing else on this page is green and success is not a
 * brand event here, so it takes the accent. `--color-red` is untouched: an
 * error is a semantic, not an accent, and the template already spends red on
 * it. */
const COLOR: Record<Tok, string> = {
  tag: "var(--color-background, #f2ece1)",
  attr: "var(--color-gray, #b3ada3)",
  str: "var(--value-gray-2, #8f8b84)",
  text: "var(--color-text, #e8e2d8)",
  kw: "var(--color-background, #f2ece1)",
  fn: "var(--color-background, #f2ece1)",
  muted: "var(--color-gray-dark-2, #9a958c)",
  ok: "var(--color-background, #f2ece1)",
};

/** One rendered line: a list of [text, token] pairs. */
export type Line = [string, Tok][];

const MONO = "'Geist Mono', 'Fira Code', monospace";

const dot = (background: string): CSSProperties => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background,
  flexShrink: 0,
});

export default function CodePanel({
  title,
  meta,
  lines,
  gutter = true,
  aside,
  footer,
  style,
}: {
  /** Filename in the title bar. */
  title: string;
  /** Right-hand status in the title bar — a build state, a byte count. */
  meta?: ReactNode;
  lines: Line[];
  /** Line numbers. Off for terminal-style panels. */
  gutter?: boolean;
  /** Rendered beside the code, inside the frame — where the receipt goes. */
  aside?: ReactNode;
  /** Rendered under the code, inside the frame, above a hairline. */
  footer?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        /* Auto, not 100%: a panel that renders a result is as tall as the
         * result. Callers that need it to fill a fixed box pass a height. */
        height: "auto",
        fontFamily: MONO,
        fontSize: "13px",
        lineHeight: "22px",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
        background: "var(--color-black-12, rgb(31, 31, 31))",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "40px",
          padding: "0 16px",
          borderBottom: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
          background: "var(--color-black, rgb(26, 26, 26))",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Not the macOS red/amber/green. Those are three more foreign
            * brand colours, and on a two-value page they are the loudest thing
            * in the hero after the receipt itself. Same neutral, three times:
            * the shape is what says "window", not the colour. */}
          <div style={dot("var(--color-brown-2, #4a463f)")} />
          <div style={dot("var(--color-brown-2, #4a463f)")} />
          <div style={dot("var(--color-brown-2, #4a463f)")} />
        </div>
        <span
          style={{
            color: "var(--color-gray-dark-2, rgb(64, 64, 64))",
            fontSize: "12px",
            marginLeft: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
            flex: 1,
          }}
        >
          {title}
        </span>
        {meta ? (
          <div
            className={"hide-phone"}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "var(--color-gray-dark-2, rgb(64, 64, 64))",
            }}
          >
            {meta}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minWidth: 0 }}>
        {gutter ? (
          <div
            style={{
              width: "40px",
              background: "var(--color-black, rgb(26, 26, 26))",
              borderRight: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
              padding: "16px 0",
              flexShrink: 0,
            }}
            aria-hidden={"true"}
          >
            {lines.map((_, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  color: "var(--color-gray-dark-2, rgb(64, 64, 64))",
                  fontSize: "11px",
                  lineHeight: "22px",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        ) : null}

        {/* ⛔ THE CLASSES ARE LOAD-BEARING — mobile.css turns this body into a real
         * horizontal scroller at phone width and needs a handle on all three boxes.
         * Measured live 2026-08-14 at 390x844: the features panel's `21.1 km` sat at
         * right 380 inside a 237px box carrying `overflow: hidden` with 361px of
         * content, so 46px of the line was in the DOM, painted, and unreachable from
         * any scroll position. The donor's per-line fade below made it read as a
         * deliberate truncation, which is exactly what mobile-gate's rule J calls the
         * worst version of the defect. */}
        <div
          className={"tl-code-body"}
          style={{
            flex: 1,
            padding: "16px 20px",
            overflow: "hidden",
            minWidth: 0,
            fontFamily: MONO,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={"tl-code-line"}
              style={{
                height: "22px",
                lineHeight: "22px",
                whiteSpace: "pre",
                overflow: "hidden",
                position: "relative",
                paddingLeft: "2px",
              }}
            >
              {line.map(([text, tok], j) => (
                <span key={j} style={{ color: COLOR[tok], whiteSpace: "pre" }}>
                  {text}
                </span>
              ))}
              {/* The donor fades the right edge of every line rather than
               * wrapping or scrolling, so a long line reads as "continues"
               * instead of being visibly clipped. At phone width mobile.css
               * drops it: once the body scrolls, a fade pinned to each line's
               * own right edge travels WITH the content and paints a gradient
               * in the middle of a line the reader has scrolled to. */}
              <div
                className={"tl-code-line-fade"}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "32px",
                  height: "100%",
                  background:
                    "linear-gradient(to right, transparent, var(--color-black-12, rgb(31, 31, 31)))",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>

        {aside ? (
          <div
            style={{
              flexShrink: 0,
              borderLeft: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
              background: "var(--color-black, rgb(26, 26, 26))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              overflow: "hidden",
            }}
          >
            {aside}
          </div>
        ) : null}
      </div>

      {footer ? (
        <div
          style={{
            borderTop: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
            background: "var(--color-black, rgb(26, 26, 26))",
            padding: "12px 16px",
            flexShrink: 0,
          }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}
