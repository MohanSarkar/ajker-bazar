import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Ajker Bazar Dor",
  description: "Bilingual Market Price Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-[#F3F5F2] min-h-screen">
        {/* Global Header Elements */}
        <Navbar />
        <CategoryBar />
        <Marquee />

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}