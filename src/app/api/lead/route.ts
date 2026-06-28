import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Вкажіть ім'я"),
  phone: z.string().trim().min(7, "Вкажіть коректний телефон"),
  message: z.string().trim().max(2000).optional().default(""),
  tour: z.string().trim().max(300).optional().default(""),
  source: z.string().trim().max(120).optional().default(""),
  // honeypot — приховане поле, яке заповнюють лише боти
  company: z.string().optional().default(""),
});

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некоректний запит" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Перевірте введені дані";
    return NextResponse.json({ ok: false, error: msg }, { status: 422 });
  }

  const { name, phone, message, tour, source, company } = parsed.data;

  // Бот заповнив honeypot — вдаємо успіх і нічого не надсилаємо
  if (company) return NextResponse.json({ ok: true });

  const text = [
    "🕊 <b>Нова заявка з сайту</b>",
    `👤 <b>Ім'я:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    tour ? `🧭 <b>Напрямок:</b> ${escapeHtml(tour)}` : "",
    message ? `💬 <b>Повідомлення:</b> ${escapeHtml(message)}` : "",
    source ? `📍 <i>Джерело: ${escapeHtml(source)}</i>` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Поки немає токена — не валимо UX: логуємо й повертаємо успіх (delivered:false)
  if (!token || !chatId) {
    console.warn(`[lead] TELEGRAM_* не налаштовано — заявку не надіслано:\n${text}`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[lead] Telegram API error", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "Сервіс тимчасово недоступний. Зателефонуйте, будь ласка." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
