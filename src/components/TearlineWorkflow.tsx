import WorkflowDiagram, { type WorkflowNode, type WorkflowEdge } from "@compound/landing/pieces/WorkflowDiagram";
import PhosphorIcon from "@compound/landing/pieces/PhosphorIcon";
import { STAGES } from "@/lib/export-stages";

/* Product-owned topology, read off public/tearline.js, the one file the product is. The element
 * renders whatever it wraps as a receipt: the paper is CSS around the light DOM, and the torn
 * edge and the barcode are generated from the seed, so the same seed is the same paper. An
 * export runs the four steps in src/lib/export-stages.ts, the same list the playground's panel
 * marks as `tearline:stage` events arrive. Two of them stop: rasterise throws when an <img>
 * inside the receipt is not a data: URI, because the SVG foreignObject sandbox cannot reach the
 * network, and encode reports the canvas exceeding the browser's limit rather than resolving a
 * null blob. Wrapping the markup and calling the export are the reader's own steps. */
const stage = (key: (typeof STAGES)[number]["key"]) => STAGES.find((s) => s.key === key)!;

const nodes: WorkflowNode[] = [
  { id: "wrap", label: "01 / Your markup", title: "Wrap it in <tear-line>", body: "Headings, rules, tables, lists, images: markup you already know how to write, in the light DOM, where it stays selectable, searchable and read in document order.", position: [0, 0], order: 0, kind: "human" },
  { id: "paper", label: "02 / The paper", title: "CSS around your content", body: "The receipt is styling wrapped around the markup rather than a picture of it. The torn edge and the barcode are generated from the seed, so the same seed renders the same paper every time.", position: [1, 0], order: 1 },
  { id: "flatten", label: "03 / Export", title: stage("flatten").label, body: `download(), toBlob() or toDataURL(): ${stage("flatten").what}.`, position: [2, 0], order: 2, kind: "human" },
  { id: "serialise", label: "04 / Serialise", title: stage("serialise").label, body: `${stage("serialise").what}. An unclosed tag stops it here.`, position: [3, 0], order: 3 },
  { id: "rasterise", label: "05 / Rasterise", title: stage("rasterise").label, body: `${stage("rasterise").what}: on a long receipt this step is most of the wait.`, position: [3, 1], order: 4 },
  { id: "remote", label: "Remote image", title: "The export throws", body: "An <img> inside the receipt must be a data: URI. The sandbox cannot reach the network, so the export refuses rather than handing back a receipt with a hole in it.", position: [2, 1], order: 5, kind: "stop" },
  { id: "encode", label: "06 / Encode", title: stage("encode").label, body: `${stage("encode").what}. The playground shows the real pixel size and weight of the file it wrote.`, position: [3, 2], order: 6 },
  { id: "toolarge", label: "Canvas too large", title: "Reported, not a null blob", body: "When the canvas exceeds the browser's limit every entry point reports the same thing. Try a narrower width, or scale 1.", position: [2, 2], order: 7, kind: "stop" },
];
const edges: WorkflowEdge[] = [
  { id: "wrap-paper", from: "wrap", to: "paper", ports: ["right", "left"] },
  { id: "paper-flatten", from: "paper", to: "flatten", ports: ["right", "left"] },
  { id: "flatten-serialise", from: "flatten", to: "serialise", ports: ["right", "left"] },
  { id: "serialise-rasterise", from: "serialise", to: "rasterise", ports: ["bottom", "top"] },
  { id: "rasterise-remote", from: "rasterise", to: "remote", ports: ["left", "right"], label: "Remote", branch: true },
  { id: "rasterise-encode", from: "rasterise", to: "encode", ports: ["bottom", "top"] },
  { id: "encode-toolarge", from: "encode", to: "toolarge", ports: ["left", "right"], label: "Limit", branch: true },
];
const brief: Record<string, string> = {
  wrap: "Any markup, in the light DOM.",
  paper: "CSS, not a picture; seeded tear and barcode.",
  flatten: "download(), toBlob() or toDataURL().",
  serialise: "SVG foreignObject, strict XML.",
  rasterise: "Decoded in an img; most of the wait.",
  remote: "An <img> must be a data: URI.",
  encode: "Canvas to PNG; real size and weight shown.",
  toolarge: "Reported; try a narrower width.",
};
const icons = { wrap: "user-check", paper: "receipt", flatten: "arrow-right", serialise: "cube", rasterise: "flask", remote: "hand-palm", encode: "checks", toolarge: "x" } as const;

export default function TearlineWorkflow({ compact = false, showIcons = false }: { compact?: boolean; showIcons?: boolean }) {
  return (
    <WorkflowDiagram
      compact={compact}
      title="How markup becomes a receipt, and a receipt becomes a PNG."
      description="One tag around your HTML, paper drawn in CSS, and an export that runs four real steps in the browser with nothing sent anywhere."
      nodes={nodes.map((node) => ({ ...node, body: compact ? brief[node.id] : node.body, icon: showIcons ? <PhosphorIcon name={icons[node.id as keyof typeof icons]} size={20} /> : undefined }))}
      edges={edges}
      note={"The barcode is decorative: it carries no text alternative because there is nothing to announce, and it does not scan."}
    />
  );
}
