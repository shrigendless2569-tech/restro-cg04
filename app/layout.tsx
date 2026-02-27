import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Restro CG04 | Fine Lakeside Dining – Naya Raipur",
  description:
    "Experience exquisite fine dining with a breathtaking lakeside view at Restro CG04, Naya Raipur. Authentic Indian cuisine, curated cocktails, and unforgettable ambience. Book your table today.",
  keywords: [
    "restaurant Naya Raipur",
    "lakeside dining Chhattisgarh",
    "fine dining Raipur",
    "Restro CG04",
    "Indian cuisine Naya Raipur",
  ],
  openGraph: {
    title: "Restro CG04 | Fine Lakeside Dining",
    description: "Exquisite Indian cuisine with a stunning lakeside view in Naya Raipur, Chhattisgarh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
