"use client";

import { useSyncExternalStore, type ComponentProps } from "react";
import { BRAND_ICON_SRC } from "@/lib/brand-icon";

// The browser-tab icon is the authority for product artwork. Preserve its query
// string: Next versions metadata assets, whereas a separate public logo can stay cached.
function iconHref() {
  const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"][href]')]
    .filter(link => !link.media || window.matchMedia(link.media).matches);
  return (links.find(link => link.type === "image/svg+xml") || links.at(-1))?.href || BRAND_ICON_SRC;
}
function subscribe(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.head, { subtree: true, childList: true, attributes: true,
    attributeFilter: ["href", "rel", "type", "media"] });
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  theme.addEventListener("change", update);
  return () => { observer.disconnect(); theme.removeEventListener("change", update); };
}
// Keep the existing server fallback for no-JS pages. Hydration and subsequent
// metadata changes use the exact same URL as the favicon, never another drawing.
const serverHref = () => BRAND_ICON_SRC;
export default function FaviconMark(props: Omit<ComponentProps<"img">, "src" | "srcSet">) {
  const src = useSyncExternalStore(subscribe, iconHref, serverHref);
  return <img {...props} src={src} data-brand-source="favicon" />;
}
