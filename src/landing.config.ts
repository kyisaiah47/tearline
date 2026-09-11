import type { LandingConfig } from "@compound/landing/landing.config.types";
import { PRODUCT } from "@/lib/product";
import { FAQS } from "@/lib/faqs";
import { GITHUB, SCRIPT_SRC } from "@/lib/links";

/* THE LANDING, read off what the product already declares: the description and the about
 * surface are src/lib/product.ts, the answers are src/lib/faqs.ts (the same list the FAQPage
 * node is built from), the install line is the one the docs give, and every other sentence is
 * one the site already carried. There is no pricing band, because there is nothing to buy. */
const LANDING: LandingConfig = {
  slug: PRODUCT.slug,
  name: PRODUCT.name,
  tagline: PRODUCT.blurb,
  domain: PRODUCT.url,
  ogImage: "/og.jpg",
  nav: [
    { label: "Docs", href: "/docs" },
    { label: "Playground", href: "/#playground" },
    { label: "DOM to PNG", href: "/dom-to-png" },
    { label: "Source", href: GITHUB },
  ],
  cta: {
    primary: { label: "Try it", href: "/#playground" },
    secondary: { label: "Read the docs", href: "/docs" },
  },
  hero: {
    banner: "MIT, zero dependencies",
    headlineLead: "Any HTML.",
    headlineAccent: "Printed.",
    headlineTail: "",
    sub: "One custom element renders whatever you wrap in it as a thermal receipt, then hands your users a PNG of it.",
    ticker: ["ONE TAG", "ZERO DEPENDENCIES", "NO BUILD STEP"],
  },
  intro: {
    eyebrow: "One tag",
    paragraphs: [
      "Tearline is one custom element. You load a single ES module, wrap markup you already know how to write, headings, rules, tables, lists, in a <tear-line> tag, and the browser renders it as a receipt. The paper is CSS wrapped around your content rather than a picture of it, so the text stays selectable and the layout stays yours.",
      "The PNG export runs entirely in the browser: no canvas API, no dependency and no server. Nothing you put inside the element is sent anywhere, because there is nowhere for it to be sent to.",
      `The install is a script tag: <script type="module" src="${SCRIPT_SRC}">. It is an ES module served from this origin, so there is no package to add, no bundler to configure and no build step. The custom element registers itself on load and every <tear-line> on the page upgrades in place.`,
    ],
  },
  features: {
    eyebrow: "Features",
    headlineLead: "Paper is a rendering target ",
    headlineTail: "you already know how to write.",
    sub: "No canvas API, no template language, no image service. Markup goes in, paper comes out.",
    tabs: ["Wrap anything", "Hand them a PNG", "Real text, not a canvas", "Same seed, same paper"],
    ticker: "MARKUP IN, PAPER OUT",
    cards: [
      { title: "Wrap anything", body: "Headings, rules, tables, lists, images. If it renders in HTML it prints on paper. You are not learning a receipt DSL.", chip: "<tear-line>" },
      { title: "Hand them a PNG", body: "One call turns the receipt into an image, at any scale, ready to post: toBlob, toDataURL or download.", chip: "toBlob()" },
      { title: "Real text, not a canvas", body: "The paper is styling wrapped around your markup, so everything a browser does with text still works: selectable, searchable, translatable, screen-reader order, headings stay headings, tables stay tables.", chip: "Light DOM" },
      { title: "Same seed, same paper", body: "The torn edge and the barcode are generated from a seed, so a receipt renders identically every time, and the export matches what your user actually saw.", chip: "seed" },
      { title: "Drops in anywhere", body: "It is a custom element. React, Vue, Svelte, Astro, or a script tag in a static file.", chip: "Custom element" },
      { title: "Zero dependencies", body: "No build step, no runtime, no peer deps. One file you can read in an afternoon.", chip: "MIT" },
    ],
  },
  faq: {
    eyebrow: "Questions",
    headline: "Before you install it.",
    sub: "Everything you need to know, in the order people ask.",
    tabs: ["Tearline"],
    contact: {
      title: "Read the docs",
      body: "Every attribute, every method, and how the export works.",
      link: "Open the docs",
      href: "/docs",
    },
    items: FAQS.map(([q, a]) => ({ q, a, tab: "Tearline" })),
  },
  closing: {
    headline: "Wrap something in it.",
    sub: "One tag, zero dependencies, no build step. MIT, free forever.",
  },
  footer: {
    contact: { label: "hello@thecompound.tech", href: "mailto:hello@thecompound.tech" },
    legalEntity: PRODUCT.name,
    badges: [],
  },
};

export function headline() {
  return `${LANDING.hero.headlineLead} ${LANDING.hero.headlineAccent}`.trim();
}

export default LANDING;

export const fig = (f: { figure: string; unit?: string; currency?: string }) =>
  `${f.currency ?? ""}${f.figure}${f.unit ?? ""}`;
