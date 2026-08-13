# Tearline

**Any HTML you wrap in this one tag prints out as a thermal receipt.** Then save it as a PNG your users will actually post.

Zero dependencies. No build step. One custom element. MIT.

**[Live playground → tearline.kynth.studio](https://tearline.kynth.studio)**

## Install

```bash
npm i @kynth/tearline
```

```js
import '@kynth/tearline';
```

The package is scoped because npm's registry refuses the bare name `tearline` — its similarity filter reads it as too close to the existing `readline` package. The element is still `<tear-line>`.

Importing the package registers the `<tear-line>` element. There is nothing to configure and nothing to call.

Or skip the install entirely — it is an ES module, so a script tag is a complete install:

```html
<script type="module" src="https://tearline.kynth.studio/tearline.js"></script>
```

## Use it

```html
<tear-line barcode="047320260726">
  <h1>Meridian</h1>
  <hr>
  <p>Cortado &middot; 4.25</p>
</tear-line>
```

## Why

The receipt look gets rebuilt from scratch every time somebody wants it. Receiptify turned one person's Spotify history into a receipt and got used millions of times; the aesthetic has been cloned for years. What npm has is either a driver for a real thermal printer, or a renderer with its own document format: `receiptline` (25,099 downloads/week, Apache-2.0, checked 2026-08-13) does render the look — its `transform()` emits SVG in the browser as well as printer commands — but you write your receipt in ReceiptLine markdown first, and getting a PNG out means puppeteer or sharp.

Tearline takes the HTML you already have. No new markup language, no build step, no server, and the export is a PNG straight from the browser.

This is the look, as one custom element, with a PNG export so the thing your users make is a thing they can post.

## Save it as an image

```js
const el = document.querySelector('tear-line');

await el.download('receipt.png');      // saves it
const blob = await el.toBlob();        // or handle it yourself
const url  = await el.toDataURL();
```

## Attributes

| | default | |
|---|---|---|
| `width` | `330` | Paper width in pixels. |
| `seed` | `1` | Any integer. The same seed always produces the same torn edge and the same barcode, so a receipt looks identical every time it renders — and the export matches what the user saw. |
| `barcode` | — | The digits printed under the bars. Omit for no barcode. Decorative; it is not a scannable Code 128, and it doesn't pretend to be. |
| `tilt` | `-1.15` | Rotation in degrees. |
| `flat` | — | No rotation, no drop shadow. For embedding the receipt inside another layout. |
| `animate` | — | Prints out on first paint, like paper feeding from a till. Skipped under `prefers-reduced-motion`. |

## Methods

| | |
|---|---|
| `toBlob({scale})` | Resolves to a PNG `Blob`. `scale` defaults to `2`. |
| `toDataURL({scale})` | Resolves to a PNG data URL. |
| `download(name, {scale})` | Saves the PNG. |

## Export progress

An export fires a `tearline:stage` event as it enters each of its four real steps, with `detail: { stage, index, of }`:

| | |
|---|---|
| `flatten` | Clone the shadow tree and inline the slotted light DOM. |
| `serialise` | `XMLSerializer` into an SVG `<foreignObject>`. |
| `rasterise` | Decode that SVG in an `<img>`. On a long receipt this is most of the wait, and it is the step that fails. |
| `encode` | Canvas to PNG blob. |

They are the four things the code actually does, not a progress bar's worth of invented percentages. When an export throws, the stage is the difference between "export failed" and "the browser could not decode the receipt as an image".

```js
el.addEventListener('tearline:stage', (e) => {
  const { stage, index, of } = e.detail;   // e.g. 'rasterise', 3, 4
});
```

## Styling

`h1`, `h2`, `hr`, `p`, `small`, `strong`, `table`, `ul` and `ol` are styled for you inside the receipt. Every one of those rules is `::slotted()`, which loses to your own CSS — so restyle anything you like from the outside without fighting specificity.

Paper and ink are custom properties:

```css
tear-line {
  --paper: #f6f3ec;
  --ink: #2b2724;
  --ink-strong: #1a1715;
  --ink-faded: #6a635c;
  --font: ui-monospace, Menlo, monospace;
}
```

## One export caveat, stated plainly

Rendering to an image uses an SVG `<foreignObject>`, which is sandboxed and **cannot fetch anything over the network**. Text and styles are inlined for you automatically. But an `<img>` inside the receipt must be a `data:` URI, or it will be missing from the exported PNG. The export throws with a message saying so rather than silently handing you a receipt with a hole in it.

Separately, drawing cross-origin data onto a canvas without CORS approval taints it, after which `toBlob()`, `toDataURL()` and `captureStream()` throw a `SecurityError`. A blank export and a thrown export are different bugs with different fixes. Both are written up at [tearline.kynth.studio/dom-to-png](https://tearline.kynth.studio/dom-to-png).

## Accessibility

The receipt is **real text in the light DOM** — not a canvas, not an image. It stays selectable, searchable, translatable, and is read by screen readers in document order, because the paper is styling wrapped around your markup rather than a picture of it. Your headings stay headings and your tables stay tables.

The print-out animation is skipped entirely under `prefers-reduced-motion`, and `--ink` / `--paper` are exposed so you can push contrast past the default receipt look where you need to.

## License

MIT © [Kynth Studios](https://kynth.studio)
