"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { Toaster, toast } from "sonner";
import Chip from "@compound/landing/pieces/Chip";
import MarkupEditor from "@/components/MarkupEditor";
import ExportStage, { explain, type ExportState } from "@/components/ExportStage";
import type { Stage } from "@/lib/export-stages";

/* THE PLAYGROUND, on the register's column. It drives the SAME element the install section tells
 * you to install, loaded from /tearline.js. Nothing here is mocked: if this section is broken,
 * the product is broken, and you find out by looking at the page. The editor, the seeded stage,
 * the export with its four real stages and the result card are the same as before the port; the
 * controls are the register's button and chip. */

/* Formatted to sit inside the editor column without wrapping. `<h2 data-title>`, not `<h1>`: the
 * sample is rendered live beside the editor, so an h1 here would be a second level-one heading on
 * a page that already has one. `data-title` is the component's own opt-in for that treatment. */
const SAMPLE = `<h2 data-title>Meridian</h2>
<p><small>WRAP ANYTHING</small></p>
<hr>

<table>
  <tr>
    <td>1</td>
    <td>Cortado</td>
    <td align="right">4.25</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Sourdough</td>
    <td align="right">3.50</td>
  </tr>
</table>
<hr>

<table>
  <tr>
    <td><strong>TOTAL</strong></td>
    <td align="right"><strong>7.75</strong></td>
  </tr>
</table>
<hr>

<p><small>THANK YOU</small></p>`;

type TearLineEl = HTMLElement & {
  download: (name?: string, opts?: { scale?: number }) => Promise<void>;
  toBlob: (opts?: { scale?: number }) => Promise<Blob | null>;
};

/* On iOS and iPadOS every browser is WebKit, and WebKit does not honour `a.download` for a
 * `blob:` URL: it treats the click as a navigation, the playground unloads, and the reader's
 * markup goes with it. Measured on session 019ffb4a-c354 (iPhone, 2026-08-13). So there, the
 * auto-click does not happen at all: the result card is the delivery, and its link opens in its
 * own tab. */
function savesInPlace(): boolean {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent || "";
  const webkitMobile =
    /iP(hone|od|ad)/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return !webkitMobile;
}

/* The register's button, on a <button>: the same tree FrameButton draws on an anchor. */
function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={"frame-button button-6 button button-6-state button-2"} data-name={"Button"} style={{ backgroundColor: "var(--color-text, #1a1a1a)" }}>
      <div className={"dot-10"} data-name={"Dot"} aria-hidden={"true"} style={{ backgroundColor: "var(--color-white, #fff)" }} />
      <div className={"button-text-wrap"} data-name={"Button Text Wrap"}>
        <div className={"get-started-slot"}><span>{children}</span></div>
        <div className={"icon-wrap-2"} data-name={"Icon Wrap"} aria-hidden={"true"}><div className={"hero-cta-arrow hero-cta-icon"} /></div>
      </div>
      <div className={"background"} data-name={"Background"} aria-hidden={"true"} style={{ backgroundColor: "var(--color-background)" }} />
    </button>
  );
}

export default function Playground() {
  const [src, setSrc] = useState(SAMPLE);
  const [seed, setSeed] = useState(20260726);
  /* The paper is a fixed pixel width by attribute, so on a phone the stage asks for a narrower
   * receipt rather than clipping one. */
  const [paper, setPaper] = useState(300);
  const [exp, setExp] = useState<ExportState>({ kind: "idle" });
  const receipt = useRef<TearLineEl | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const lastUrl = useRef<string | null>(null);

  // The receipt's content is light-DOM children of a custom element, so React
  // cannot own it: set it imperatively and let the element re-render itself.
  useEffect(() => {
    if (receipt.current) receipt.current.innerHTML = src;
  }, [src]);

  /* An object URL is held for as long as the result card shows the thumbnail and the "save it
   * again" link points at it; revoking it on the next export is what stops a session of twenty
   * exports pinning twenty PNGs in memory. */
  const releaseLast = () => {
    if (lastUrl.current) {
      URL.revokeObjectURL(lastUrl.current);
      lastUrl.current = null;
    }
  };
  useEffect(() => releaseLast, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    /* The element's box is the paper plus the padding its drop shadow needs, so the paper is
       sized off the stage's own width and capped at the desktop width. */
    const fit = () => setPaper(Math.min(300, Math.max(160, Math.floor(el.clientWidth - 96))));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  async function runExport() {
    const el = receipt.current;
    if (!el) return;

    /* The stage the export reached, tracked outside React state as well as in it: when the
     * promise rejects we need to know WHERE. */
    let at: Stage = "flatten";
    const onStage = (e: Event) => {
      at = (e as CustomEvent<{ stage: Stage }>).detail.stage;
      setExp({ kind: "working", stage: at });
    };
    el.addEventListener("tearline:stage", onStage);

    releaseLast();
    setExp({ kind: "working", stage: "flatten" });
    try { posthog.capture("demo_started", { tool: "playground_export" }); } catch {}

    try {
      /* `toBlob` rather than `download`, because the panel needs the artefact, its real byte
       * count and its real pixel size. The save still happens here, immediately. */
      const blob = await el.toBlob();
      if (!blob) throw new Error("encode: the canvas produced no blob");

      const url = URL.createObjectURL(blob);
      lastUrl.current = url;

      const size = await new Promise<{ w: number; h: number }>((res) => {
        const probe = new Image();
        probe.onload = () => res({ w: probe.naturalWidth, h: probe.naturalHeight });
        probe.onerror = () => res({ w: 0, h: 0 });
        probe.src = url;
      });

      const name = "receipt.png";
      const saved = savesInPlace();
      if (saved) {
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      }

      setExp({ kind: "done", result: { url, w: size.w, h: size.h, bytes: blob.size, name, saved } });
      try {
        posthog.capture("demo_completed", { tool: "playground_export", width: size.w, height: size.h, bytes: blob.size, auto_saved: saved, edited: src !== SAMPLE });
      } catch {}
    } catch (err) {
      setExp({ kind: "failed", stage: at, message: explain(at, err) });
      try { posthog.capture("demo_failed", { tool: "playground_export", reason: at }); } catch {}
      /* Failures only: a reader who has scrolled on to the docs would otherwise never learn it
       * broke. The panel keeps the sentence that says what to do. */
      toast.error("The export did not finish.", { description: "The playground says which step stopped it, and how to fix it." });
    } finally {
      el.removeEventListener("tearline:stage", onStage);
    }
  }

  return (
    <section className={"tl-play"} id={"playground"} aria-label={"Playground"}>
      <div className={"tl-play__grid"}>
        <div className={"tl-play__editor"}>
          <label className={"tl-play__label"} htmlFor={"tl-src"}>{"Your markup"}</label>
          <MarkupEditor id={"tl-src"} value={src} onChange={setSrc} />
          <div className={"tl-play__controls"}>
            <Button type={"button"} onClick={runExport} disabled={exp.kind === "working"}>{"Download PNG"}</Button>
            <Chip as={"button"} type={"button"} tone={"neutral"} onClick={() => setSeed(Math.floor(Math.random() * 1e6))} disabled={exp.kind === "working"}>{"New tear"}</Chip>
            <span className={"tl-play__seed"}>{`seed ${seed}`}</span>
          </div>
          <p className={"tl-play__quiet"}>{"This is the real element, loaded the way the docs tell you to load it. Edit anything."}</p>

          <ExportStage
            state={exp}
            onRetry={runExport}
            onDismiss={() => {
              releaseLast();
              setExp({ kind: "idle" });
            }}
          />

          <Toaster
            position={"bottom-center"}
            toastOptions={{
              style: {
                background: "var(--doc-ink, #1a1a1a)",
                border: "1px solid var(--doc-rule, #e5e5e5)",
                color: "var(--color-white, #fff)",
                borderRadius: "0",
                fontFamily: "var(--doc-mono, monospace)",
                fontSize: "13px",
              },
            }}
          />
        </div>

        <div ref={stage} className={"tl-play__stage"}>
          <tear-line ref={receipt} seed={String(seed)} barcode={"04732026"} width={String(paper)} />
        </div>
      </div>
    </section>
  );
}
