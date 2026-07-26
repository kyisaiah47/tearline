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

// Framer emits a handful of non-standard DOM attributes verbatim. React's types
// reject them, so the emitted codebase fails `tsc --noEmit` out of the box on a
// pristine port. Declaring them is the honest fix: they ARE in the markup, and
// stripping them would change what the captured CSS matches on.
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    routeid?: string;
    as?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SVGProps<T> {
    weight?: string;
  }
}
