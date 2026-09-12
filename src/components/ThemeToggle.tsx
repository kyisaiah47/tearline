"use client";

import { useEffect, useState } from "react";

/**
 * Ink / Paper.
 *
 * DARK IS THE DEFAULT and it is what theme.css declares with no attribute, so
 * it survives JS never arriving. This only ever ADDS `data-theme="light"` or
 * removes it — it never writes `dark`, because a value that matches the
 * default is a second source of truth for the same state.
 *
 * `mounted` gates the icon, not the button: the server cannot know what is in
 * localStorage, so rendering the moon on the first client paint would be a
 * hydration mismatch. The control is present and sized from the first frame
 * either way, so nothing in the header reflows when it resolves.
 */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
    setMounted(true);
  }, []);

  function flip() {
    const next = !light;
    setLight(next);
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("tl.theme", next ? "light" : "dark");
    } catch {
      // Safari private mode throws on setItem. The theme still applies for
      // this page view; it simply does not survive a reload.
    }
  }

  return (
    <button
      className={"tl-theme"}
      onClick={flip}
      aria-label={light ? "Switch to the dark theme" : "Switch to the light theme"}
      title={light ? "Ink" : "Paper"}
    >
      {mounted && light ? (
        <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={1.7} aria-hidden={"true"}>
          <path d={"M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"} strokeLinejoin={"round"} />
        </svg>
      ) : (
        <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={1.7} aria-hidden={"true"}>
          <circle cx={"12"} cy={"12"} r={"4.4"} />
          <path d={"M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"} strokeLinecap={"round"} />
        </svg>
      )}
    </button>
  );
}
