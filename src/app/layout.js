import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Bungee_Shade, Inter } from "next/font/google";
import OrganizationSchema from "./components/OrganizationSchema";
import WebsiteSchema from "./components/WebsiteSchema";
import { Analytics } from "@vercel/analytics/next";

const bungee = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  verification: {
    google: "hJJtZDhMeJUxMoe1jspPlaV-qCYPR6OhZjJKxJTZA5M",
  },
  title: {
    default: "Kickxwear | Premium Sports Shoes & Apparel",
    template: "%s | Kickxwear",
  },

  description:
    "Buy football boots, running shoes, sportswear, jerseys, and athletic accessories online at Kickxwear. Premium sports gear for athletes, footballers, runners, and fitness enthusiasts across India.",

  keywords: [
    "Kickxwear",
    "Sports Shoes",
    "Football Studs",
    "Running Shoes",
    "Casual Shoes",
    "Sportswear",
    "Sneakers",
    "Athletic Shoes",
    "Sports Accessories",
  ],

  applicationName: "Kickxwear",

  authors: [
    {
      name: "Kickxwear",
    },
  ],

  creator: "Kickxwear",

  publisher: "Kickxwear",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Kickxwear",
    title: "Kickxwear | Premium Sports Shoes & Apparel",
    description:
      "Buy football boots, running shoes, sportswear, jerseys, and athletic accessories online at Kickxwear. Premium sports gear for athletes, footballers, runners, and fitness enthusiasts across India.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kickxwear",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kickxwear | Premium Sports Shoes",
    description:
      "Shop premium sports footwear and apparel from Kickxwear.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} ${inter.variable} h-full antialiased`}
    >
      <Analytics />
      <body className="min-h-full flex flex-col bg-white font-inter">
        <OrganizationSchema />
        <WebsiteSchema />
        <Navbar />
        <main className="flex-1 pt-30">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
