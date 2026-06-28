"use client";

import { buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useLeadForm, type LeadPrefill } from "./LeadFormProvider";

/** Кнопка, що відкриває модалку заявки. */
export function LeadButton({
  variant = "dark",
  size = "md",
  className,
  prefill,
  children,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  prefill?: LeadPrefill;
  children: React.ReactNode;
}) {
  const { open } = useLeadForm();
  return (
    <button type="button" className={buttonClass(variant, className, size)} onClick={() => open(prefill)}>
      {children}
    </button>
  );
}
