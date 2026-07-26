"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789<>-_/[]{}=+*^?#$&;:%";

/**
 * Progressive decode: the text types in left-to-right, and the leading edge is
 * a run of random glyphs that resolve as the reveal passes them. Characters
 * past the reveal head are not rendered at all, so the line grows in place.
 *
 * `charsPerSecond` controls reveal speed; `edge` is how many unresolved glyphs
 * trail the head. Spaces are preserved so word rhythm stays intact.
 */
export default function ScrambleText({
  text,
  charsPerSecond = 42,
  edge = 30,
  className,
  as: Tag = "span",
  style,
}: {
  text: string;
  charsPerSecond?: number;
  edge?: number;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}) {
  // Render the full text for SSR / first paint so hydration matches and the
  // copy is present without JS; the animation takes over on mount.
  const [out, setOut] = useState(text);
  const hostRef = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cancelled = false;

    const run = () => {
      if (started.current || cancelled) return;
      started.current = true;

      const t0 = performance.now();
      const total = text.length;

      const frame = (now: number) => {
        if (cancelled) return;
        const head = ((now - t0) / 1000) * charsPerSecond;
        if (head >= total + edge) {
          setOut(text);
          return;
        }
        let s = "";
        const visible = Math.min(total, Math.floor(head));
        for (let i = 0; i < visible; i++) {
          const ch = text[i];
          // resolved once the head has moved `edge` chars past this index
          if (head - i > edge || ch === " ") s += ch;
          else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    // Start when the line is actually on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) run();
      },
      { threshold: 0.2 },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, charsPerSecond, edge]);

  return (
    <Tag ref={hostRef} className={className} style={style}>
      {out}
    </Tag>
  );
}
