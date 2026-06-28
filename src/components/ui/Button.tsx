import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "dark" | "outline" | "gold";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold leading-none transition-all duration-200 cursor-pointer select-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  dark: "bg-ink text-ivory hover:-translate-y-0.5 hover:shadow-raised",
  outline: "border-[1.5px] border-ink text-ink bg-transparent hover:bg-ink hover:text-ivory",
  gold: "bg-gold text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-raised",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-7 py-[15px] text-[15px]",
  sm: "px-[22px] py-3 text-[14px]",
};

/** Класи кнопки — для застосування до <a>/<Link>/<button>. */
export function buttonClass(
  variant: ButtonVariant = "dark",
  className?: string,
  size: ButtonSize = "md",
) {
  return cn(base, variants[variant], sizes[size], className);
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant = "dark", size = "md", className, ...props }: Props) {
  return <button className={buttonClass(variant, className, size)} {...props} />;
}
