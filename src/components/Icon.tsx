import PhosphorIcon from "@compound/landing/pieces/PhosphorIcon";

/* THE OLD GLYPH NAMES, mapped onto the register's Phosphor set. The route shims name their icons
 * with these; the register vendors twenty-two Phosphor Regular glyphs and no other family, so a
 * name with a meaningful counterpart draws it and a name without one draws nothing. */
export type IconName =
  | "scope" | "certificate" | "checklist" | "memo" | "sourced" | "intake" | "clock" | "pen"
  | "everything" | "shield" | "caps" | "calendar" | "refresh" | "folder" | "mail" | "doc"
  | "archive" | "magnifer" | "graph" | "bill" | "wallet" | "buildings" | "bolt" | "medal" | "home"
  | "flag" | "health" | "city" | "github" | "box" | "gavel" | "link" | "card";

const PHOSPHOR: Partial<Record<IconName, string>> = {
  scope: "magnifying-glass",
  certificate: "shield-check",
  checklist: "checks",
  memo: "receipt",
  sourced: "book-open",
  intake: "arrow-right",
  clock: "calendar-check",
  pen: "ruler",
  everything: "checks",
  shield: "shield-check",
  caps: "user-check",
  calendar: "calendar-check",
  refresh: "arrow-counter-clockwise",
  folder: "cube",
  mail: "arrow-right",
  doc: "book-open",
  archive: "cube",
  magnifer: "magnifying-glass",
  graph: "ruler",
  bill: "receipt",
  wallet: "credit-card",
  card: "credit-card",
  buildings: "cube",
  bolt: "check",
  medal: "shield-check",
  home: "cube",
  flag: "hand-palm",
  health: "check",
  city: "cube",
  github: "cube",
  box: "cube",
  gavel: "shield-check",
  link: "arrow-right",
};

export default function Icon({ name, size = 20, className }: { name: IconName; size?: 16 | 20 | 24; className?: string }) {
  const glyph = PHOSPHOR[name];
  if (!glyph) return null;
  return <PhosphorIcon name={glyph as never} size={size} className={className} />;
}
