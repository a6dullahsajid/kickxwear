import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Bungee_Shade, Inter } from "next/font/google";

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
  title: "Kickxwear | Football Boots, Running Shoes & Sportswear Online",
  description:
    "Buy football boots, running shoes, sportswear, jerseys, and athletic accessories online at Kickxwear. Premium sports gear for athletes, footballers, runners, and fitness enthusiasts across India.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-inter">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
