import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'আজকের বাজার দর - নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম',
  description: 'দৈনন্দিন বাজারের সঠিক ও হালনাগাদ তথ্য জানুন সহজেই।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body 
        className={`${inter.className} min-h-screen flex flex-col bg-base-100`}
        suppressHydrationWarning={true}
      >
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}