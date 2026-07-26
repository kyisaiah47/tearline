import "react";

// Allow CSS custom properties (--token values, rich-text variables) in inline
// style objects — csstype doesn't model them.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
    // Emerging CSS properties csstype doesn't ship yet.
    cornerShape?: string;
  }

  // The Framer capture emits a handful of non-standard DOM attributes that
  // React's own types reject, which fails `next build` at the type-check step
  // even though the markup renders fine. They are load-bearing for the captured
  // runtime (routeid keys the route, `as` records the original element tag), so
  // declare them rather than stripping them out of every section file.
  interface HTMLAttributes<T> {
    routeid?: string;
    as?: string;
  }
  interface SVGProps<T> {
    weight?: string;
  }
}
