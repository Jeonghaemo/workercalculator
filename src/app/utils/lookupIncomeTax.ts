import incomeTaxTable from "../data/incomeTaxTable.json";

export function lookupIncomeTax(taxable: number, familyCount: number): number {
  const maxKey = 10200000;
  const rounded = Math.min(Math.floor(taxable / 10000) * 10000, maxKey);
  const row = incomeTaxTable[rounded.toString()];

  if (!row) {
    if (taxable > maxKey) {
      const estTax = Math.round(taxable * 0.06); // 고정 비율 예시
      console.warn("⛔ 고소득자 fallback 적용:", taxable, "→", estTax);
      return estTax;
    }
    return 0;
  }

  const familyKey = Math.min(familyCount, 10).toString();
  return Number(row[familyKey] ?? 0);
}