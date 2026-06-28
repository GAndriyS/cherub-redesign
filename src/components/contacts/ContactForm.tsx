"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-field bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted2 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-[12.5px] font-bold text-text2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      tour: String(fd.get("tour") ?? ""),
      message: String(fd.get("message") ?? ""),
      source: "contacts-page",
      company: String(fd.get("company") ?? ""),
    };
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Сталася помилка. Спробуйте ще раз.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Немає зв'язку. Перевірте інтернет і спробуйте ще раз.");
    }
  }

  return (
    <div className="rounded-[20px] border border-line bg-white p-[30px] shadow-raised">
      <h2 className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">Залишити заявку</h2>

      {status === "success" ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-ok/15 text-ok">
            <Check size={28} />
          </div>
          <p className="text-[17px] font-bold text-ink">Дякуємо! Заявку прийнято.</p>
          <p className="mx-auto mt-2 max-w-[320px] text-sm leading-relaxed text-text2">
            Ми зателефонуємо найближчим часом, щоб допомогти обрати паломництво.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-5 mt-1.5 text-sm leading-relaxed text-text2">
            Заповніть форму — і ми передзвонимо, допоможемо обрати паломництво та підготуватися до
            поїздки.
          </p>
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <label htmlFor="c-name" className={labelClass}>
                Ваше ім'я
              </label>
              <input id="c-name" name="name" required placeholder="Напр. Марія" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-phone" className={labelClass}>
                Телефон
              </label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                required
                defaultValue="+380"
                inputMode="tel"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-tour" className={labelClass}>
                Яке паломництво цікавить?
              </label>
              <input
                id="c-tour"
                name="tour"
                placeholder="Напр. Меджугор'є, серпень"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-message" className={labelClass}>
                Повідомлення
              </label>
              <textarea
                id="c-message"
                name="message"
                rows={4}
                placeholder="Ваше питання…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl bg-no/10 px-3.5 py-2.5 text-[13px] font-medium text-no">{error}</p>
            )}

            <Button type="submit" variant="dark" className="mt-1 w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Надсилаємо…" : "Надіслати заявку"}
            </Button>
            <p className="text-center text-[12px] leading-snug text-muted2">
              Натискаючи кнопку, ви погоджуєтесь на обробку даних для зворотного зв'язку.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
