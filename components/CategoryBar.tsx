'use client';

import Link from 'next/link';

interface CategoryBarProps {
  selectedCategory?: string;
}

const CATEGORIES = [
  { slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default function CategoryBar({ selectedCategory }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#008a45] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}