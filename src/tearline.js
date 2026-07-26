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

  async #toCanvas({ scale = 2, padding = 44 } = {}) {
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
    // The reveal animation must not be captured mid-flight.
    clone.querySelector('.paper')?.style.setProperty('animation', 'none');

    // Shadow DOM selectors have no meaning once the markup is flattened into
    // the SVG, so rewrite them against the classes that survive the clone.
    const css = PAPER_CSS
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
    const xhtml = new XMLSerializer().serializeToString(host);

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<foreignObject x="0" y="0" width="${w}" height="${h}">${xhtml}</foreignObject></svg>`;

    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error('tearline: could not rasterise — an <img> inside the receipt must be a data: URI, remote images cannot be reached from the export sandbox'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });

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
    return new Promise((res) => canvas.toBlob(res, 'image/png'));
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
    a.click();
    URL.revokeObjectURL(url);
  }
}

if (!customElements.get('tear-line')) customElements.define('tear-line', TearLine);

export default TearLine;
