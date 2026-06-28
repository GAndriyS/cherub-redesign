"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { pageNameFromPath } from "@/lib/page-name";
import type { LeadPrefill } from "./LeadFormProvider";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-field bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted2 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

const labelClass = "mb-1.5 block text-[12.5px] font-bold text-text2";

export function LeadDialog({
  isOpen,
  onClose,
  prefill,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefill: LeadPrefill;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setError("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => nameRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      tour: String(fd.get("tour") ?? ""),
      source: pageNameFromPath(pathname),
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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={prefill.title ?? "Залишити заявку"}
    >
      <div className="w-full max-w-[460px] rounded-t-3xl bg-white p-7 shadow-raised sm:rounded-3xl">
        <div className="mb-1 flex items-start justify-between gap-4">
          <h2 className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">
            {prefill.title ?? "Залишити заявку"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="-mr-1 -mt-1 grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-chip hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-ok/15 text-ok">
              <Check size={28} />
            </div>
            <p className="text-[17px] font-bold text-ink">Дякуємо! Заявку прийнято.</p>
            <p className="mx-auto mt-2 max-w-[320px] text-sm leading-relaxed text-text2">
              Ми зателефонуємо найближчим часом, щоб допомогти обрати паломництво.
            </p>
            <Button variant="dark" className="mt-6 w-full" onClick={onClose}>
              Закрити
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <p className="mb-5 text-sm leading-relaxed text-text2">
              Заповніть форму — і ми передзвонимо, допоможемо обрати паломництво та підготуватися до
              поїздки.
            </p>

            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-3.5">
              <div>
                <label htmlFor="lead-name" className={labelClass}>
                  Ваше ім'я
                </label>
                <input
                  id="lead-name"
                  ref={nameRef}
                  name="name"
                  required
                  placeholder="Напр. Марія"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className={labelClass}>
                  Телефон
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  required
                  defaultValue="+380"
                  inputMode="tel"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lead-tour" className={labelClass}>
                  Яке паломництво цікавить?
                </label>
                <input
                  id="lead-tour"
                  name="tour"
                  defaultValue={prefill.tour ?? ""}
                  placeholder="Напр. Меджугор'є, серпень"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lead-message" className={labelClass}>
                  Повідомлення
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  placeholder="Ваше питання…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="rounded-xl bg-no/10 px-3.5 py-2.5 text-[13px] font-medium text-no">
                  {error}
                </p>
              )}

              <Button type="submit" variant="dark" className="mt-1 w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Надсилаємо…" : "Надіслати заявку"}
              </Button>
              <p className="mt-1 text-center text-[12px] leading-snug text-muted2">
                Натискаючи кнопку, ви погоджуєтесь на обробку даних для зворотного зв'язку.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
