import type { SanityImageSource } from "@sanity/image-url";
import { client, sanityEnabled } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { siteSettingsQuery } from "@/sanity/queries";
import { site, type SiteSettings } from "./site";

type RawSettings = {
  footerNote?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  logo?: SanityImageSource;
  phones?: { display: string; tel: string }[];
  nav?: { label: string; href: string }[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityEnabled) return site;
  try {
    const d = await client.fetch<RawSettings | null>(siteSettingsQuery);
    if (!d) return site;
    return {
      ...site,
      footerNote: d.footerNote ?? site.footerNote,
      email: d.email ?? site.email,
      address: d.address ?? site.address,
      phones: d.phones?.length ? d.phones : site.phones,
      nav: d.nav?.length ? d.nav : site.nav,
      social: {
        facebook: d.facebook ?? site.social.facebook,
        instagram: d.instagram ?? site.social.instagram,
      },
      logoUrl: d.logo ? urlFor(d.logo).width(160).height(160).fit("crop").url() : site.logoUrl,
    };
  } catch (e) {
    console.error("[sanity] siteSettings fetch failed, using static site", e);
    return site;
  }
}
