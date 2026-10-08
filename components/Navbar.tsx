'use client';

import Link from 'next/link';

interface NavbarProps {
  onLogoClick?: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link
          href="/"
          onClick={() => {
            if (onLogoClick) onLogoClick();
          }}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 bg-[#008a45] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-xs">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              বাজার দর
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-0.5">
              প্রয়োজনীয় পণ্যের দাম এক নজরে
            </span>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            সাইন ইন
          </button>
          <button className="bg-[#008a45] hover:bg-[#00753a] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95">
            সাইন আপ
          </button>
        </div>
      </div>
    </nav>
  );
}