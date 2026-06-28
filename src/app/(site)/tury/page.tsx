import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Catalog } from "@/components/catalog/Catalog";
import { LeadButton } from "@/components/lead/LeadButton";
import { getCatalogTours } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Усі паломництва — Паломницький центр «Херувим»",
  description:
    "Каталог паломницьких турів: Меджугор'є, Свята Земля, святині Європи, Грузія, Україна. Фільтр за напрямком, дати та ціни.",
};

const PREFERRED = [
  "Меджугор'є",
  "Свята Земля",
  "Європа",
  "Грузія",
  "Україна",
  "Море + молитва",
];

export default async function CatalogPage() {
  const tours = await getCatalogTours();

  const present = Array.from(new Set(tours.flatMap((t) => t.tags)));
  const ordered = [
    ...PREFERRED.filter((c) => present.includes(c)),
    ...present.filter((c) => !PREFERRED.includes(c)).sort((a, b) => a.localeCompare(b, "uk")),
  ];
  const categories = ["Усі", ...ordered];

  return (
    <>
      <Container className="pb-2 pt-12 lg:pt-[50px]">
        <Badge>Розклад 2026</Badge>
        <h1 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink md:text-[38px] lg:text-[44px]">
          Усі паломництва
        </h1>
        <p className="mt-4 max-w-[600px] text-[17px] leading-[1.7] text-text2">
          Оберіть духовну подорож за напрямком, датами чи тривалістю. Усі тури — зі священиком і
          молитовною програмою. Не знайшли потрібного — зателефонуйте, складемо маршрут під вашу
          групу.
        </p>
      </Container>

      <Catalog tours={tours} categories={categories} />

      <Container className="pb-16 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-sand p-8 md:p-9">
          <div className="min-w-[260px] flex-1">
            <h3 className="text-[22px] font-extrabold text-ink">Не знайшли потрібний напрямок?</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text2">
              Зателефонуйте — складемо паломництво під вашу парафію чи групу й підкажемо найближчі
              дати.
            </p>
          </div>
          <LeadButton variant="dark" prefill={{ source: "catalog-help" }}>
            Залишити заявку
          </LeadButton>
        </div>
      </Container>
    </>
  );
}
