import type { CSSProperties, ReactNode } from "react";
import CodeFence, { type CodeLine, type TokenKind } from "@compound/landing/pieces/CodeFence";

/* THE LISTINGS, on the register's code fence. The docs and the guides tokenise their listings
 * with the six roles below; the fence draws them with its own palette, separation by value
 * rather than hue, the same way the old panel did. */
export type Tok = "tag" | "attr" | "str" | "text" | "kw" | "fn" | "muted" | "ok";
export type Line = [string, Tok][];

const KIND: Partial<Record<Tok, TokenKind>> = {
  tag: "fn",
  attr: "kw",
  kw: "kw",
  fn: "fn",
  muted: "com",
  ok: "meta",
};

export function toLines(lines: Line[]): CodeLine[] {
  return lines.map((line, i) => ({
    n: i + 1,
    tokens: line.map(([text, tok]) => ({ text, kind: KIND[tok] })),
  }));
}

export default function CodePanel({
  title,
  lines,
  meta,
  footer,
}: {
  title: string;
  meta?: ReactNode;
  lines: Line[];
  gutter?: boolean;
  aside?: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <>
      <CodeFence file={title} lang={meta} lines={toLines(lines)} />
      {footer}
    </>
  );
}
