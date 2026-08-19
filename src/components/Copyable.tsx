"use client";

import { useState } from "react";
import posthog from "posthog-js";

/**
 * Click-to-copy command chip.
 *
 * Built from the code window's measurements — same mono stack, same hairline,
 * same 16px radius — so an install command reads as another panel rather than
 * as a form control. The prompt glyph is a separate span because it must not be
 * selectable: someone dragging across the line to copy it by hand should get
 * the command, not `$ ` and then the command.
 */
export default function Copyable({
  text,
  prompt = "$",
}: {
  text: string;
  prompt?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  // navigator.clipboard is undefined on a non-secure origin and REJECTS when
  // the permission is denied — which is what a browser does to a background
  // tab, and what an automated check does by default. Unhandled, that throws
  // past the handler, the label never changes, and the button reads as dead.
  // The textarea fallback needs no permission and works everywhere.
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
    /* The reset's second activation route for this product. Its first-value event is "a receipt
     * rendered or exported, OR the component installed" \u2014 and taking the install command is
     * the closest observable thing to the second half, since the install itself happens in
     * somebody else's terminal. Only install-shaped strings count; a copied colour token is not
     * an activation. */
    if (/tearline/i.test(text)) {
      try {
        posthog.capture("activated", {
          kind: "install_copied",
          via: text.startsWith("npm") ? "npm" : "script_tag",
        });
      } catch {
        // analytics must never be the thing that breaks a copy button
      }
    }
    setTimeout(() => setState("idle"), 1400);
  }

  return (
    <button
      className={"tl-copy"}
      onClick={copy}
      aria-label={`Copy: ${text}`}
    >
      <span className={"tl-copy-prompt"} aria-hidden={"true"}>
        {prompt}
      </span>
      <code className={"tl-copy-text"}>{text}</code>
      <span className={"tl-copy-action"}>
        {state === "copied" ? "copied" : state === "failed" ? "select it" : "copy"}
      </span>
    </button>
  );
}
