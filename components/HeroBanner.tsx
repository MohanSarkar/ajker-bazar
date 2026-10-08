'use client';

import { useState, useEffect } from 'react';

interface HeroBannerProps {
  onSeeAllClick?: () => void;
}

export default function HeroBanner({ onSeeAllClick }: HeroBannerProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setFormattedDate(dateString);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-[#f8faf8] border border-gray-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs relative overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 space-y-4 text-left z-10">
          {formattedDate && (
            <div className="inline-block bg-[#e8f5e9] text-[#008a45] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
              {formattedDate}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button
              onClick={onSeeAllClick}
              className="bg-[#008a45] hover:bg-[#00753a] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="w-48 sm:w-64 md:w-72 lg:w-80 shrink-0 relative flex justify-center items-center">
          <svg
            viewBox="0 0 300 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-sm"
          >
            {/* Basket Base Shadow */}
            <ellipse cx="150" cy="225" rx="100" ry="12" fill="#E5E7EB" />
            
            {/* Vegetables / Fruits in Basket */}
            {/* Purple Grape/Plum */}
            <circle cx="85" cy="115" r="22" fill="#A855F7" />
            
            {/* Red Apple/Tomato */}
            <circle cx="120" cy="95" r="28" fill="#EF4444" />
            <path d="M120 67 C122 60, 130 58, 132 62" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
            
            {/* Orange Citrus */}
            <circle cx="155" cy="110" r="18" fill="#F97316" />
            
            {/* Green Watermelon / Vegetable */}
            <circle cx="195" cy="80" r="32" fill="#10B981" />
            <path d="M195 48 C185 30, 190 20, 205 25" stroke="#047857" strokeWidth="5" strokeLinecap="round" fill="none" />
            
            {/* Yellow Orange */}
            <circle cx="225" cy="112" r="20" fill="#F59E0B" />
            <path d="M225 92 C230 85, 235 85, 238 88" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />

            {/* Wooden Basket Front */}
            <path
              d="M50 130 L65 210 C67 218 75 220 85 220 L215 220 C225 220 233 218 235 210 L250 130 Z"
              fill="#C2410C"
            />
            <path
              d="M45 125 C45 120 50 118 60 118 L240 118 C250 118 255 120 255 125 C255 130 250 132 240 132 L60 132 C50 132 45 130 45 125 Z"
              fill="#9A3412"
            />
            {/* Basket Slats / Texture */}
            <line x1="90" y1="132" x2="98" y2="218" stroke="#7C2D12" strokeWidth="5" />
            <line x1="130" y1="132" x2="133" y2="218" stroke="#7C2D12" strokeWidth="5" />
            <line x1="170" y1="132" x2="167" y2="218" stroke="#7C2D12" strokeWidth="5" />
            <line x1="210" y1="132" x2="202" y2="218" stroke="#7C2D12" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}