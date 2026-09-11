/* TEARLINE IS FREE AND MIT-LICENSED. There is nothing to buy, the landing declares no pricing
 * band, and the register's PriceTiers is never rendered; the adapter exists because the register
 * resolves this module for every product. A button that reached it would land on the docs. */
export function tierHref(_tier: { badge?: string; price: string }): string {
  return "/docs";
}
