import { cn } from "@/lib/cn";

/** Пігулка-чип: фільтри, теги, перемикачі. */
export function Chip({
  active = false,
  className,
  children,
}: {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
        active
          ? "bg-ink text-white"
          : "bg-chip text-text2 hover:bg-chip-hover",
        className,
      )}
    >
      {children}
    </span>
  );
}
