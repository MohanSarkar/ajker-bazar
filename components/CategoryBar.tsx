'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

function CategoryBarContent() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#008a45] text-white shadow-xs'
                  : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryBar() {
  return (
    <Suspense fallback={<div className="h-12 bg-white border-b border-gray-200/80" />}>
      <CategoryBarContent />
    </Suspense>
  );
}