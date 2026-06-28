export type ClassValue = string | false | null | undefined;

/** Мінімальний об'єднувач класів (без зовнішніх залежностей). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
