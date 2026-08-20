import type { HomeContent, TourCard } from "./types";

/**
 * Тимчасовий демо-контент для головної (тексти/фото з хендофу та чинного сайту).
 * Після підключення Sanity ці дані замінить фетч із CMS.
 */

export const featuredTours: TourCard[] = [
  {
    slug: "medjugorje-more-2",
    title: "Меджугор'є + 2 дні моря в Хорватії",
    coverImage: "/images/tour-medjugorje-more.jpg",
    dateLabel: "30 серп – 5 вер 2026",
    priceEur: 230,
    badge: "7 днів",
    badgeVariant: "default",
    tags: ["Меджугор'є"],
  },
  {
    slug: "split-adriatica",
    title: "Християнський відпочинок на Адріатиці, Спліт",
    coverImage: "/images/tour-split-adriatica.jpg",
    dateLabel: "15 – 23 липня 2026",
    priceEur: 520,
    badge: "9 днів",
    badgeVariant: "default",
    tags: ["Християнський відпочинок на морі"],
  },
  {
    slug: "mladifest-2026",
    title: "MLADIFEST · 5 днів у Меджугор'є + море",
    coverImage: "/images/tour-mladifest.jpg",
    dateLabel: "30 лип – 7 серп 2026",
    priceEur: 300,
    badge: "MLADIFEST",
    badgeVariant: "gold",
    tags: ["Меджугор'є"],
  },
];

export const homeContent: HomeContent = {
  hero: {
    badge: "Паломницький центр Херувим · Львів",
    titleTop: "Там, де небо",
    titleAccent: "торкається землі",
    subtitle:
      "Духовні подорожі до Меджугор'є, святинь України та Європи. Час молитви, тиші та внутрішнього відновлення.",
    stats: [
      { value: "9+", label: "років досвіду" },
      { value: "500+", label: "груп" },
    ],
    nearestDeparture: { date: "29 червня", title: "Меджугор'є" },
    image: "/images/hero-medjugorje.jpg",
  },
  tourFilters: ["Усі", "Меджугор'є", "Християнський відпочинок на морі"],
  destinations: [
    "Меджугор'є",
    "Свята Земля",
    "Фатіма",
    "Люрд",
    "Рим · Ватикан",
    "Зарваниця",
    "Грузія",
    "Польща",
  ],
  advantages: [
    {
      icon: "priest",
      title: "Супровід духівника та керівника групи",
      text: "Щоденна Літургія та духовний провід усією дорогою.",
    },
    { icon: "hotel", title: "Готелі 3★", text: "Проживання й харчування згідно з програмою." },
    { icon: "bus", title: "Автобус єврокласу", text: "Зручний переїзд усім маршрутом." },
  ],
  cta: {
    title: "Готові вирушити в дорогу?",
    text: "Залиште контакти — ми зателефонуємо й допоможемо обрати паломництво.",
  },
};
