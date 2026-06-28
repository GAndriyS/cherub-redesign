const MONTHS_SHORT = [
  "січ",
  "лют",
  "бер",
  "квіт",
  "трав",
  "черв",
  "лип",
  "серп",
  "вер",
  "жовт",
  "лист",
  "груд",
];

/** Форматує діапазон дат українською, напр. «30 серп – 5 вер 2026». */
export function formatRangeUk(start?: string, end?: string): string {
  if (!start) return "";
  const s = new Date(start);
  const sDay = s.getUTCDate();
  const sMon = MONTHS_SHORT[s.getUTCMonth()];
  if (!end) return `${sDay} ${sMon} ${s.getUTCFullYear()}`;

  const e = new Date(end);
  const eDay = e.getUTCDate();
  const eMon = MONTHS_SHORT[e.getUTCMonth()];
  const year = e.getUTCFullYear();

  if (s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear()) {
    return `${sDay} – ${eDay} ${eMon} ${year}`;
  }
  return `${sDay} ${sMon} – ${eDay} ${eMon} ${year}`;
}
