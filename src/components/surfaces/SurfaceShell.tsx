import type { ReactNode } from "react";
import { SiteShell } from "@compound/landing/_route/SiteShell";
import type { SurfaceName } from "../../lib/surfaces";
import "./surfaces.css";

/* THE PER-PRODUCT HALF OF THE ROUTE SHIMS. The register's document band owns the title, the
 * lede, the rail and the chrome; the product supplies the payload only. surfaces.css adds
 * structure and takes every colour from currentColor, so it reads correctly on the register's
 * light page with nothing configured. */
export default function SurfaceShell({
  heading,
  lede,
  children,
}: {
  name?: SurfaceName;
  heading: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <SiteShell title={heading} lede={lede}>
      <article className="frame-prose doc-prose">{children}</article>
    </SiteShell>
  );
}
