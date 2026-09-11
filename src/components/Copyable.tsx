"use client";

import { useState } from "react";
import Chip from "@compound/landing/pieces/Chip";
import CodeFence from "@compound/landing/pieces/CodeFence";

/* One line to copy, on the register's code fence with the copy control in its bar. The
 * clipboard API first; the textarea fallback needs no permission and works everywhere. */
export default function Copyable({ prompt, text }: { prompt?: string; text: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  }

  return (
    <CodeFence
      lang={prompt ? prompt : undefined}
      lines={[{ n: null, tokens: [{ text }] }]}
      action={
        <Chip as={"button"} type={"button"} tone={"inverse"} onClick={copy} aria-live={"polite"}>
          {done ? "Copied" : "Copy"}
        </Chip>
      }
    />
  );
}
