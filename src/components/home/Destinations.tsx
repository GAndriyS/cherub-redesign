import { Container } from "@/components/ui/Container";

export function Destinations({ items }: { items: string[] }) {
  return (
    <section className="bg-sand">
      <Container className="py-14">
        <h2 className="mb-7 text-center text-[28px] font-extrabold tracking-[-0.01em] text-ink md:text-[31px]">
          Напрямки паломництв
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((d) => (
            <span
              key={d}
              className="rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-ink shadow-pill"
            >
              {d}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
