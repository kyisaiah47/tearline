"use client";

import { useEffect, useRef, useState } from "react";
import Chip from "@compound/landing/pieces/Chip";
import FrameButton from "@compound/landing/sections/FrameButton";
import { STAGES, type Stage } from "@/lib/export-stages";

/* THE WAIT, AND THE REVEAL.
 *
 * The stages are real: tearline.js emits `tearline:stage` as the export moves through the four
 * things it actually does, flatten, serialise, rasterise, encode. They are not invented
 * percentages and they are not evenly spaced, which is the point: rasterise is most of the wait
 * and it is also the only one that fails, so a reader who is watching gets both the honest shape
 * of the delay and, if it breaks, the name of the step that broke.
 *
 * The orbs: four, one per stage. The active one breathes and carries the accent; finished ones
 * are solid; unstarted ones are outlines. Under prefers-reduced-motion the breathing stops and
 * the state remains legible from fill alone.
 *
 * The reveal is choreographed, not swapped: the orbs settle, then the card lifts in under them
 * with its thumbnail, its true pixel size and its real weight, every number measured from the
 * blob. The error state says what to do next. */

/** `saved` is whether the file already landed in the reader's downloads. On iOS/iPadOS WebKit it
 *  did not, so the card is the delivery rather than the receipt for one, and it has to say so. */
export type Result = {
  url: string;
  w: number;
  h: number;
  bytes: number;
  name: string;
  saved: boolean;
};

export type ExportState =
  | { kind: "idle" }
  | { kind: "working"; stage: Stage }
  | { kind: "done"; result: Result }
  | { kind: "failed"; stage: Stage; message: string };

const kb = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function ExportStage({
  state,
  onRetry,
  onDismiss,
}: {
  state: ExportState;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  /* Two beats, not one: `settled` flips a frame after the result lands so the orbs finish where
   * they are before the card moves. */
  const [settled, setSettled] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (state.kind !== "done") {
      setSettled(false);
      return;
    }
    timer.current = window.setTimeout(() => setSettled(true), 220);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [state.kind]);

  if (state.kind === "idle") return null;

  const activeIndex =
    state.kind === "working"
      ? STAGES.findIndex((s) => s.key === state.stage)
      : state.kind === "failed"
        ? STAGES.findIndex((s) => s.key === state.stage)
        : STAGES.length;

  /* One live region for the whole panel: a reader who cannot see the orbs gets the stage names
   * as they change and then the result, in order, from the same element. */
  return (
    <div
      className={"tl-export"}
      data-kind={state.kind}
      role={state.kind === "failed" ? "alert" : "status"}
      aria-live={state.kind === "failed" ? "assertive" : "polite"}
    >
      {state.kind !== "done" || !settled ? (
        <div className={"tl-orbs"}>
          <div className={"tl-orbs-row"} aria-hidden={"true"}>
            {STAGES.map((s, i) => (
              <span
                key={s.key}
                className={"tl-orb"}
                data-state={
                  state.kind === "failed" && i === activeIndex
                    ? "failed"
                    : i < activeIndex
                      ? "done"
                      : i === activeIndex
                        ? "active"
                        : "waiting"
                }
              />
            ))}
          </div>
          <p className={"tl-orbs-label"}>
            {state.kind === "failed"
              ? `Stopped at: ${STAGES[activeIndex]?.label ?? "the export"}`
              : (STAGES[activeIndex]?.label ?? "Finishing")}
          </p>
        </div>
      ) : null}

      {state.kind === "done" && settled ? (
        <div className={"tl-result"}>
          {/* The receipt itself, small, as the thing that was made. */}
          <img className={"tl-result-thumb"} src={state.result.url} alt={"The receipt you exported"} />
          <div className={"tl-result-facts"}>
            <p className={"tl-result-name"}>{state.result.name}</p>
            {/* Measured off the blob and the decoded image, never estimated. The scale is 2x, so
              * the pixel size is not the CSS size and saying so is the difference between a fact
              * and a surprise. */}
            <p className={"tl-result-meta"}>
              {`${state.result.w} x ${state.result.h} px, ${kb(state.result.bytes)}, ${
                state.result.saved ? "saved to your downloads" : "ready to save"
              }`}
            </p>
            <div className={"tl-result-acts"}>
              {/* `target="_blank"` costs a desktop reader nothing and is what stops the same tap
                * from unloading the playground on a phone. */}
              <FrameButton href={state.result.url} download={state.result.name} target={"_blank"} rel={"noopener"}>
                {state.result.saved ? "Save it again" : "Save the PNG"}
              </FrameButton>
              <Chip as={"button"} type={"button"} tone={"neutral"} onClick={onDismiss}>{"Done"}</Chip>
            </div>
          </div>
        </div>
      ) : null}

      {state.kind === "failed" ? (
        <div className={"tl-fail"}>
          <p className={"tl-fail-msg"}>{state.message}</p>
          <div className={"tl-result-acts"}>
            <Chip as={"button"} type={"button"} tone={"strong"} onClick={onRetry}>{"Try the export again"}</Chip>
            <Chip as={"button"} type={"button"} tone={"neutral"} onClick={onDismiss}>{"Dismiss"}</Chip>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** What to tell someone about a failure, keyed on where it stopped. Every line names a cause and
 *  an action; none of them says "an error occurred". */
export function explain(stage: Stage, err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (stage === "rasterise") {
    /* The one authored throw in `#toCanvas`, and it is a real, fixable cause: a `<img src="https://…">`
     * inside the receipt cannot be fetched from the export sandbox. */
    if (/data: URI|rasterise/i.test(raw)) {
      return "A picture in the receipt is loaded from a URL, and the export sandbox cannot reach the network. Swap that <img> for a data: URI and it will render.";
    }
    return "The browser could not decode the receipt as an image. This is almost always an <img> pointing at a URL rather than a data: URI.";
  }
  if (stage === "encode") {
    return "The receipt rendered but the PNG could not be written, usually a canvas larger than this browser allows. Try a narrower width, or scale 1.";
  }
  if (stage === "serialise") {
    return "The receipt could not be serialised. Something in the markup is not valid XML; an unclosed tag is the usual cause.";
  }
  return "The export stopped before it started. Reload the page and try again; if it keeps happening the element did not finish loading.";
}
