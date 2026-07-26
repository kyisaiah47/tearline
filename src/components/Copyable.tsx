"use client";

import { useState } from "react";

/**
 * Click-to-copy command chip. Used both in the header (where it replaces the
 * template's BUY NOW link — there is nothing to buy) and in the install
 * section, so the two never drift apart.
 */
export default function Copyable({
  text,
  label,
  compact = false,
}: {
  text: string;
  label?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={compact ? "tl-copy-row tl-copy-compact" : "tl-copy-row"}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      aria-label={`Copy ${text}`}
    >
      <span className={"tl-copy-prompt"}>{label ?? "$"}</span>
      <code className={"tl-copy-text"}>{text}</code>
      <span className={"tl-copy-action"}>{copied ? "copied" : "copy"}</span>
    </button>
  );
}
