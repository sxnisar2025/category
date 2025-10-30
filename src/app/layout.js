// src/app/layout.jsx
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "SXENTRA – Innovative Web Solutions",
  description:
    "Explore SXENTRA’s cutting-edge Next.js projects and creative digital experiences.",
  alternates: {
    canonical: "https://sxentra.com",
  },
  openGraph: {
    title: "SXENTRA – Innovative Web Solutions",
    description:
      "Explore SXENTRA’s cutting-edge Next.js projects and creative digital experiences.",
    url: "https://sxentra.com",
    siteName: "SXENTRA",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
