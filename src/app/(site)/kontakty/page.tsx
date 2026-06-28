import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contacts/ContactForm";
import { getSiteSettings } from "@/lib/site-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Контакти — Паломницький центр «Херувим»",
  description:
    "Зв'яжіться з паломницьким центром «Херувим» у Львові: телефони, email, адреса офісу та форма заявки.",
};

const cardClass = "rounded-card border border-line bg-white p-6";
const iconPlaque = "grid h-12 w-12 shrink-0 place-items-center rounded-[13px] bg-chip text-gold";
const cardLabel = "mb-1.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-gold-dark";
const stripUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.014 1.792-4.677 4.533-4.677 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.955.93-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

export default async function ContactsPage() {
  const s = await getSiteSettings();

  return (
    <>
      <section>
        <Container className="pb-2 pt-12 lg:pt-[50px]">
          <Badge>{s.tagline}</Badge>
          <h1 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink md:text-[36px] lg:text-[44px]">
            Зв'яжіться з нами
          </h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-text2">
            Зателефонуйте, напишіть або завітайте до нашого офісу у центрі Львова. Радо допоможемо
            обрати паломництво та підготуватися до дороги.
          </p>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 pb-16 pt-9 lg:grid-cols-[1fr_460px] lg:items-start lg:gap-11">
          {/* Контактні картки + карта */}
          <div>
            <div className="grid gap-4">
              {/* Телефони */}
              <div className={`${cardClass} flex items-start gap-4`}>
                <div className={iconPlaque}>
                  <Phone size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={cardLabel}>Телефони</div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    {s.phones.map((p, i) => (
                      <span key={p.tel} className="flex items-center gap-2.5">
                        {i > 0 && <span className="text-field">·</span>}
                        <a href={`tel:${p.tel}`} className="text-[18px] font-extrabold text-ink transition-colors hover:text-gold">
                          {p.display}
                        </a>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-[13px] text-muted">
                    Дзвоніть — відповімо на всі питання про тури й бронювання.
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={`${cardClass} flex items-center gap-4`}>
                <div className={iconPlaque}>
                  <Mail size={21} />
                </div>
                <div className="min-w-0">
                  <div className={cardLabel}>Email</div>
                  <a
                    href={`mailto:${s.email}`}
                    className="break-words text-[16px] font-bold text-ink transition-colors hover:text-gold"
                  >
                    {s.email}
                  </a>
                </div>
              </div>

              {/* Адреса */}
              <div className={`${cardClass} flex items-center gap-4`}>
                <div className={iconPlaque}>
                  <MapPin size={21} />
                </div>
                <div>
                  <div className={cardLabel}>Адреса офісу</div>
                  <div className="text-[16px] font-bold text-ink">{s.address}</div>
                </div>
              </div>

              {/* Facebook */}
              <SocialCard
                icon={<FacebookIcon />}
                label="Facebook"
                value={stripUrl(s.social.facebook)}
                href={s.social.facebook}
              />

              {/* Instagram */}
              <SocialCard
                icon={<InstagramIcon />}
                label="Instagram"
                value={stripUrl(s.social.instagram)}
                href={s.social.instagram}
              />
            </div>

            {/* Карта */}
            <div className="mt-4 overflow-hidden rounded-[18px] border border-line">
              <iframe
                title="Карта — офіс у центрі Львова"
                src="https://www.openstreetmap.org/export/embed.html?bbox=24.026%2C49.838%2C24.038%2C49.845&layer=mapnik&marker=49.8415%2C24.0316"
                className="block h-[300px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Форма */}
          <ContactForm />
        </Container>
      </section>
    </>
  );
}

function SocialCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className={`${cardClass} flex items-center justify-between gap-5`}>
      <div className="flex min-w-0 items-center gap-4">
        <div className={iconPlaque}>{icon}</div>
        <div className="min-w-0">
          <div className={cardLabel}>{label}</div>
          <div className="truncate text-[15.5px] font-bold text-ink">{value}</div>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-ink px-[22px] py-[11px] text-[13.5px] font-bold text-ink transition-colors hover:bg-ink hover:text-ivory"
      >
        Перейти →
      </a>
    </div>
  );
}
