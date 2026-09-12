/**
 * The brand mark, as a hidden SVG sprite.
 *
 * THE DRAWING IS "TORN": one sheet parted along a jagged diagonal, the halves
 * pulled apart. It replaces three staggered slabs that read, to anyone who did
 * not already know the product, as a text-align glyph — and at the 16px the
 * browser tab serves, as a hamburger menu. Neither said anything about
 * receipts, tearing or HTML.
 *
 * Authored at 64 units so the tear is real geometry rather than a stack of
 * rectangles, and rendered at 120 / 34 / 16 on both grounds before it was
 * kept. Three earlier constructions were binned on that sheet for reading as
 * Pac-Man, an ascending scatter plot and a row of download arrows.
 *
 * The header and footer logos are `<use href="#brand-mark">`, so the symbol has
 * to exist on whatever route they render on — parked on the home page it left
 * every other route with an empty logo slot.
 *
 * Fill reads var(color-background), which is the accent at full strength: the
 * receipt paper on the dark theme and the ink on the light one. The mark
 * inverts with the page and owns no hex of its own.
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
      <svg viewBox={"0 0 64 64"} overflow={"visible"} id={"brand-mark"}>
        <path
          d={
            "M9 8H55V21L47.87 20.59L42.41 26.56L34.73 24.01L29.27 29.99L21.59 27.44L16.13 33.41L9 33Z"
          }
          fill={"var(--color-background, #f2ece1)"}
        />
        <path
          d={
            "M55 29L47.87 28.59L42.41 34.56L34.73 32.01L29.27 37.99L21.59 35.44L16.13 41.41L9 41V56H55Z"
          }
          fill={"var(--color-background, #f2ece1)"}
        />
      </svg>
    </div>
  );
}
