/**
 * The brand mark, as a hidden SVG sprite.
 *
 * Lifted verbatim out of the bottom of `app/page.tsx`. The header and footer
 * logos are `<use href="#brand-mark">`, so the symbol has to exist on whatever
 * route they render on — parked on the home page it left every other route
 * with an empty logo slot. Same markup, same transform, same comment; it just
 * lives in the shell now.
 */
export default function BrandMark() {
  return (
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
  );
}
