"use client";

import { useRef } from "react";

/**
 * A textarea with syntax highlighting behind it.
 *
 * The playground is the one place on the page where markup is *editable*, and
 * an unstyled textarea next to six highlighted code windows reads as the one
 * thing nobody finished. A textarea cannot style its own content, so the
 * standard shape applies: a <pre> underneath holding the same text, tokenised,
 * and the textarea on top with transparent ink and a visible caret.
 *
 * Both layers must agree on font, size, line-height, padding, tab size and
 * wrapping to the pixel, or the caret drifts from the glyphs — which is why
 * every one of those lives in a single CSS rule that targets both.
 *
 * Colours come from CodePanel's palette, so the editor and the windows around
 * it tokenise the same way.
 */

const ESC: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ESC[c]);

/**
 * Tokenises HTML well enough for a receipt: tags, attribute names, quoted
 * values, comments, and text. Deliberately not a parser — it never has to be
 * correct about malformed input, only stable, because the authoritative render
 * is the receipt sitting next to it.
 */
function highlight(src: string): string {
  return esc(src).replace(
    /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([a-zA-Z][\w-]*)((?:[^&]|&(?!gt;))*?)(\/?&gt;)/g,
    (m, comment, open, name, attrs, close) => {
      if (comment) return `<span class="t-com">${comment}</span>`;
      const a = (attrs || "").replace(
        /([\w-]+)(\s*=\s*)("[^"]*"|'[^']*')?/g,
        (_m: string, key: string, eq: string, val: string) =>
          `<span class="t-attr">${key}</span><span class="t-punct">${eq}</span>` +
          (val ? `<span class="t-str">${val}</span>` : ""),
      );
      return (
        `<span class="t-punct">${open}</span>` +
        `<span class="t-tag">${name}</span>` +
        a +
        `<span class="t-punct">${close}</span>`
      );
    },
  );
}

export default function MarkupEditor({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const pre = useRef<HTMLPreElement | null>(null);

  return (
    <div className={"tl-code-editor"}>
      <pre className={"tl-code-hl"} ref={pre} aria-hidden={"true"}>
        {/* The trailing newline keeps the last line's highlight in view when the
         * caret sits past the end of the text. */}
        <code dangerouslySetInnerHTML={{ __html: highlight(value) + "\n" }} />
      </pre>
      <textarea
        id={id}
        className={"tl-code-input"}
        spellCheck={false}
        autoComplete={"off"}
        autoCorrect={"off"}
        autoCapitalize={"off"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={(e) => {
          // The layers scroll independently unless told otherwise.
          const el = e.currentTarget;
          if (pre.current) {
            pre.current.scrollTop = el.scrollTop;
            pre.current.scrollLeft = el.scrollLeft;
          }
        }}
      />
    </div>
  );
}
