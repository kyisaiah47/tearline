/*!
 * Tearline — wrap any HTML in one tag and it prints out as a thermal receipt.
 * MIT licensed. Zero dependencies. No build step.
 *
 *   <script type="module" src="tearline.js"></script>
 *
 *   <tear-line barcode="047320260726">
 *     <h1>MERIDIAN</h1>
 *     <p>Coffee &amp; Provisions</p>
 *   </tear-line>
 *
 * Attributes
 *   width      paper width in px                    (default 330)
 *   seed       integer; same seed = same tear/barcode (default 1)
 *   barcode    string to render as bars; omit for none
 *   tilt       degrees of rotation                  (default -1.15)
 *   flat       present = no rotation, no drop shadow (for embedding/export)
 *   animate    present = print-out reveal on first paint
 *
 * Methods
 *   el.toBlob({scale})     -> Promise<Blob>
 *   el.toDataURL({scale})  -> Promise<string>
 *   el.download(filename)  -> Promise<void>
 *
 * Events
 *   tearline:stage   detail: { stage, index, of }
 *
 *     Fired as an export moves through its four real steps. They are not a
 *     progress bar's worth of invented percentages — they are the four things
 *     the code actually does, and the third is where the time and the failures
 *     both live:
 *
 *       flatten    clone the shadow tree and inline the slotted light DOM
 *       serialise  XMLSerializer -> an SVG <foreignObject>
 *       rasterise  decode that SVG in an <img>   <- slow, and the one that fails
 *       encode     canvas -> PNG blob
 *
 *     An export with nothing to report would not need this. This one does: on a
 *     long receipt `rasterise` is most of the wait, and when it throws, the
 *     stage is the difference between "export failed" and "the browser could not
 *     decode the receipt as an image".
 *
 * Export note: rendering to an image uses SVG <foreignObject>, which cannot
 * reach across the network. Any <img> inside the receipt must be a data: URI
 * or the export will drop it. Text and CSS are inlined automatically.
 */

const PAPER_CSS = `
  :host {
    display: inline-block;
    /* the knobs worth exposing — everything else is internal */
    --paper: #f6f3ec;
    --ink: #2b2724;
    --ink-strong: #1a1715;
    --ink-faded: #6a635c;
    --font: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  }
  :host([hidden]) { display: none; }

  .wrap {
    position: relative;
    filter:
      drop-shadow(0 1px 1px rgba(0,0,0,.28))
      drop-shadow(0 18px 34px rgba(0,0,0,.42));
    transform: rotate(var(--tilt, -1.15deg));
  }
  :host([flat]) .wrap { filter: none; transform: none; }

  .paper {
    position: relative;
    width: var(--w, 330px);
    padding: 34px 26px 30px;
    color: var(--ink);
    background-color: var(--paper);
    /* the slight warm falloff of curling paper, plus a soft vertical crease */
    background-image:
      linear-gradient(90deg,
        rgba(0,0,0,.070) 0%,
        rgba(0,0,0,.014) 5%,
        rgba(255,255,255,.55) 16%,
        rgba(255,255,255,.16) 46%,
        rgba(0,0,0,.020) 62%,
        rgba(255,255,255,.34) 80%,
        rgba(0,0,0,.075) 100%);
    font-family: var(--font);
    font-size: 11.5px;
    line-height: 1.62;
    letter-spacing: .04em;
    text-shadow: 0 0 .55px rgba(43,39,36,.62);
  }

  /* paper fibre */
  .paper::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: .34;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .body { position: relative; z-index: 1; }

  /* ---- what slotted content inherits ----
     Deliberately opinionated: authors wrap ordinary HTML and it should come
     out looking like a receipt without them restyling anything. All of it is
     overridable from the light DOM because slotted rules lose to author rules. */
  ::slotted(h1), ::slotted(h2) {
    margin: 0 0 3px;
    text-align: center;
    color: var(--ink-strong);
    font-weight: 700;
    letter-spacing: .20em;
    text-transform: uppercase;
  }
  ::slotted(h1) { font-size: 20px; }
  ::slotted(h2) { font-size: 15px; letter-spacing: .12em; }
  /* ⛔ A RECEIPT EMBEDDED IN A PAGE CANNOT OWN THAT PAGE'S <h1>.
     Standalone — the receipt IS the document — `<h1>` is the shop name and gets the 20px
     treatment above. Embedded in a page that already has a heading, the same line has to start
     one level down or the document ends up with several level-one headings, which is what this
     site's own landing did: its hero h1 plus the demo receipt in the hero plus the one in the
     playground, three painted at once (landing-craft-check single-h1, product-seo).
     `data-title` says "this is the receipt's title, whatever its level" and takes the h1
     treatment verbatim, so an embedded demo renders pixel-identically to a standalone one and
     the outline is still correct. */
  ::slotted(h2[data-title]) { font-size: 20px; letter-spacing: .20em; }
  ::slotted(p)  { margin: 0 0 10px; }
  ::slotted(small) { color: var(--ink-faded); font-size: 9.5px; }
  ::slotted(hr) {
    border: 0;
    border-top: 1px dashed rgba(40,36,33,.42);
    margin: 13px 0;
  }
  ::slotted(table) { width: 100%; border-collapse: collapse; }
  ::slotted(ul), ::slotted(ol) { margin: 0 0 10px; padding-left: 1.2em; }
  ::slotted(strong) { color: var(--ink-strong); }

  /* ---- barcode ---- */
  .barcode {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1.5px;
    height: 52px;
    margin: 20px 0 7px;
  }
  .barcode i { display: block; height: 100%; background: #24211e; opacity: .88; }
  .barcode-no {
    margin: 0;
    text-align: center;
    font-size: 10px;
    letter-spacing: .34em;
    text-indent: .34em;
  }

  /* ---- print-out reveal ----
     The reveal runs on .wrap, NOT on .paper, and that is the whole point.

     .paper carries the torn edge as an inline clip-path computed from the seed.
     An animation with a "both" fill keeps its final keyframe applied for the
     life of the element, and animation values beat inline styles in the
     cascade — so animating clip-path on .paper left inset(0 0 0 0) sitting on
     top of the tear permanently. Every receipt with the animate attribute
     rendered as a plain rectangle, and it looked like the tear had never been
     drawn at all.

     (This block is inside a JS template literal. A backtick here ends the
     string and the whole file stops parsing — which is how it failed once.)

     Two clip-paths cannot share one element. The wrapper does the feeding, the
     paper keeps its edge. */
  @media (prefers-reduced-motion: no-preference) {
    :host([animate]) .wrap { animation: feed var(--dur, 1.1s) steps(24, end) both; }
  }
  @keyframes feed {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
`;

/* Deterministic PRNG — the same seed must always produce the same tear and the
 * same barcode, otherwise a receipt would look different every time it renders
 * and exports would not match what the user saw. */
function rng(seed) {
  let s = (seed | 0) || 1;
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

/* A receipt ripped off a printer is mostly straight with small ragged nicks —
 * not a decorative zigzag. Keep variation tight and let the occasional deeper
 * nick sell the tear. */
function tearPath(rand, steps = 58) {
  const top = [], bottom = [];
  for (let i = 0; i <= steps; i++) {
    const x = ((i / steps) * 100).toFixed(2);
    const nickT = rand() < 0.16 ? rand() * 5 : 0;
    const nickB = rand() < 0.16 ? rand() * 5 : 0;
    top.push(`${x}% ${(rand() * 3.4 + nickT).toFixed(2)}px`);
    bottom.push(`${x}% calc(100% - ${(rand() * 3.4 + nickB).toFixed(2)}px)`);
  }
  return `polygon(${top.join(',')},${bottom.reverse().join(',')})`;
}

/* Not a real Code-128 — it is decorative, and pretending otherwise would invite
 * someone to scan it and file a bug. Varying the bar widths is what stops it
 * reading as a row of identical stripes, which is the only thing that matters. */
function barcodeBars(rand, count = 46) {
  let html = '';
  for (let i = 0; i < count; i++) {
    const w = [1, 1, 1.5, 2, 3][Math.floor(rand() * 5)];
    const short = rand() < 0.12;
    html += `<i style="width:${w}px${short ? ';height:86%' : ''}"></i>`;
  }
  return html;
}

class TearLine extends HTMLElement {
  static observedAttributes = ['width', 'seed', 'barcode', 'tilt'];

  #root;
  #paper;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = PAPER_CSS;
    this.#root.append(style);
    this.#root.append(this.#render());
  }

  #render() {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    const paper = document.createElement('div');
    paper.className = 'paper';
    paper.innerHTML = `<div class="body"><slot></slot></div>`;
    wrap.append(paper);
    this.#paper = paper;
    return wrap;
  }

  connectedCallback() { this.#paint(); }
  attributeChangedCallback() { if (this.#paper) this.#paint(); }

  #paint() {
    const seed = Number(this.getAttribute('seed')) || 1;
    const rand = rng(seed);

    this.#paper.style.setProperty('--w', `${Number(this.getAttribute('width')) || 330}px`);
    if (this.hasAttribute('tilt')) {
      this.#paper.parentElement.style.setProperty('--tilt', `${this.getAttribute('tilt')}deg`);
    }
    this.#paper.style.clipPath = tearPath(rand);
    // The host page fades in on [data-ready]. Set on the next frame, after the
    // paper, the tear and the barcode are all in place — setting it here would
    // announce "ready" one layout too early and animate a half-drawn receipt.
    if (!this.hasAttribute('data-ready')) {
      requestAnimationFrame(() => this.setAttribute('data-ready', ''));
    }

    // barcode is rebuilt from the same stream, so it moves with the seed too
    this.#paper.querySelector('.barcode')?.remove();
    this.#paper.querySelector('.barcode-no')?.remove();
    const code = this.getAttribute('barcode');
    if (code) {
      const bars = document.createElement('div');
      bars.className = 'barcode';
      bars.innerHTML = barcodeBars(rand);
      const no = document.createElement('p');
      no.className = 'barcode-no';
      no.textContent = code;
      this.#paper.append(bars, no);
    }
  }

  /* ---- export ----------------------------------------------------------
   * Serialise the rendered receipt into an SVG <foreignObject> and paint that
   * onto a canvas. No dependency, but it is a sandbox: the SVG cannot fetch
   * anything, so styles are inlined and remote images will not survive. */

  /* The four steps an export actually takes, announced as they start. See the
   * `tearline:stage` note in the header for why these four and not a percentage. */
  #stage(stage, index) {
    this.dispatchEvent(new CustomEvent('tearline:stage', {
      detail: { stage, index, of: 4 },
    }));
  }

  async #toCanvas({ scale = 2, padding = 44 } = {}) {
    this.#stage('flatten', 1);
    const wrap = this.#root.querySelector('.wrap');
    const rect = wrap.getBoundingClientRect();
    // getBoundingClientRect already accounts for the tilt, but the drop shadow
    // spreads past it — pad so the export isn't clipped through the shadow.
    const w = Math.ceil(rect.width) + padding * 2;
    const h = Math.ceil(rect.height) + padding * 2;

    const clone = wrap.cloneNode(true);
    // Slots do not clone their assigned nodes — inline the real light DOM.
    const slot = clone.querySelector('slot');
    if (slot) {
      const frag = document.createDocumentFragment();
      for (const node of this.childNodes) frag.append(node.cloneNode(true));
      slot.replaceWith(frag);
    }
    /* ⛔ HOST ATTRIBUTES DO NOT SURVIVE THE CLONE, SO THEY ARE COPIED ONTO IT AS CLASSES.
     *
     * `wrap` lives in the shadow root; the `flat` and `animate` attributes live on the HOST. The
     * clone is of `wrap`, so it carried neither, and the rewritten `:host([flat])` rules below had
     * nothing to match even once they were spelled correctly. That is why `flat` worked perfectly
     * on screen and was silently ignored in every export.
     *
     * MEASURED 2026-08-13 in headless Chromium against the shipped file: on screen a `flat`
     * element computes `transform: "none"` and `filter: "none"`; in the exported PNG of that same
     * element the paper's top edge sat at y = 50, 49, 48, 45, 43 across x = 60…380 — a 7px rise
     * over 320px, about -1.25°, the default tilt still baked in — alongside 47,741 semi-transparent
     * drop-shadow pixels that `flat` had removed from the screen. */
    if (this.hasAttribute('flat')) clone.classList.add('flat');
    if (this.hasAttribute('animate')) clone.classList.add('animate');

    /* The reveal animation must not be captured mid-flight — and it runs on `.wrap`, which IS the
     * clone, not on `.paper`. Setting it on `.paper` (which this did) killed an animation that was
     * never there; see the `animate` rule in PAPER_CSS, whose selector is `:host([animate]) .wrap`.
     * Harmless until today only because the rewritten selector could not match either. */
    clone.style.setProperty('animation', 'none');

    /* Shadow DOM selectors have no meaning once the markup is flattened into the SVG, so rewrite
     * them against the classes that survive the clone.
     *
     * ⛔ THE ` .wrap` MUST BE CONSUMED BY THE MATCH. These two were
     * `.replace(/:host\(\[flat\]\)/g, '.wrap.flat')`, which turned `:host([flat]) .wrap` into
     * `.wrap.flat .wrap` — a DESCENDANT selector asking for a `.wrap` nested inside a `.wrap.flat`.
     * There is exactly one `.wrap`, so it could never match, and `flat`'s whole rule
     * (`filter: none; transform: none`) was dropped from every export.
     *
     * The `\s*\.wrap` in the pattern is the fix: the rule becomes `.wrap.flat`, one element,
     * which is what the clone now is. The docs' own tight-crop recipe — `flat` plus `padding: 0` —
     * produced a 382x153 PNG with the paper sloping from y=6 to y=1 across the frame, 89 opaque
     * pixels against the right border and 61 against the bottom: a receipt rendered rotated inside
     * an unrotated box, and clipped on two edges. */
    const css = PAPER_CSS
      .replace(/:host\(\[flat\]\)\s*\.wrap/g, '.wrap.flat')
      .replace(/:host\(\[animate\]\)\s*\.wrap/g, '.wrap.animate')
      .replace(/:host\(\[flat\]\)/g, '.wrap.flat')
      .replace(/:host\(\[animate\]\)/g, '.wrap.animate')
      .replace(/:host\(\[hidden\]\)/g, '.wrap[hidden]')
      .replace(/:host/g, '.wrap')
      .replace(/::slotted\(([^)]+)\)/g, '.paper $1');

    const host = document.createElement('div');
    host.setAttribute('style',
      `width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center`);
    const style = document.createElement('style');
    style.textContent = css;
    host.append(style, clone);

    /* A foreignObject is parsed as STRICT XML, not HTML. innerHTML/outerHTML
     * emit HTML — `<hr>`, `<br>`, unquoted attributes — all of which are fatal
     * parse errors inside SVG, and a receipt is mostly <hr>. XMLSerializer is
     * the only serialiser that self-closes void elements and namespaces the
     * output correctly, so the export silently died without it. */
    this.#stage('serialise', 2);
    const xhtml = new XMLSerializer().serializeToString(host);

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<foreignObject x="0" y="0" width="${w}" height="${h}">${xhtml}</foreignObject></svg>`;

    this.#stage('rasterise', 3);
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error('tearline: could not rasterise — an <img> inside the receipt must be a data: URI, remote images cannot be reached from the export sandbox'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });

    this.#stage('encode', 4);
    const canvas = document.createElement('canvas');
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    return canvas;
  }

  async toBlob(opts) {
    const canvas = await this.#toCanvas(opts);
    /* ⛔ `toBlob` HANDS BACK null WHEN THE CANVAS EXCEEDS THE BROWSER'S LIMIT, and this used to
     * resolve that null straight to the caller. `toDataURL` inherits the same canvas, and
     * `download` then did `URL.createObjectURL(null)` — so the one failure the docs promise to
     * name by name surfaced as `TypeError: Failed to execute 'createObjectURL' on 'URL': Overload
     * resolution failed`, which tells a reader nothing.
     *
     * The site's own playground already worked around it (PlaygroundSection.tsx: `if (!blob) throw
     * new Error("encode: the canvas produced no blob")`), and ExportStage.tsx has the authored
     * sentence for this exact stage. npm consumers got neither. The library owns the failure now,
     * so every entry point — toBlob, toDataURL, download — reports the same thing. */
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) {
      throw new Error(
        'tearline: the receipt rendered but the PNG could not be written — usually a canvas ' +
        'larger than this browser allows. Try a narrower width, or scale 1.',
      );
    }
    return blob;
  }

  async toDataURL(opts) {
    return (await this.#toCanvas(opts)).toDataURL('image/png');
  }

  async download(filename = 'receipt.png', opts) {
    const blob = await this.toBlob(opts);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    /* In the document and removed after, rather than a detached node: a detached anchor's click
     * is ignored outright by Firefox. */
    document.body.append(a);
    a.click();
    a.remove();
    /* ⛔ NOT SYNCHRONOUS. Revoking in the same task as `click()` is the pattern that races the
     * download in Gecko and WebKit — Chromium tolerates it, which is exactly why it survives
     * testing. One task later is enough and costs nothing. */
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

if (!customElements.get('tear-line')) customElements.define('tear-line', TearLine);

export default TearLine;
