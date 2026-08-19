"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { Toaster, toast } from "sonner";

import MarkupEditor from "@/components/MarkupEditor";
import ExportStage, { explain, type ExportState } from "@/components/ExportStage";

/**
 * The playground.
 *
 * Takes over the donor's "How it works" slot, which was three collapsible steps
 * on the left and a canned screenshot of the product on the right. The layout is
 * exactly what a playground wants — input left, output right, 1 : 1.2 — so the
 * shell classes stay and only what sits in the columns changes.
 *
 * It drives the SAME element the install section tells you to install, loaded
 * from /tearline.js. Nothing here is mocked. If this section is broken, the
 * product is broken, and you find out by looking at the page rather than by
 * reading a test report.
 */

/* Formatted to sit inside the editor column without wrapping. A sample that
 * wraps every table row across three visual lines is the first thing a visitor
 * reads, and it makes the format look harder than it is. */
/* ⛔ `<h2 data-title>`, NOT `<h1>`. This sample is RENDERED live into the receipt beside the
 * editor, so an `<h1>` here is a second level-one heading on a page that already has one — the
 * landing was painting three at once (its hero h1 plus the two demo receipts) and failing
 * single-h1 on the nightly craft gate. `data-title` is the component's own opt-in: it takes the
 * h1 treatment verbatim, so the receipt prints exactly as before, and it is the correct thing to
 * teach for the case this sample is showing, which is a receipt embedded in a page. A receipt
 * that IS the whole document still uses `<h1>` and still gets the same treatment. */
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

/**
 * DOES A SYNTHETIC ANCHOR CLICK SAVE THE FILE, OR NAVIGATE AWAY FROM THE PAGE?
 *
 * On iOS and iPadOS every browser is WebKit, and WebKit does not honour `a.download` for a
 * `blob:` URL — it treats the click as a navigation. The tab goes to the blob, the playground
 * unloads, and the reader's markup goes with it.
 *
 * This is not a guess about WebKit. Session 019ffb4a-c354 (iPhone, iOS 18.7 / Safari 26.6,
 * 2026-08-13) pressed "Download PNG" twice, and each press was followed by `$pageleave` ~150ms
 * later and a fresh `$pageview` ~13s after that — they came back to a page reset to the sample.
 * Then they pressed "New tear" five times in 3.8 seconds looking for the receipt they had made.
 * That reader was the only person to actually use the tool that day.
 *
 * So there, the auto-click does not happen at all: the result card IS the delivery, and its link
 * opens in its own tab so the playground survives being saved from.
 */
function savesInPlace(): boolean {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent || "";
  // iPadOS reports itself as MacIntel, so the touch-point count is what separates it from a Mac.
  const webkitMobile =
    /iP(hone|od|ad)/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return !webkitMobile;
}

const MONO = "'Geist Mono', 'Fira Code', monospace";

type Stage = "flatten" | "serialise" | "rasterise" | "encode";

export default function PlaygroundSection() {
  const [src, setSrc] = useState(SAMPLE);
  const [seed, setSeed] = useState(20260726);
  const [exp, setExp] = useState<ExportState>({ kind: "idle" });
  const receipt = useRef<TearLineEl | null>(null);
  const lastUrl = useRef<string | null>(null);

  // The receipt's content is light-DOM children of a custom element, so React
  // cannot own it — set it imperatively and let the element re-render itself.
  useEffect(() => {
    if (receipt.current) receipt.current.innerHTML = src;
  }, [src]);

  /* An object URL is held for as long as the result card shows the thumbnail and the "save it
   * again" link points at it. Revoking it on the next export is what stops a session of twenty
   * exports pinning twenty PNGs in memory — the old `download()` revoked immediately, which was
   * right when nothing on the page referred to the blob afterwards and is wrong now that
   * something does. */
  const releaseLast = () => {
    if (lastUrl.current) {
      URL.revokeObjectURL(lastUrl.current);
      lastUrl.current = null;
    }
  };
  useEffect(() => releaseLast, []);

  async function runExport() {
    const el = receipt.current;
    if (!el) return;

    /* The stage the export reached, tracked outside React state as well as in it: when the
     * promise rejects we need to know WHERE, and a state setter's value is not readable from the
     * catch block that needs it. */
    let at: Stage = "flatten";
    const onStage = (e: Event) => {
      at = (e as CustomEvent<{ stage: Stage }>).detail.stage;
      setExp({ kind: "working", stage: at });
    };
    el.addEventListener("tearline:stage", onStage);

    releaseLast();
    setExp({ kind: "working", stage: "flatten" });

    /* The playground is the product, and until now it was silent: this host emitted `$pageview`,
     * `checkout_started` and `purchase_completed` and nothing else, so a reader who typed their
     * own markup and exported a receipt was indistinguishable from one who bounced off the hero.
     * Same three events, and the same shape, as the CertScope tools. */
    try {
      posthog.capture("demo_started", { tool: "playground_export" });
      /* The commercial reset's own vocabulary, emitted beside this host's existing names so the
       * estate funnel and this site's history both resolve. `diagnostic_started` is the reader
       * pressing export; `activated` below is the artefact actually existing. */
      posthog.capture("diagnostic_started", { tool: "playground_export" });
    } catch {}

    try {
      /* `toBlob` rather than `download`, because the panel needs the artefact — its real byte
       * count and its real pixel size — and `download` throws the blob away after clicking a
       * link. The save still happens here, immediately, exactly as before: pressing the button
       * saves the file, and the card is what the page has to show for it rather than a step the
       * reader has to take. */
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

      setExp({
        kind: "done",
        result: { url, w: size.w, h: size.h, bytes: blob.size, name, saved },
      });
      try {
        posthog.capture("demo_completed", {
          tool: "playground_export",
          width: size.w,
          height: size.h,
          bytes: blob.size,
          auto_saved: saved,
          /* Whether they exported OUR sample or their own markup is the difference between
           * a reader poking the demo and a reader trying the product on their own receipt. */
          edited: src !== SAMPLE,
        });
        posthog.capture("diagnostic_completed", { tool: "playground_export" });
        /* FIRST VALUE on this product: a receipt that exists as a file. Nothing is bought here,
         * so the PNG is the whole activation \u2014 and `edited` separates a reader poking the
         * sample from one who ran it on their own markup. */
        posthog.capture("activated", {
          kind: "export",
          own_markup: src !== SAMPLE,
          bytes: blob.size,
        });
      } catch {}
    } catch (err) {
      setExp({ kind: "failed", stage: at, message: explain(at, err) });
      try { posthog.capture("demo_failed", { tool: "playground_export", reason: at }); } catch {}
      /* SONNER, FOR THE FAILURE — and only for the failure.
       *
       * Failures and undo only. A toast confirming a successful export would be a notification
       * about something the reader is already looking at, three lines below, in a card built to
       * show it. This one exists because an export can be started and then scrolled away from:
       * the panel is in the playground, and a reader who has moved on to the docs would otherwise
       * never learn it broke. The toast is short and points back; the panel keeps the sentence
       * that says what to do. */
      toast.error("The export did not finish.", {
        description: "The playground says which step stopped it, and how to fix it.",
      });
    } finally {
      el.removeEventListener("tearline:stage", onStage);
    }
  }

  return (
    <section
      className={"how-it-works-section"}
      data-border={"true"}
      data-name={"How it works Section"}
      id={"playground"}
    >
      <div className={"howitworkssection-content"}>
        <div
          className={"howitworkssection-heading-wrapper"}
          data-name={"Heading wrapper"}
        >
          <div className={"howitworkssection-heading"}>
            <div className={"how-it-works-eyebrow"} data-reveal={"0"}>
              <div className={"dot"} data-border={"true"} data-name={"Dot"} />
              <div
                className={"features-eyebrow-text"}
                data-component={"RichTextContainer"}
              >
                <p
                  className={"heading-4 menu-label"}
                  dir={"auto"}
                  style={{
                    "--rt-text-color":
                      "var(--extracted-r6o4lv, var(--color-background, rgb(255, 165, 82)))",
                  }}
                >
                  {"Playground"}
                </p>
              </div>
            </div>
            <div
              className={"how-it-works-heading"} data-reveal={"1"}
              data-component={"RichTextContainer"}
            >
              <h2 className={"heading-4 section-heading"} dir={"auto"}>
                {"Type on the left."}
                <br className={"heading-4"} />
                <span
                  className={"heading-4"}
                  style={{
                    "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                  }}
                >
                  {"Tear off the right."}
                </span>
              </h2>
            </div>
            <div
              className={"how-it-works-subhead"} data-reveal={"2"}
              data-component={"RichTextContainer"}
            >
              <p
                className={"heading-4 hero-subtext"}
                dir={"auto"}
                style={{
                  "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))",
                }}
              >
                {
                  "This is the real element, loaded the way the docs tell you to load it. Edit anything."
                }
              </p>
            </div>
          </div>
        </div>

        <div className={"steps-stack"}>
          <div className={"step-visual-slot"} data-border={"true"}>
            <div
              className={
                "howitworkssection-desktop-tablet-2-2 howitworkssection-desktop-tablet-2 howitworkssection-desktop-tablet-2-2-state-2"
              }
              data-border={"true"}
              style={{ width: "100%" }}
            >
              <div
                className={"howitworkssection-left"}
                data-border={"true"}
                data-name={"Left"}
              >
                <div className={"tl-editor"}>
                  <label className={"tl-editor-label"} htmlFor={"tl-src"}>
                    {"your markup"}
                  </label>
                  <MarkupEditor id={"tl-src"} value={src} onChange={setSrc} />
                  <div className={"tl-editor-controls"}>
                    {/* The label no longer carries the state. It said "Rendering…" and then
                        "Export failed" and then went back to itself, which meant the button was
                        the progress indicator, the result and the error message all at once — and
                        each of those overwrote the last. Disabled while working, in three
                        channels; the panel below says everything else. */}
                    <button
                      className={"tl-btn"}
                      type={"button"}
                      onClick={runExport}
                      disabled={exp.kind === "working"}
                    >
                      {"Download PNG"}
                    </button>
                    <button
                      className={"tl-btn tl-btn-ghost"}
                      type={"button"}
                      onClick={() => setSeed(Math.floor(Math.random() * 1e6))}
                      disabled={exp.kind === "working"}
                    >
                      {"New tear"}
                    </button>
                    <span className={"tl-seed"}>{`seed ${seed}`}</span>
                  </div>

                  <ExportStage
                    state={exp}
                    onRetry={runExport}
                    onDismiss={() => {
                      releaseLast();
                      setExp({ kind: "idle" });
                    }}
                  />

                  {/* Dressed in the product's own tokens rather than Sonner's default light
                      card: a white panel on this page is the one thing that would make a toast
                      read as a browser artefact rather than as part of Tearline. */}
                  <Toaster
                    position={"bottom-center"}
                    toastOptions={{
                      style: {
                        background: "var(--color-black, #1a1a1a)",
                        border: "1px solid var(--color-gray-dark, #2a2a2a)",
                        color: "var(--color-text, #d1d1d1)",
                        borderRadius: "12px",
                        fontFamily: MONO,
                        fontSize: "13px",
                      },
                    }}
                  />
                </div>
              </div>

              <div className={"howitworkssection-right"}>
                {/* Same art as the hero and the feature panels. Without it the
                 * receipt sits on flat black and reads as a cut-out. */}
                <div className={"tl-stage-backdrop tl-backdrop"} />
                <div className={"tl-stage"}>
                  <tear-line
                    ref={receipt}
                    seed={String(seed)}
                    barcode={"04732026"}
                    width={"300"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* The donor's stat strip. Its numbers were 10,000+ developers and
           * 99.9% uptime; this product has no users and no server, so the row
           * carries facts about the thing itself — each one checkable against
           * the file you are being asked to install. */}
          <div className={"how-it-works-steps"} data-border={"true"}>
            {(
              [
                ["1", "tag"],
                ["0", "dependencies"],
                ["0", "build steps"],
                ["MIT", "licence"],
              ] as [string, string][]
            ).map(([value, label], i) => (
              <div className={"stat-developers-container"} key={label}>
                <div
                  className={
                    "stat-item feature-card-responsive link-16 stat-item-tablet howitworkssection-text-13-state"
                  }
                  data-border={"true"}
                  style={{
                    "--border-left-width": i === 0 ? "0px" : "1px",
                    "--border-top-width": "0px",
                    width: "100%",
                  }}
                >
                  <div
                    className={"stat-value-text"}
                    data-component={"RichTextContainer"}
                  >
                    <h3 className={"heading-4 heading-3"} dir={"auto"}>
                      {value}
                    </h3>
                  </div>
                  <div
                    className={"stat-label-text"}
                    data-component={"RichTextContainer"}
                  >
                    <p className={"heading-4 nav-link-text"} dir={"auto"}>
                      {label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
