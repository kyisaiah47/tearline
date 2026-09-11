import type { ReactNode } from "react";

/* THE DOCS' TWO SHAPES, on the document register. A section is a heading and its body; the lead
 * section's heading is the page's own title band (SiteShell), so it renders its body alone. A
 * reference table is the register's table inside the sideways-scrolling wrapper. */
export function DocsSection({
  id,
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
  if (lead) return <section id={id}>{children}</section>;
  return (
    <section id={id}>
      <h2>{`${headingTop} ${headingBottom}`}</h2>
      {children}
    </section>
  );
}

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
      <div className={"guide-scroll"}>
        <table>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <td className={"tl-td-name"}>
                  <code>{row[0]}</code>
                </td>
                {row.length === 3 ? <td className={"tl-td-def"}>{row[1]}</td> : null}
                <td className={"tl-td-desc"}>{row[row.length - 1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
