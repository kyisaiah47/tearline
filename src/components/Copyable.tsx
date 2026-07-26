"use client";

import { useState } from "react";

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
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={"tl-copy"}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      aria-label={`Copy: ${text}`}
    >
      <span className={"tl-copy-prompt"} aria-hidden={"true"}>
        {prompt}
      </span>
      <code className={"tl-copy-text"}>{text}</code>
      <span className={"tl-copy-action"}>{copied ? "copied" : "copy"}</span>
    </button>
  );
}
