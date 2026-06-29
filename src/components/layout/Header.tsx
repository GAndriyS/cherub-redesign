"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { useLeadForm } from "@/components/lead/LeadFormProvider";
import { cn } from "@/lib/cn";
import type { SiteSettings } from "@/lib/site";

export function Header({ settings }: { settings: SiteSettings }) {
  const { open } = useLeadForm();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Закривати мобільне меню по Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Тінь під шапкою при прокрутці — щоб контент чітко «йшов під» меню
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-line bg-white transition-shadow duration-200",
        scrolled && "shadow-[0_6px_24px_-10px_rgba(26,24,20,0.18)]",
      )}
    >
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label={settings.name}>
          <Image
            src={settings.logoUrl}
            alt={settings.shortName}
            width={150}
            height={150}
            priority
            className="h-[54px] w-[54px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-[14.5px] font-semibold text-text2 lg:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-ink",
                isActive(item.href) && "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => open({ source: "header-cta" })}
              className={buttonClass("gold", undefined, "sm")}
            >
              Залишити заявку
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink transition hover:bg-chip lg:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {settings.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-chip py-3.5 text-base font-semibold text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open({ source: "mobile-menu-cta" });
              }}
              className={buttonClass("gold", "mt-3 w-full", "md")}
            >
              Залишити заявку
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}
