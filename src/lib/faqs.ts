/* The answers, one copy: the landing renders them and the register emits the FAQPage node from
 * the same list, so the structured data cannot describe an answer the page does not show. */
export const FAQS: [string, string][] = [
  [
    "What is Tearline?",
    "One custom element. Wrap any HTML in <tear-line> and it renders as a thermal receipt, torn edge, barcode, receipt type, and exports itself as a PNG. It is not a template language and not an image service; it is styling wrapped around your own markup.",
  ],
  [
    "What is it actually for?",
    "Anything a user might want to keep or post: an order summary, a workout, a year in review, a booking, a set list, a diff. Receipts are shareable in a way that a screenshot of a table is not, which is the whole reason this exists.",
  ],
  [
    "Does the barcode scan?",
    "No, and it does not pretend to. The bars are generated from the seed for looks. If you need a scannable code, render a real one and put it inside the receipt as a data: URI image.",
  ],
  [
    "Will the image match what my user saw?",
    "Yes, as long as you set a seed. The torn edge and the barcode come from it, so the same seed always produces the same paper. Without one you get a new tear on every render, fine for a playground, wrong for an order confirmation.",
  ],
  [
    "Is the receipt accessible?",
    "It is real text in the light DOM, not a canvas and not an image, so it is selectable, searchable, translatable, and read by screen readers in document order. Your headings stay headings and your tables stay tables. The print-out animation is skipped entirely under prefers-reduced-motion.",
  ],
  [
    "Does it work with React, Vue, Svelte?",
    "It is a custom element, so it works anywhere HTML does, including a plain script tag in a static file. React 19 passes unknown attributes through, so the tag needs no wrapper.",
  ],
  [
    "What does it cost?",
    "Nothing. MIT, zero dependencies, one file. There is no account, no key and no server; the export happens in the browser.",
  ],
];
