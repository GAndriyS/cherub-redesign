import { createClient } from "next-sanity";

/** Прибирає випадкові лапки/пробіли навколо значень env (часта помилка при вставці в дашборд хостингу). */
const clean = (v?: string) => v?.trim().replace(/^['"]+|['"]+$/g, "").trim() || undefined;

export const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const dataset = clean(process.env.NEXT_PUBLIC_SANITY_DATASET);

// Валідуємо версію API; за некоректного значення — безпечний запасний варіант (інакше createClient кидає помилку й валить білд).
const rawApiVersion = clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION);
export const apiVersion =
  rawApiVersion && /^(1|v?\d{4}-\d{2}-\d{2})$/.test(rawApiVersion) ? rawApiVersion : "2024-10-01";

/** true, якщо Sanity налаштовано (є projectId і dataset). */
export const sanityEnabled = Boolean(projectId && dataset);

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  // false — читаємо з живого API (без ~60с лагу CDN); кешування робить ISR (revalidate).
  useCdn: false,
});
