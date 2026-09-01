import { LeadFormProvider } from "@/components/lead/LeadFormProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { getSiteSettings } from "@/lib/site-data";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <LeadFormProvider>
      <div className="flex min-h-screen flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
      <BackToTop />
    </LeadFormProvider>
  );
}
