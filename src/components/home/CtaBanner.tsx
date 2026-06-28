import { Container } from "@/components/ui/Container";
import { CtaBannerForm } from "./CtaBannerForm";

export function CtaBanner({ title, text }: { title: string; text: string }) {
  return (
    <Container className="pb-16">
      <div className="flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-ivory md:flex-row md:items-center md:justify-between md:gap-10 md:p-12">
        <div className="flex-1">
          <h3 className="text-[24px] font-extrabold tracking-[-0.01em] md:text-[29px]">{title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#c9c2b2]">{text}</p>
        </div>
        <CtaBannerForm />
      </div>
    </Container>
  );
}
