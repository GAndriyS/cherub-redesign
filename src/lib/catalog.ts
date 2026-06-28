import type { SanityImageSource } from "@sanity/image-url";
import { client, sanityEnabled } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { catalogToursQuery } from "@/sanity/queries";
import { formatRangeUk } from "./format";
import { featuredTours as demoTours } from "./demo-content";

// Демо-обкладинка за slug для турів без завантаженого фото.
const demoCoverBySlug = new Map(demoTours.map((t) => [t.slug, t.coverImage]));

export type CatalogTour = {
  slug: string;
  title: string;
  coverImage: string | null;
  category: string | null;
  durationLabel: string | null;
  durationHighlight: boolean;
  dateLabel: string | null;
  priceLabel: string;
  isPriced: boolean;
  tags: string[];
};

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

function mapCatalog(d: RawTour): CatalogTour {
  const slug = d.slug ?? "";
  const cover = d.coverImage
    ? urlFor(d.coverImage).width(760).height(340).fit("crop").auto("format").url()
    : (demoCoverBySlug.get(slug) ?? null);
  const isPriced = Boolean(d.priceEur && d.priceEur > 0);
  return {
    slug,
    title: d.title ?? "",
    coverImage: cover,
    category: d.tags?.[0] ?? null,
    durationLabel: d.highlightBadge || (d.durationDays ? `${d.durationDays} днів` : null),
    durationHighlight: Boolean(d.highlightBadge),
    dateLabel: d.dateStart || d.dateEnd ? formatRangeUk(d.dateStart, d.dateEnd) : null,
    priceLabel: isPriced ? `€${d.priceEur}` : "Ціна за запитом",
    isPriced,
    tags: Array.isArray(d.tags) ? d.tags : [],
  };
}

export async function getCatalogTours(): Promise<CatalogTour[]> {
  if (!sanityEnabled) return [];
  const docs = await client.fetch<RawTour[] | null>(catalogToursQuery);
  return (docs ?? []).map(mapCatalog);
}
