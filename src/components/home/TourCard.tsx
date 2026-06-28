import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { TourCard as TourCardType } from "@/lib/types";

export function TourCard({ tour }: { tour: TourCardType }) {
  return (
    <Link
      href={`/tury/${tour.slug}`}
      className="group block overflow-hidden rounded-card bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-raised"
    >
      <div className="relative h-[152px]">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 380px"
          className="object-cover"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-[5px] text-[11px] font-bold",
            tour.badgeVariant === "gold" ? "bg-gold text-white" : "bg-white text-gold-dark",
          )}
        >
          {tour.badge}
        </span>
      </div>
      <div className="px-5 pb-5 pt-[18px]">
        <div className="mb-1.5 text-xs font-bold text-gold-dark">{tour.dateLabel}</div>
        <h3 className="mb-4 text-[17px] font-bold leading-snug text-ink">{tour.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-[21px] font-extrabold text-ink">€{tour.priceEur}</span>
          <span className="rounded-full bg-chip px-4 py-2.5 text-[13px] font-bold text-gold-dark transition-colors group-hover:bg-gold group-hover:text-white">
            Детальніше
          </span>
        </div>
      </div>
    </Link>
  );
}
