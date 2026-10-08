'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | string>('2026');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content border-t mt-auto">
      <aside>
        <p className="font-semibold text-primary text-lg">আজকের বাজার দর</p>
        <p className="text-sm">দৈনন্দিন বাজারের সঠিক ও হালনাগাদ তথ্য।</p>
        <p className="text-xs text-base-content/60 mt-2">
          © {year} - সর্বস্বত্ব সংরক্ষিত
        </p>
      </aside>
    </footer>
  );
}