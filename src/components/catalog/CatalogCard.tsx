import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CatalogTour } from "@/lib/catalog";

const placeholderStyle = {
  background:
    "repeating-linear-gradient(135deg,#e7ddc6,#e7ddc6 11px,#f1e9d6 11px,#f1e9d6 22px)",
};

export function CatalogCard({ tour }: { tour: CatalogTour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-raised"
    >
      <div className="relative h-[170px]">
        {tour.coverImage ? (
          <Image
            src={tour.coverImage}
            alt={tour.title}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 380px"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" style={placeholderStyle} />
        )}
        {tour.durationLabel && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-[5px] text-[11px] font-bold",
              tour.durationHighlight ? "bg-gold text-white" : "bg-white text-gold-dark",
            )}
          >
            {tour.durationLabel}
          </span>
        )}
        {tour.category && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-[5px] text-[11px] font-bold text-chip">
            {tour.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-[18px]">
        <div className="mb-1.5 text-xs font-bold text-gold-dark">
          {tour.dateLabel ?? "Дати уточнюються"}
        </div>
        <h3 className="mb-4 text-[17px] font-bold leading-snug text-ink">{tour.title}</h3>
        <div className="mt-auto flex items-center justify-between">
          {tour.isPriced ? (
            <span className="text-[21px] font-extrabold text-ink">{tour.priceLabel}</span>
          ) : (
            <span className="text-[15px] font-bold text-gold-dark">{tour.priceLabel}</span>
          )}
          <span className="rounded-full bg-chip px-4 py-2.5 text-[13px] font-bold text-gold-dark transition-colors group-hover:bg-gold group-hover:text-white">
            Детальніше
          </span>
        </div>
      </div>
    </Link>
  );
}
