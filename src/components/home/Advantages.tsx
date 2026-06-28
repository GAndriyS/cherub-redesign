import { Bus, Cross, MapPin, Star } from "lucide-react";
import type { ElementType } from "react";
import { Container } from "@/components/ui/Container";
import type { Advantage, AdvantageIcon } from "@/lib/types";

const icons: Record<AdvantageIcon, ElementType> = {
  priest: Cross,
  hotel: Star,
  bus: Bus,
  departure: MapPin,
};

export function Advantages({ items }: { items: Advantage[] }) {
  return (
    <Container className="pb-12 pt-16">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => {
          const Icon = icons[a.icon];
          return (
            <div key={a.title} className="rounded-card border border-line bg-white p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-chip text-gold">
                <Icon size={20} />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-ink">{a.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-text2">{a.text}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
