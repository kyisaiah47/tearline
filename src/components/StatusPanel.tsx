import type { ReactNode } from "react";

/**
 * StatusPanel — the donor's checklist embed, extracted.
 *
 * Same shape as CodePanel but for a list rather than source: a status strip
 * with a state dot, then rows separated by hairlines. The donor hand-inlined it
 * five times with five slightly different paddings.
 *
 * The donor drew every row unchecked and greyed, because its list was a robot
 * narrating work it had not done yet. A list of things that are simply TRUE
 * reads better filled in, so `done` marks a row and tints its bullet with the
 * theme accent.
 */

const MONO = "'Geist Mono', 'Fira Code', monospace";

export type Row = { label: string; done?: boolean; note?: string };

export default function StatusPanel({
  status,
  live = false,
  rows,
}: {
  /** Text beside the state dot. */
  status: string;
  /** Tints the dot with the accent and gives it a halo. */
  live?: boolean;
  rows: Row[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-black, rgb(26, 26, 26))",
        border: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: MONO,
      }}
    >
      <div
        style={{
          background: "var(--color-black, rgb(26, 26, 26))",
          borderBottom: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            flexShrink: 0,
            background: live
              ? "var(--color-background, #f2ece1)"
              : "var(--value-gray-2, rgb(128, 128, 128))",
            boxShadow: live
              ? "0 0 8px var(--color-yellow-3-40, rgba(255,165,82,0.4))"
              : "none",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "var(--value-gray-2, rgb(128, 128, 128))",
            letterSpacing: "0.04em",
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          background: "var(--color-black, rgb(26, 26, 26))",
          overflow: "hidden",
        }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderBottom:
                i === rows.length - 1
                  ? "none"
                  : "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: row.done
                  ? "1px solid var(--color-yellow-3-40, rgba(255,165,82,0.4))"
                  : "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
                background: row.done
                  ? "var(--color-yellow-5-10, rgba(255,165,82,0.1))"
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                color: row.done
                  ? "var(--color-background, #f2ece1)"
                  : "transparent",
                flexShrink: 0,
              }}
            >
              {row.done ? "✓" : ""}
            </div>
            <span
              style={{
                fontSize: "12px",
                color: row.done
                  ? "var(--color-text, rgb(209, 209, 209))"
                  : "var(--color-gray-dark-2, rgb(64, 64, 64))",
                letterSpacing: "0.01em",
                flex: 1,
                minWidth: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.label}
            </span>
            {row.note ? (
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-gray-dark-2, rgb(64, 64, 64))",
                  flexShrink: 0,
                }}
              >
                {row.note}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Three labelled columns inside one frame — the donor's TERMINAL / PR / EDITOR
 *  card. Used where a feature is best shown as the same thing in three places. */
export function ColumnsPanel({
  status,
  columns,
}: {
  status: string;
  columns: { label: string; body: ReactNode }[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-black, rgb(26, 26, 26))",
        border: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: MONO,
      }}
    >
      <div
        style={{
          borderBottom: "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--value-gray-2, rgb(128, 128, 128))",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "var(--value-gray-2, rgb(128, 128, 128))",
            letterSpacing: "0.04em",
          }}
        >
          {status}
        </span>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {columns.map((col, i) => (
          <div
            // Index, not label: showing the same label twice is the POINT of
            // some of these panels (same seed, same output).
            key={i}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "14px 16px",
              borderLeft:
                i === 0
                  ? "none"
                  : "1px solid var(--color-gray-dark, rgb(42, 42, 42))",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--color-gray-dark-2, rgb(64, 64, 64))",
                marginBottom: "12px",
              }}
            >
              {col.label}
            </div>
            {col.body}
          </div>
        ))}
      </div>
    </div>
  );
}
