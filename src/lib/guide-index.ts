/* THE DOCS AND THE GUIDES, in one place: the landing's feed links every one of them. The rows
 * are the pages' own titles and descriptions, and every entry resolves. */
export const GUIDE_INDEX = [
  {
    href: "/docs",
    tag: "Docs",
    title: "The full reference",
    desc: "Every attribute, every method, and how the browser-side PNG export works with no dependencies, no canvas API and no server.",
  },
  {
    href: "/dom-to-png",
    tag: "Method",
    title: "DOM to PNG, explained",
    desc: "Serialise the node, paint the SVG, read the PNG back, and the tainted-canvas rule that makes most browser exports come out blank.",
  },
  {
    href: "/receipt-ui",
    tag: "Method",
    title: "Receipt-style UI",
    desc: "How the paper is built out of two tokens: the monospace grid, the tabular figures, the dashed rules, the fibre layer and the clip-path tear, in copyable CSS.",
  },
  {
    href: "/share-image-custom-element",
    tag: "Decision",
    title: "Share images, four ways",
    desc: "The four ways to build a share image, when a server render beats a browser one, and why the tag can ship before the script that defines it.",
  },
  {
    href: "/spotify-receipt-generator",
    tag: "Method",
    title: "Spotify receipt generators",
    desc: "The Receiptify-style case worked end to end: Spotify's top-tracks endpoint, and the five-user cap that stops most of these apps ever shipping.",
  },
  {
    href: "/html2canvas-alternatives",
    tag: "Answer",
    title: "html2canvas alternatives",
    desc: "Its latest release is 1.4.1 from January 2022; the six current packages compared side by side on today's npm figures, including where Tearline is the wrong answer.",
  },
];
