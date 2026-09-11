/* The register's frame sets its Framer-era custom properties inline (`--extracted-…`), and this
 * repo type-checks its build. CSS custom properties are valid inline style keys; React's types
 * do not know that, so this is the one augmentation. */
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
