import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * <tear-line> is a custom element, so TypeScript has no idea it exists and
 * every use of it needs either this declaration or a @ts-expect-error above it.
 * Declaring it once is the honest version: the attributes below are the
 * element's real public API, so a typo in the markup is now a build error
 * rather than a silently ignored attribute.
 */
type TearLineAttributes = {
  /** Paper width in pixels. */
  width?: string;
  /** Any integer. Same seed, same torn edge and same barcode, every time. */
  seed?: string;
  /** Digits printed under the bars. Decorative — not a scannable Code 128. */
  barcode?: string;
  /** Rotation in degrees. */
  tilt?: string;
  /** No rotation, no shadow. For embedding inside another layout. */
  flat?: string;
  /** Prints out on first paint. Skipped under prefers-reduced-motion. */
  animate?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tear-line": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & TearLineAttributes,
        HTMLElement
      >;
    }
  }
}
