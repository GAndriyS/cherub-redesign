import type { SanityImageSource } from "@sanity/image-url";
import { client, sanityEnabled } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { tourBySlugQuery, tourSlugsQuery } from "@/sanity/queries";

export type TourDay = {
  dayNumber?: number;
  title?: string;
  items: string[];
  photos: string[];
};

export type TourDetail = {
  title: string;
  slug: string;
  tags: string[];
  durationDays?: number;
  dateStart?: string;
  dateEnd?: string;
  priceEur: number;
  withPriest: boolean;
  summary?: string;
  departurePoints: string[];
  program: TourDay[];
  included: string[];
  notIncluded: string[];
};

type RawDay = {
  dayNumber?: number;
  title?: string;
  items?: string[];
  photos?: SanityImageSource[];
};

type RawTourDetail = {
  title?: string;
  slug?: string;
  tags?: string[];
  durationDays?: number;
  dateStart?: string;
  dateEnd?: string;
  priceEur?: number;
  withPriest?: boolean;
  summary?: string;
  departurePoints?: string[];
  program?: RawDay[];
  included?: string[];
  notIncluded?: string[];
};

export async function getTour(slug: string): Promise<TourDetail | null> {
  if (!sanityEnabled) return null;
  const d = await client.fetch<RawTourDetail | null>(tourBySlugQuery, { slug });
  if (!d) return null;
  return {
    title: d.title ?? "",
    slug: d.slug ?? slug,
    tags: d.tags ?? [],
    durationDays: d.durationDays,
    dateStart: d.dateStart,
    dateEnd: d.dateEnd,
    priceEur: d.priceEur ?? 0,
    withPriest: d.withPriest ?? false,
    summary: d.summary,
    departurePoints: d.departurePoints ?? [],
    program: (d.program ?? []).map((day) => ({
      dayNumber: day.dayNumber,
      title: day.title,
      items: day.items ?? [],
      photos: (day.photos ?? []).map((p) =>
        urlFor(p).width(900).height(560).fit("crop").auto("format").url(),
      ),
    })),
    included: d.included ?? [],
    notIncluded: d.notIncluded ?? [],
  };
}

export async function getTourSlugs(): Promise<string[]> {
  if (!sanityEnabled) return [];
  const slugs = await client.fetch<string[] | null>(tourSlugsQuery);
  return slugs ?? [];
}
