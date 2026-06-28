"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { buttonClass } from "@/components/ui/Button";
import { pageNameFromPath } from "@/lib/page-name";

type Status = "idle" | "submitting" | "success" | "error";

export function CtaBannerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const pathname = usePathname();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: "Заявка на дзвінок (банер)",
      phone: String(fd.get("phone") ?? ""),
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
        setError(json.error ?? "Помилка. Спробуйте ще раз.");
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
      <p className="text-[15px] font-semibold text-footgold">
        Дякуємо! Ми зателефонуємо найближчим часом.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full md:w-auto">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <input
          name="phone"
          type="tel"
          required
          defaultValue="+380"
          aria-label="Ваш телефон"
          placeholder="Ваш телефон"
          className="w-full rounded-full border border-white/20 bg-white/10 px-[18px] py-3.5 text-sm text-white outline-none transition placeholder:text-[#c9c2b2] focus:border-gold sm:w-[200px]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClass("gold", "whitespace-nowrap", "md")}
        >
          {status === "submitting" ? "Надсилаємо…" : "Передзвоніть мені"}
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-[13px] font-medium text-[#e7b3b3]">{error}</p>}
    </form>
  );
}
