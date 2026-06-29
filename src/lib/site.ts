export type Phone = { display: string; tel: string };
export type NavItem = { label: string; href: string };

export type SiteSettings = {
  name: string;
  shortName: string;
  city: string;
  tagline: string;
  footerNote: string;
  logoUrl: string;
  nav: NavItem[];
  phones: Phone[];
  email: string;
  address: string;
  social: { facebook: string; instagram: string };
};

/**
 * Статичні дані сайту — резерв для шапки/футера, якщо Sanity порожній/недоступний.
 */
export const site: SiteSettings = {
  name: "Паломницький центр «Херувим»",
  shortName: "Херувим",
  city: "Львів",
  tagline: "Паломницький центр Херувим · Львів",
  footerNote: "Духовні подорожі до святинь світу з молитовним супроводом.",
  logoUrl: "/logo.jpg",

  nav: [
    { label: "Головна", href: "/" },
    { label: "Паломництва", href: "/tours" },
    { label: "Контакти", href: "/contacts" },
  ],

  phones: [
    { display: "(068) 978 01 00", tel: "+380689780100" },
    { display: "(098) 850 03 03", tel: "+380988500303" },
    { display: "(096) 200 08 45", tel: "+380962000845" },
  ],

  email: "palomnuctvo.heruvim@gmail.com",
  address: "Соборна площа, 12а/33, м. Львів",

  social: {
    facebook: "https://facebook.com/palomnuctvo.heruvim",
    instagram: "https://instagram.com/heruvym",
  },
};
