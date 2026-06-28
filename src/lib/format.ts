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

/** Числовий діапазон дат, напр. «30.08 – 05.09». */
export function formatNumericRange(start?: string, end?: string): string {
  if (!start) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const s = new Date(start);
  const sd = `${pad(s.getUTCDate())}.${pad(s.getUTCMonth() + 1)}`;
  if (!end) return sd;
  const e = new Date(end);
  return `${sd} – ${pad(e.getUTCDate())}.${pad(e.getUTCMonth() + 1)}`;
}
