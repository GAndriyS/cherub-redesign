import { cn } from "@/lib/cn";

/** Надрядкова мітка-ейбр: bg-chip, золото, uppercase, трекінг. */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-chip px-3.5 py-[7px] text-[12.5px] font-bold uppercase tracking-[0.1em] text-gold-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
