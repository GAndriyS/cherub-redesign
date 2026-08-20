"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { pageNameFromPath } from "@/lib/page-name";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-field bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted2 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

export function BookingForm({
  tourTitle,
  tourDates,
  tourSlug,
}: {
  tourTitle: string;
  tourDates?: string;
  tourSlug?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const pathname = usePathname();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      tour: tourTitle,
      tourDates: tourDates ?? "",
      tourSlug: tourSlug ?? "",
      message: "Бронювання місця",
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
      setError("Немає зв'язку. Спробуйте ще раз.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-ok/10 p-4 text-center">
        <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-ok/15 text-ok">
          <Check size={20} />
        </div>
        <p className="text-[15px] font-bold text-ink">Заявку на бронювання прийнято!</p>
        <p className="mt-1 text-[13px] leading-relaxed text-text2">Ми зателефонуємо для підтвердження.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2.5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input name="name" required placeholder="Ваше ім'я" aria-label="Ваше ім'я" className={fieldClass} />
      <input
        name="phone"
        type="tel"
        required
        defaultValue="+380"
        inputMode="tel"
        aria-label="Телефон"
        className={fieldClass}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-xl bg-ink px-4 py-[15px] text-center text-[15px] font-bold text-ivory transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Надсилаємо…" : "Забронювати місце"}
      </button>
      {status === "error" && (
        <p className="rounded-xl bg-no/10 px-3.5 py-2.5 text-[13px] font-medium text-no">{error}</p>
      )}
    </form>
  );
}
