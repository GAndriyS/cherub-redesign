import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Паломницький центр «Херувим» — духовні подорожі зі Львова",
  description:
    "Паломницькі тури до Меджугор'є, Святої Землі та святинь Європи. Зі священиком, у молитві та спокої — від першого дзвінка до повернення додому.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen bg-ivory text-ink">{children}</body>
    </html>
  );
}
