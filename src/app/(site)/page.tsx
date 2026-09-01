import { Hero } from "@/components/home/Hero";
import { NearestTours } from "@/components/home/NearestTours";
import { Destinations } from "@/components/home/Destinations";
import { Advantages } from "@/components/home/Advantages";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getHomeData } from "@/lib/home";

export const revalidate = 3600;

export default async function HomePage() {
  const { home, tours } = await getHomeData();
  return (
    <>
      <Hero data={home.hero} />
      <NearestTours tours={tours} filters={home.tourFilters} />
      <Destinations items={home.destinations} />
      <Advantages items={home.advantages} />
      <CtaBanner title={home.cta.title} text={home.cta.text} />
    </>
  );
}
