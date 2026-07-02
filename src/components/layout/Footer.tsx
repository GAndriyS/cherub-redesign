import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/lib/site";

const colTitle = "mb-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold";
const linkClass = "text-muted2 transition-colors hover:text-footgold";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-footer text-sm text-muted2">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:justify-between md:gap-10">
        <div className="max-w-[290px]">
          <Image
            src={settings.logoUrl}
            alt={settings.shortName}
            width={150}
            height={150}
            className="h-[60px] w-[60px] rounded-lg"
          />
          <div className="mt-3.5 text-[14.5px] font-bold text-footgold">
            Паломницький центр Херувим · {settings.city}
          </div>
          <p className="mt-2 leading-relaxed text-[#857e6d]">{settings.footerNote}</p>
        </div>

        <div>
          <div className={colTitle}>Меню</div>
          <div className="flex flex-col gap-2">
            {settings.nav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className={colTitle}>Контакти</div>
          <div className="flex flex-col gap-2">
            {settings.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className={linkClass}>
                {p.display}
              </a>
            ))}
            <a href={`mailto:${settings.email}`} className={linkClass}>
              {settings.email}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/[0.08] py-[18px] text-center text-[12.5px] text-[#6b6557]">
        © 2026 Паломницький центр «Херувим». Усі права застережено.
      </div>
    </footer>
  );
}
