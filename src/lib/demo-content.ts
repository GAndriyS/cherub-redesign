import type { HomeContent, TourCard } from "./types";

/**
 * Тимчасовий демо-контент для головної (тексти/фото з хендофу та чинного сайту).
 * Після підключення Sanity ці дані замінить фетч із CMS.
 */

export const featuredTours: TourCard[] = [
  {
    slug: "medjugorje-more-2",
    title: "Меджугор'є + 2 дні моря в Хорватії",
    coverImage: "https://heruvym.com.ua/wp-content/uploads/2025/01/IMG_0666.jpg",
    dateLabel: "30 серп – 5 вер 2026",
    priceEur: 230,
    badge: "7 днів",
    badgeVariant: "default",
    tags: ["Меджугор'є"],
  },
  {
    slug: "split-adriatica",
    title: "Християнський відпочинок на Адріатиці, Спліт",
    coverImage:
      "https://heruvym.com.ua/wp-content/uploads/2020/01/83594151_2919087494822233_8224738457738543104_n.jpg",
    dateLabel: "15 – 23 липня 2026",
    priceEur: 520,
    badge: "9 днів",
    badgeVariant: "default",
    tags: ["Море + молитва"],
  },
  {
    slug: "mladifest-2026",
    title: "MLADIFEST · 5 днів у Меджугор'є + море",
    coverImage: "https://heruvym.com.ua/wp-content/uploads/2025/02/IMG_9985-scaled.jpg",
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
      "Духовні подорожі до Меджугор'є, Святої Землі та святинь Європи. Зі священиком, у спокої та молитві — від першого дзвінка до повернення додому.",
    stats: [
      { value: "9+", label: "років досвіду" },
      { value: "200+", label: "груп" },
      { value: "24", label: "країни" },
    ],
    nearestDeparture: { date: "29 червня", title: "Меджугор'є" },
    image: "https://heruvym.com.ua/wp-content/uploads/2025/02/IMG_9992-scaled.jpg",
  },
  tourFilters: ["Усі", "Меджугор'є", "Свята Земля", "Море + молитва"],
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
    { icon: "priest", title: "Священик-супровід", text: "Щоденна Літургія та духовний провід усією дорогою." },
    { icon: "hotel", title: "Готелі 3★", text: "Проживання й харчування згідно з програмою." },
    { icon: "bus", title: "Автобус єврокласу", text: "Зручний переїзд усім маршрутом." },
    { icon: "departure", title: "Виїзди із Заходу", text: "Львів · Стрий · Мукачево · Чоп." },
  ],
  cta: {
    title: "Готові вирушити в дорогу?",
    text: "Залиште контакти — ми зателефонуємо й допоможемо обрати паломництво.",
  },
};
