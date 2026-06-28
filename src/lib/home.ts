import type { SanityImageSource } from "@sanity/image-url";
import { client, sanityEnabled } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { homePageQuery, toursQuery } from "@/sanity/queries";
import { formatRangeUk } from "./format";
import { featuredTours as demoTours, homeContent as demoHome } from "./demo-content";
import type { AdvantageIcon, HomeContent, TourCard } from "./types";

// Поки тур у Sanity без завантаженого фото — показуємо демо-обкладинку за slug.
const demoCoverBySlug = new Map(demoTours.map((t) => [t.slug, t.coverImage]));
const FALLBACK_COVER = demoTours[0].coverImage;

type RawTour = {
  slug?: string;
  title?: string;
  coverImage?: SanityImageSource;
  tags?: string[];
  durationDays?: number;
  dateStart?: string;
  dateEnd?: string;
  priceEur?: number;
  highlightBadge?: string;
};

type RawHome = {
  heroBadge?: string;
  heroTitleTop?: string;
  heroTitleAccent?: string;
  heroSubtitle?: string;
  heroImage?: SanityImageSource;
  heroStats?: { value: string; label: string }[];
  nearestDepartureDate?: string;
  nearestDepartureTitle?: string;
  tourFilters?: string[];
  destinations?: string[];
  advantages?: { icon: AdvantageIcon; title: string; text: string }[];
  ctaTitle?: string;
  ctaText?: string;
};

function mapTour(d: RawTour): TourCard {
  return {
    slug: d.slug ?? "",
    title: d.title ?? "",
    coverImage: d.coverImage
      ? urlFor(d.coverImage).width(760).height(304).fit("crop").auto("format").url()
      : (demoCoverBySlug.get(d.slug ?? "") ?? FALLBACK_COVER),
    dateLabel: formatRangeUk(d.dateStart, d.dateEnd),
    priceEur: d.priceEur ?? 0,
    badge: d.highlightBadge || `${d.durationDays ?? ""} днів`,
    badgeVariant: d.highlightBadge ? "gold" : "default",
    tags: Array.isArray(d.tags) ? d.tags : [],
  };
}

function mapHome(d: RawHome): HomeContent {
  return {
    hero: {
      badge: d.heroBadge ?? demoHome.hero.badge,
      titleTop: d.heroTitleTop ?? demoHome.hero.titleTop,
      titleAccent: d.heroTitleAccent ?? demoHome.hero.titleAccent,
      subtitle: d.heroSubtitle ?? demoHome.hero.subtitle,
      stats: d.heroStats?.length ? d.heroStats : demoHome.hero.stats,
      nearestDeparture: {
        date: d.nearestDepartureDate ?? demoHome.hero.nearestDeparture.date,
        title: d.nearestDepartureTitle ?? demoHome.hero.nearestDeparture.title,
      },
      image: d.heroImage
        ? urlFor(d.heroImage).width(1200).height(900).fit("crop").auto("format").url()
        : demoHome.hero.image,
    },
    tourFilters: d.tourFilters?.length ? d.tourFilters : demoHome.tourFilters,
    destinations: d.destinations?.length ? d.destinations : demoHome.destinations,
    advantages: d.advantages?.length ? d.advantages : demoHome.advantages,
    cta: { title: d.ctaTitle ?? demoHome.cta.title, text: d.ctaText ?? demoHome.cta.text },
  };
}

export async function getHomeData(): Promise<{ home: HomeContent; tours: TourCard[] }> {
  if (!sanityEnabled) return { home: demoHome, tours: demoTours };
  try {
    const [homeDoc, tourDocs] = await Promise.all([
      client.fetch<RawHome | null>(homePageQuery),
      client.fetch<RawTour[] | null>(toursQuery),
    ]);
    return {
      home: homeDoc ? mapHome(homeDoc) : demoHome,
      tours: tourDocs?.length ? tourDocs.map(mapTour) : demoTours,
    };
  } catch (e) {
    console.error("[sanity] home fetch failed, using demo content", e);
    return { home: demoHome, tours: demoTours };
  }
}
