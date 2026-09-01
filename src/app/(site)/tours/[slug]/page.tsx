import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Check, Clock, Cross, MapPin, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookingCard } from "@/components/tour/BookingCard";
import { getTour, getTourSlugs } from "@/lib/tour";
import { getSiteSettings } from "@/lib/site-data";
import { formatRangeUk } from "@/lib/format";
import { cn } from "@/lib/cn";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: "Тур не знайдено — Херувим" };
  return {
    title: `${tour.title} — Паломницький центр «Херувим»`,
    description: tour.summary?.slice(0, 160),
  };
}

const metaItem = "flex items-center gap-2";

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([getTour(slug), getSiteSettings()]);
  if (!tour) notFound();

  const hasInclusions = tour.included.length > 0 || tour.notIncluded.length > 0;

  return (
    <>
      {/* breadcrumb */}
      <Container className="pt-[22px] text-[13px] font-semibold text-muted2">
        <Link href="/" className="transition-colors hover:text-ink">
          Головна
        </Link>
        <span className="mx-1.5 text-[#cdc4b2]">/</span>
        <Link href="/tours" className="transition-colors hover:text-ink">
          Паломництва
        </Link>
        <span className="mx-1.5 text-[#cdc4b2]">/</span>
        <span className="text-ink">{tour.title}</span>
      </Container>

      {/* header */}
      <Container className="pt-[18px]">
        {tour.tags.length > 0 && (
          <div className="mb-3.5 flex flex-wrap gap-2.5">
            {tour.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-chip px-3.5 py-1.5 text-xs font-bold tracking-[0.04em] text-gold-dark"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.12] tracking-[-0.01em] text-ink md:text-[32px] lg:text-[40px]">
          {tour.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-[14.5px] font-semibold text-text2">
          {tour.durationDays ? (
            <span className={metaItem}>
              <Clock size={16} className="text-gold" /> {tour.durationDays} днів
            </span>
          ) : null}
          {tour.dateStart || tour.dateEnd ? (
            <span className={metaItem}>
              <Calendar size={16} className="text-gold" /> {formatRangeUk(tour.dateStart, tour.dateEnd)}
            </span>
          ) : null}
          {tour.departurePoints.length > 0 ? (
            <span className={metaItem}>
              <MapPin size={16} className="text-gold" /> {tour.departurePoints.join(" · ")}
            </span>
          ) : null}
          {tour.withPriest ? (
            <span className={metaItem}>
              <Cross size={16} className="text-gold" /> Зі священиком
            </span>
          ) : null}
        </div>
      </Container>

      {/* body */}
      <Container className="grid gap-10 pb-16 pt-9 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-11">
        <div>
          {tour.summary && (
            <p className="text-[17px] leading-[1.75] text-text3">{tour.summary}</p>
          )}

          {tour.program.length > 0 && (
            <>
              <h2 className="mb-1 mt-9 text-[22px] font-extrabold tracking-[-0.01em] text-ink md:text-[25px]">
                Програма по днях
              </h2>
              {tour.program.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-5 border-t border-line py-6",
                    i === tour.program.length - 1 && "border-b",
                  )}
                >
                  <div className="flex-none">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-[14px] bg-ink leading-none">
                      <span className="text-[10px] tracking-[0.06em] text-gold">ДЕНЬ</span>
                      <span className="mt-0.5 text-[20px] font-extrabold text-ivory">
                        {day.dayNumber ?? i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    {day.title && (
                      <h4 className="mb-3 mt-1 text-[17px] font-bold text-ink">{day.title}</h4>
                    )}
                    {day.items.length > 0 && (
                      <ul className="ml-5 list-disc text-[14.5px] leading-[1.85] text-text2">
                        {day.items.map((it, j) => (
                          <li key={j}>{it}</li>
                        ))}
                      </ul>
                    )}
                    {day.photos.length > 0 && (
                      <div
                        className={cn(
                          "mt-4 grid gap-3",
                          day.photos.length > 1 ? "sm:grid-cols-2" : "grid-cols-1",
                        )}
                      >
                        {day.photos.map((src, j) => (
                          <Image
                            key={j}
                            src={src}
                            alt={day.title ?? tour.title}
                            width={900}
                            height={560}
                            sizes="(max-width: 980px) 100vw, 360px"
                            className="h-[200px] w-full rounded-[14px] object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {hasInclusions && (
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {tour.included.length > 0 && (
                <div className="rounded-card border border-line bg-white p-[26px]">
                  <h3 className="mb-4 flex items-center gap-2.5 text-[17px] font-extrabold text-ink">
                    <Check size={18} className="text-ok" /> Входить у вартість
                  </h3>
                  <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-text3">
                    {tour.included.map((it, i) => (
                      <span key={i} className="flex gap-2.5">
                        <Check size={16} className="mt-0.5 flex-none text-ok" />
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {tour.notIncluded.length > 0 && (
                <div className="rounded-card border border-line bg-white p-[26px]">
                  <h3 className="mb-4 flex items-center gap-2.5 text-[17px] font-extrabold text-ink">
                    <X size={18} className="text-no" /> Не входить у вартість
                  </h3>
                  <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-text3">
                    {tour.notIncluded.map((it, i) => (
                      <span key={i} className="flex gap-2.5">
                        <X size={16} className="mt-0.5 flex-none text-no" />
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <BookingCard tour={tour} settings={settings} />
      </Container>
    </>
  );
}
