/** Людська українська назва сторінки за шляхом — для поля «Джерело» в заявках. */
export function pageNameFromPath(pathname: string): string {
  if (pathname === "/") return "Домашня сторінка";
  if (pathname.startsWith("/contacts")) return "Сторінка контактів";
  if (pathname.startsWith("/tours/")) return "Сторінка туру";
  if (pathname.startsWith("/tours")) return "Паломництва";
  return pathname;
}
