// GROQ-запити для головної сторінки

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  footerNote, email, address, facebook, instagram, logo,
  phones[]{display, tel},
  nav[]{label, href}
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroBadge, heroTitleTop, heroTitleAccent, heroSubtitle, heroImage,
  heroStats[]{value, label},
  nearestDepartureDate, nearestDepartureTitle,
  tourFilters, destinations,
  advantages[]{icon, title, text},
  ctaTitle, ctaText
}`;

export const toursQuery = `*[_type == "tour"] | order(dateStart asc){
  "slug": slug.current, title, coverImage, tags,
  durationDays, dateStart, dateEnd, priceEur, highlightBadge
}`;
