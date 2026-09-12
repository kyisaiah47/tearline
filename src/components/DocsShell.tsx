import type { ReactNode } from "react";

/**
 * The prose-page section shell.
 *
 * This is InstallSection's shell, lifted whole — same
 * `featuressection-*` classes, same eyebrow dot, same two-line heading. It
 * lived inline in docs/page.tsx until a second prose page (/dom-to-png) needed
 * the identical markup; rather than let two copies drift apart on the padding
 * the way the donor template's nine hand-drawn code windows did, it moved here.
 *
 * Note for anything that renders these: do NOT pass `data-reveal` to children.
 * globals.css sets `.js [data-reveal="N"] { opacity: 0 }` and ScrollReveals
 * only un-hides ids listed under the CURRENT ROUTE in motion-data.json, which
 * has entries for `/` alone. A reveal attribute on a prose page renders the
 * whole thing invisible to anyone with JavaScript on.
 */
export function DocsSection({
  id,
  eyebrow,
  headingTop,
  headingBottom,
  lead = false,
  children,
}: {
  id: string;
  eyebrow: string;
  headingTop: string;
  headingBottom: string;
  lead?: boolean;
  children: ReactNode;
}) {
  const heading = (
    <>
      {headingTop}
      <br className={"heading-4"} />
      <span
        className={"heading-4"}
        style={{ "--rt-text-color": "var(--value-gray-2, rgb(128, 128, 128))" }}
      >
        {headingBottom}
      </span>
    </>
  );

  return (
    <section
      className={"featuressection-features-section"}
      data-border={"true"}
      data-name={`${eyebrow} Section`}
      id={id}
    >
      <div className={"featuressection-content"}>
        <div
          className={"featuressection-heading-wrapper"}
          data-name={"Heading wrapper"}
        >
          <div className={"featuressection-heading"}>
            <div className={"features-eyebrow-slot"}>
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
                      "var(--extracted-r6o4lv, var(--color-background, #f2ece1))",
                  }}
                >
                  {eyebrow}
                </p>
              </div>
            </div>
            <div
              className={"features-heading"}
              data-component={"RichTextContainer"}
            >
              {lead ? (
                <h1 className={"heading-4 section-heading"} dir={"auto"}>
                  {heading}
                </h1>
              ) : (
                <h2 className={"heading-4 section-heading"} dir={"auto"}>
                  {heading}
                </h2>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/** InstallSection's reference table, lifted whole. */
export function RefTable({
  label,
  rows,
}: {
  label: string;
  rows: (readonly [string, string, string] | readonly [string, string])[];
}) {
  return (
    <>
      <p className={"tl-docs-label"}>{label}</p>
      <table className={"tl-table"}>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <td className={"tl-td-name"}>
                <code>{row[0]}</code>
              </td>
              {row.length === 3 ? (
                <td className={"tl-td-def"}>{row[1]}</td>
              ) : null}
              <td className={"tl-td-desc"}>{row[row.length - 1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
