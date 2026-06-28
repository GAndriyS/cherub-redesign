import { Fragment } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import { LeadButton } from "@/components/lead/LeadButton";
import type { HomeContent } from "@/lib/types";

export function Hero({ data }: { data: HomeContent["hero"] }) {
  return (
    <section>
      <Container className="grid items-center gap-9 pb-12 pt-12 lg:grid-cols-2 lg:gap-[54px] lg:pb-[60px] lg:pt-[72px]">
        <div>
          <Badge>{data.badge}</Badge>
          <h1 className="mt-6 text-[34px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink xs:text-[44px] lg:text-[53px]">
            {data.titleTop}
            <br />
            <span className="font-serif font-semibold italic text-gold">{data.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[450px] text-[17px] leading-[1.7] text-text2">{data.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3.5 xs:flex-row xs:items-center">
            <a href="#palomnyctva" className={buttonClass("dark")}>
              Обрати паломництво
            </a>
            <LeadButton variant="outline" prefill={{ source: "hero" }}>
              Залишити заявку
            </LeadButton>
          </div>

          <div className="mt-10 flex items-center gap-7">
            {data.stats.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="h-9 w-px bg-[#e8e1d2]" />}
                <div>
                  <div className="text-2xl font-extrabold text-ink">{s.value}</div>
                  <div className="text-[13px] text-muted">{s.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="relative h-[340px] w-full overflow-hidden rounded-3xl shadow-hero lg:h-[450px]">
          <Image
            src={data.image}
            alt="Паломники біля святині"
            fill
            sizes="(max-width: 980px) 100vw, 600px"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_10px_30px_rgba(26,24,20,0.14)]">
            <div className="text-xs text-muted">Найближчий виїзд</div>
            <div className="mt-0.5 text-[15px] font-extrabold text-ink">
              {data.nearestDeparture.date} · {data.nearestDeparture.title}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
