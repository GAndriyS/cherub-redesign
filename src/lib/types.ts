export type AdvantageIcon = "priest" | "hotel" | "bus" | "departure";

export type Advantage = {
  icon: AdvantageIcon;
  title: string;
  text: string;
};

export type TourCard = {
  slug: string;
  title: string;
  coverImage: string;
  dateLabel: string;
  priceEur: number;
  badge: string;
  badgeVariant: "default" | "gold";
  /** Теги напрямків для фільтра на головній. */
  tags: string[];
};

export type HomeContent = {
  hero: {
    badge: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    stats: { value: string; label: string }[];
    nearestDeparture: { date: string; title: string };
    image: string;
  };
  tourFilters: string[];
  destinations: string[];
  advantages: Advantage[];
  cta: { title: string; text: string };
};
