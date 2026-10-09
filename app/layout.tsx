import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
      <body className="bg-[#F3F5F2] min-h-screen" suppressHydrationWarning={true}>
        {/* টোস্ট নোটিফিকেশন কম্পোনেন্ট */}
        <Toaster position="top-center" reverseOrder={false} />

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