"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { buttonClass } from "@/components/ui/Button";
import { TourCard } from "./TourCard";
import type { TourCard as TourCardType } from "@/lib/types";

export function NearestTours({
  tours,
  filters,
}: {
  tours: TourCardType[];
  filters: string[];
}) {
  const allLabel = filters[0] ?? "Усі";
  const [active, setActive] = useState(allLabel);

  const visible = active === allLabel ? tours : tours.filter((t) => t.tags.includes(active));

  return (
    <section id="palomnyctva" className="scroll-mt-24">
      <Container className="pb-16 pt-8">
        <div className="mb-7 flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[28px] font-extrabold tracking-[-0.01em] text-ink md:text-[31px]">
            Найближчі паломництва
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} type="button" onClick={() => setActive(f)} aria-pressed={active === f}>
                <Chip active={active === f}>{f}</Chip>
              </button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
            {visible.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-text2">
            Незабаром додамо нові паломництва за цим напрямком.
          </p>
        )}

        <div className="mt-9 text-center">
          <Link href="/tury" className={buttonClass("outline", undefined, "sm")}>
            Усі паломництва →
          </Link>
        </div>
      </Container>
    </section>
  );
}
