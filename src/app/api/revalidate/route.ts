import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation: Sanity-webhook смикає цей роут при зміні контенту,
 * і ми перегенеровуємо лише зачеплені сторінки — замість того, щоб ISR
 * переписував увесь сайт щохвилини (ліміт ISR Writes на Hobby-плані).
 *
 * Webhook у sanity.io/manage → API → Webhooks:
 *   URL:        https://heruvym.com.ua/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Filter:     _type in ["tour", "homePage", "siteSettings"]
 *   Projection: {_type, "slug": slug.current}
 */

type WebhookPayload = { _type?: string; slug?: string };

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  let payload: WebhookPayload = {};
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    // порожнє тіло — перегенеруємо основні сторінки нижче
  }

  const { _type, slug } = payload;

  // Налаштування сайту живуть у layout (шапка/футер/телефони) — оновлюємо все дерево
  if (_type === "siteSettings") {
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, revalidated: ["layout"] });
  }

  const paths = new Set<string>(["/"]);
  if (_type === "tour" || !_type) {
    paths.add("/tours");
    if (slug && /^[a-z0-9-]+$/i.test(slug)) paths.add(`/tours/${slug}`);
  }

  for (const p of paths) revalidatePath(p);
  return NextResponse.json({ ok: true, revalidated: [...paths] });
}
