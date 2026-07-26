import "react";

// Allow CSS custom properties (--token values, rich-text variables) in inline
// style objects — csstype doesn't model them.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
    // Emerging CSS properties csstype doesn't ship yet.
    cornerShape?: string;
  }
}
