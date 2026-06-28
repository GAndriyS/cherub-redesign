import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/** true, якщо Sanity налаштовано (є projectId). */
export const sanityEnabled = Boolean(projectId && dataset);

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  // false — читаємо з живого API (без ~60с лагу CDN); кешування робить ISR (revalidate).
  useCdn: false,
});
