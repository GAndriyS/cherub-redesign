/** Людська українська назва сторінки за шляхом — для поля «Джерело» в заявках. */
export function pageNameFromPath(pathname: string): string {
  if (pathname === "/") return "Домашня сторінка";
  if (pathname.startsWith("/kontakty")) return "Сторінка контактів";
  if (pathname.startsWith("/tury/")) return "Сторінка туру";
  if (pathname.startsWith("/tury")) return "Паломництва";
  return pathname;
}
