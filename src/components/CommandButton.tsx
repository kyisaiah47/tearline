"use client";

import { useState } from "react";

/**
 * A CTA whose label is a shell command.
 *
 * "npm i tearline" set in the template's UI sans, inside a button that only
 * scrolls somewhere, is a label pretending to be a command. It is the actual
 * install line — so it is set in the mono stack, carries a prompt glyph, and
 * copying it is what clicking does.
 *
 * The button chrome is the donor's own primary/secondary link pair, lifted
 * whole (`login-link` and its state classes), so these sit in the CTA row at
 * the same height and radius as every other button on the page. Only the label
 * is ours.
 */
export default function CommandButton({
  text,
  variant = "secondary",
}: {
  text: string;
  /** `primary` is the filled accent pill; `secondary` is the outlined one. */
  variant?: "primary" | "secondary";
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  // Same fallback as Copyable: navigator.clipboard is absent on a non-secure
  // origin and rejects when the permission is denied, and an unhandled reject
  // leaves the button looking dead.
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard api");
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      } catch {
        setState("failed");
        setTimeout(() => setState("idle"), 1800);
        return;
      }
    }
    setState("copied");
    setTimeout(() => setState("idle"), 1400);
  }

  const primary = variant === "primary";

  return (
    <button
      className={
        primary
          ? "login-link-mobile login-button login-link-tablet link-12-state-3 login-link tl-cmd tl-cmd-primary"
          : "login-link-mobile login-button login-link-tablet link-12-state login-link tl-cmd"
      }
      data-name={primary ? "Primary" : "Secondary"}
      data-highlight={"true"}
      data-border={primary ? undefined : "true"}
      onClick={copy}
      aria-label={`Copy: ${text}`}
      style={{ borderRadius: "8px" }}
    >
      <span className={"tl-cmd-prompt"} aria-hidden={"true"}>
        {"$"}
      </span>
      <code className={"tl-cmd-text"}>{text}</code>
      <span className={"tl-cmd-action"} aria-hidden={"true"}>
        {state === "copied" ? (
          /* Check — drawn, not a glyph, so it inherits stroke and never falls
           * back to an emoji on a machine without the font. */
          <svg viewBox={"0 0 16 16"} fill={"none"} width={"14"} height={"14"}>
            <path
              d={"M3 8.5 L6.2 11.5 L13 4.5"}
              stroke={"currentColor"}
              strokeWidth={"1.7"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
            />
          </svg>
        ) : state === "failed" ? (
          <span className={"tl-cmd-word"}>{"select it"}</span>
        ) : (
          /* Two offset rounded rects — the universal copy mark. */
          <svg viewBox={"0 0 16 16"} fill={"none"} width={"14"} height={"14"}>
            <rect
              x={"5.6"}
              y={"5.6"}
              width={"8.4"}
              height={"8.4"}
              rx={"2"}
              stroke={"currentColor"}
              strokeWidth={"1.4"}
            />
            <path
              d={"M10.4 3.4 A2 2 0 0 0 8.4 2 H4 A2 2 0 0 0 2 4 v4.4 a2 2 0 0 0 1.4 1.9"}
              stroke={"currentColor"}
              strokeWidth={"1.4"}
              strokeLinecap={"round"}
            />
          </svg>
        )}
      </span>
    </button>
  );
}
