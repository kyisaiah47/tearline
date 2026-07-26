/**
 * Compact footer.
 *
 * Replaces the template's four-column footer, which carried two invented HQ
 * addresses, invented US/EU phone numbers, dead social handles and a newsletter
 * form with no backend. A free MIT component needs a licence line, a way to
 * reach us, and the two places it actually lives.
 */
export default function SiteFooter() {
  return (
    <footer className={"tl-footer"}>
      <div className={"tl-shell tl-footer-inner"}>
        <div className={"tl-footer-brand"}>
          <p className={"tl-footer-mark"}>{"TEARLINE"}</p>
          <p className={"tl-footer-note"}>
            {"MIT licensed. Free forever. A "}
            <a href={"https://kynth.studio"}>{"Kynth Studio"}</a>
            {" project."}
          </p>
        </div>

        <nav className={"tl-footer-links"} aria-label={"Footer"}>
          <a href={"https://github.com/kyisaiah47/tearline"}>{"GitHub"}</a>
          <a href={"https://www.npmjs.com/package/tearline"}>{"npm"}</a>
          <a href={"/#playground"}>{"Playground"}</a>
          <a href={"/#install"}>{"Docs"}</a>
          <a href={"mailto:hello@kynth.studio"}>{"hello@kynth.studio"}</a>
        </nav>
      </div>
    </footer>
  );
}
