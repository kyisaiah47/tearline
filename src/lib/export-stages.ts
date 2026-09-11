/* THE FOUR REAL STEPS OF AN EXPORT. tearline.js emits `tearline:stage` as it moves through the
 * four things it actually does; they are not invented percentages, and the third is where the
 * time and the failures both live. The playground's panel and the landing's diagram read this
 * one list. */
export type Stage = "flatten" | "serialise" | "rasterise" | "encode";

export const STAGES: { key: Stage; label: string; what: string }[] = [
  { key: "flatten", label: "Flattening the receipt", what: "clone the shadow tree and inline the slotted light DOM" },
  { key: "serialise", label: "Writing it as SVG", what: "XMLSerializer into an SVG foreignObject, parsed as strict XML" },
  { key: "rasterise", label: "Rasterising at 2x", what: "decode that SVG in an img; slow, and the one that fails" },
  { key: "encode", label: "Encoding the PNG", what: "canvas to a PNG blob" },
];
