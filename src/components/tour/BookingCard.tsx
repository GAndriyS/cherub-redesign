import { Cross, Phone } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { formatNumericRange } from "@/lib/format";
import type { SiteSettings } from "@/lib/site";
import type { TourDetail } from "@/lib/tour";

export function BookingCard({ tour, settings }: { tour: TourDetail; settings: SiteSettings }) {
  return (
    <div className="lg:sticky lg:top-[90px]">
      <div className="rounded-[20px] border border-line bg-white p-[26px] shadow-raised">
        {tour.priceEur > 0 ? (
          <div className="mb-[18px] flex items-baseline gap-2">
            <span className="text-[13px] font-semibold text-muted">від</span>
            <span className="text-[34px] font-extrabold text-ink">€{tour.priceEur}</span>
            <span className="text-[14px] font-semibold text-muted">/ особа</span>
          </div>
        ) : (
          <div className="mb-[18px] text-[24px] font-extrabold text-gold-dark">Ціна за запитом</div>
        )}

        <div className="mb-4 flex flex-col gap-2.5">
          {(tour.dateStart || tour.dateEnd) && (
            <div className="flex justify-between border-b border-[#f0eadd] pb-2.5 text-[13.5px] text-text2">
              <span>Дати</span>
              <span className="font-bold text-ink">{formatNumericRange(tour.dateStart, tour.dateEnd)}</span>
            </div>
          )}
          {tour.durationDays ? (
            <div className="flex justify-between text-[13.5px] text-text2">
              <span>Тривалість</span>
              <span className="font-bold text-ink">{tour.durationDays} днів</span>
            </div>
          ) : null}
        </div>

        <BookingForm
          tourTitle={tour.title}
          tourDates={
            tour.dateStart || tour.dateEnd ? formatNumericRange(tour.dateStart, tour.dateEnd) : undefined
          }
          tourSlug={tour.slug}
        />

        <div className="my-3 text-center text-[12.5px] text-muted2">або зв&apos;яжіться напряму</div>
        <div className="flex flex-col gap-2">
          {settings.phones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-field py-3 text-center text-[14.5px] font-bold text-ink transition hover:border-gold hover:text-gold"
            >
              <Phone size={15} className="text-gold-dark" />
              {p.display}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-sand p-[18px]">
        <Cross size={18} className="mt-0.5 flex-none text-gold" />
        <p className="text-[13px] leading-relaxed text-text2">
          Маєте питання про підготовку, документи чи виїзд? Зателефонуйте — радо допоможемо.
        </p>
      </div>
    </div>
  );
}
