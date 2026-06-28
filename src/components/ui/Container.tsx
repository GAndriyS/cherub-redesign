import { cn } from "@/lib/cn";

/** Центрований контейнер: max-w 1200px, padding 18→28→44px. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-[18px] md:px-7 lg:px-11", className)}>
      {children}
    </div>
  );
}
