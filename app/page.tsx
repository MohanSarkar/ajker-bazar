'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import { authClient } from '@/lib/auth-client';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, slug: 'sorno-machi-chal', nameBn: 'স্বর্ণমাছি চাল', category: 'chal', categoryNameBn: 'চাল', categoryIcon: '🍚', unit: 'kg', image: '🍚', today: 148, change: { dir: 'up', pct: 2.1 } },
  { id: 2, slug: 'miniket-chal', nameBn: 'মিনিকেট চাল', category: 'chal', categoryNameBn: 'চাল', categoryIcon: '🍚', unit: 'kg', image: '🍚', today: 99, change: { dir: 'down', pct: -2.9 } },
  { id: 3, slug: 'nazir-chal', nameBn: 'নাজির চাল', category: 'chal', categoryNameBn: 'চাল', categoryIcon: '🍚', unit: 'kg', image: '🍚', today: 74, change: { dir: 'flat', pct: 0 } },
  { id: 4, slug: 'batam-size-chal', nameBn: 'বাটাম সাইজ চাল', category: 'chal', categoryNameBn: 'চাল', categoryIcon: '🍚', unit: 'kg', image: '🍚', today: 66, change: { dir: 'up', pct: 3.1 } },
  { id: 5, slug: 'mosur-dal', nameBn: 'মসুর ডাল', category: 'dal', categoryNameBn: 'ডাল', categoryIcon: '🫘', unit: 'kg', image: '🫘', today: 142, change: { dir: 'up', pct: 2.9 } },
  { id: 6, slug: 'mug-dal', nameBn: 'মুগ ডাল', category: 'dal', categoryNameBn: 'ডাল', categoryIcon: '🫘', unit: 'kg', image: '🫘', today: 135, change: { dir: 'flat', pct: 0 } },
  { id: 7, slug: 'chola-dal', nameBn: 'ছোলা', category: 'dal', categoryNameBn: 'ডাল', categoryIcon: '🫘', unit: 'kg', image: '🫘', today: 120, change: { dir: 'down', pct: -2.4 } },
  { id: 8, slug: 'aman-dal-khosasila', nameBn: 'আমন ডাল (খোসাসিলা)', category: 'dal', categoryNameBn: 'ডাল', categoryIcon: '🫘', unit: 'kg', image: '🫘', today: 156, change: { dir: 'up', pct: 2.6 } },
  { id: 9, slug: 'sorishar-tel', nameBn: 'সরিষার তেল', category: 'tel', categoryNameBn: 'তেল', categoryIcon: '🛢️', unit: 'litre', image: '🫙', today: 192, change: { dir: 'up', pct: 2.1 } },
  { id: 10, slug: 'pam-tel', nameBn: 'পাম তেল', category: 'tel', categoryNameBn: 'তেল', categoryIcon: '🛢️', unit: 'kg', image: '🛢️', today: 168, change: { dir: 'down', pct: -2.3 } },
  { id: 11, slug: 'ghani-banga-sorishar-tel', nameBn: 'ঘানি ভাঙা সরিষার তেল', category: 'tel', categoryNameBn: 'তেল', categoryIcon: '🛢️', unit: 'litre', image: '🫙', today: 215, change: { dir: 'up', pct: 2.4 } },
  { id: 12, slug: 'alu', nameBn: 'আলু', category: 'sobji', categoryNameBn: 'সবজি', categoryIcon: '🥬', unit: 'kg', image: '🥔', today: 30, change: { dir: 'down', pct: -6.2 } },
  { id: 13, slug: 'peyaj', nameBn: 'পেঁয়াজ', category: 'sobji', categoryNameBn: 'সবজি', categoryIcon: '🥬', unit: 'kg', image: '🧅', today: 54, change: { dir: 'up', pct: 12.5 } },
  { id: 14, slug: 'kaccha-moric', nameBn: 'কাঁচামরিচ', category: 'sobji', categoryNameBn: 'সবজি', categoryIcon: '🥬', unit: 'kg', image: '🌶️', today: 92, change: { dir: 'down', pct: -12.4 } },
  { id: 15, slug: 'begun', nameBn: 'বেগুন', category: 'sobji', categoryNameBn: 'সবজি', categoryIcon: '🥬', unit: 'kg', image: '🍆', today: 44, change: { dir: 'up', pct: 4.8 } },
  { id: 16, slug: 'dhenders', nameBn: 'ঢেঁড়স', category: 'sobji', categoryNameBn: 'সবজি', categoryIcon: '🥬', unit: 'kg', image: '🟢', today: 38, change: { dir: 'flat', pct: 0 } },
  { id: 17, slug: 'rui-mach', nameBn: 'রুই মাছ', category: 'mach', categoryNameBn: 'মাছ', categoryIcon: '🐟', unit: 'kg', image: '🐟', today: 46, change: { dir: 'up', pct: 4.5 } },
  { id: 18, slug: 'telapiya-mach', nameBn: 'তেলাপিয়া', category: 'mach', categoryNameBn: 'মাছ', categoryIcon: '🐟', unit: 'kg', image: '🐟', today: 36, change: { dir: 'flat', pct: 0 } },
  { id: 19, slug: 'ilish-mach', nameBn: 'ইলিশ মাছ', category: 'mach', categoryNameBn: 'মাছ', categoryIcon: '🐟', unit: 'kg', image: '🐠', today: 1850, change: { dir: 'up', pct: 3.4 } },
  { id: 20, slug: 'katla-mach', nameBn: 'কাতলা মাছ', category: 'mach', categoryNameBn: 'মাছ', categoryIcon: '🐟', unit: 'kg', image: '🐠', today: 43, change: { dir: 'down', pct: -4.4 } },
  { id: 21, slug: 'chingri-mach', nameBn: 'চিংড়ি মাছ (খোলা)', category: 'mach', categoryNameBn: 'মাছ', categoryIcon: '🐟', unit: 'kg', image: '🦐', today: 330, change: { dir: 'up', pct: 3.1 } },
  { id: 22, slug: 'murgi-r-mangsho', nameBn: 'মুরগির মাংস', category: 'mangsho', categoryNameBn: 'মাংস', categoryIcon: '🍗', unit: 'kg', image: '🍗', today: 225, change: { dir: 'down', pct: -1.3 } },
  { id: 23, slug: 'goru-r-mangsho', nameBn: 'গরুর মাংস', category: 'mangsho', categoryNameBn: 'মাংস', categoryIcon: '🍗', unit: 'kg', image: '🥩', today: 790, change: { dir: 'down', pct: -1.2 } },
  { id: 24, slug: 'khasir-mangsho', nameBn: 'খাসির মাংস', category: 'mangsho', categoryNameBn: 'মাংস', categoryIcon: '🍗', unit: 'kg', image: '🍖', today: 1290, change: { dir: 'down', pct: -3 } },
  { id: 25, slug: 'hanser-mangsho', nameBn: 'হাঁসের মাংস', category: 'mangsho', categoryNameBn: 'মাংস', categoryIcon: '🍗', unit: 'kg', image: '🦆', today: 285, change: { dir: 'down', pct: -3.4 } },
  { id: 26, slug: 'dim', nameBn: 'ডিম', category: 'dim-dui', categoryNameBn: 'ডিম-দুধ', categoryIcon: '🥛', unit: 'dozen', image: '🥚', today: 158, change: { dir: 'up', pct: 3.9 } },
  { id: 27, slug: 'dui-dudh', nameBn: 'দুধ', category: 'dim-dui', categoryNameBn: 'ডিম-দুধ', categoryIcon: '🥛', unit: 'litre', image: '🥛', today: 102, change: { dir: 'up', pct: 2 } },
  { id: 28, slug: 'doi', nameBn: 'দই', category: 'dim-dui', categoryNameBn: 'ডিম-দুধ', categoryIcon: '🥛', unit: 'litre', image: '🥣', today: 92, change: { dir: 'flat', pct: 0 } },
  { id: 29, slug: 'mokhhan', nameBn: 'মাখন (১০০ গ্রাম)', category: 'dim-dui', categoryNameBn: 'ডিম-দুধ', categoryIcon: '🥛', unit: 'piece', image: '🧈', today: 145, change: { dir: 'up', pct: 3.6 } },
  { id: 30, slug: 'ada', nameBn: 'আদা', category: 'mosla', categoryNameBn: 'মসলা', categoryIcon: '🌶️', unit: 'kg', image: '🫚', today: 85, change: { dir: 'up', pct: 9 } },
  { id: 31, slug: 'roshun', nameBn: 'রসুন', category: 'mosla', categoryNameBn: 'মসলা', categoryIcon: '🌶️', unit: 'kg', image: '🧄', today: 125, change: { dir: 'down', pct: -7.4 } },
];

export default function HomePage() {
  const [allProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [sortBy, setSortBy] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  const getUnitBn = (unit: string) => {
    if (unit === 'kg') return 'কেজি';
    if (unit === 'litre') return 'লিটার';
    if (unit === 'dozen') return 'ডজন';
    if (unit === 'piece') return 'পিস';
    return unit;
  };

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.today - b.today;
    if (sortBy === 'high-to-low') return b.today - a.today;
    return 0;
  });

  const priceIncreasedProducts = allProducts.filter((p) => p.change?.dir === 'up').slice(0, 6);
  const priceDecreasedProducts = allProducts.filter((p) => p.change?.dir === 'down').slice(0, 6);

  const scrollToProducts = () => {
    const element = document.getElementById('all-products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f4f6f4] min-h-screen pb-16">
      <HeroBanner onSeeAllClick={scrollToProducts} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Section: Price Increased */}
        {priceIncreasedProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-lg">▲</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {priceIncreasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} getUnitBn={getUnitBn} />
              ))}
            </div>
          </section>
        )}

        {/* Section: Price Decreased */}
        {priceDecreasedProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">▼</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {priceDecreasedProducts.map((product) => (
                <ProductCard key={product.id} product={product} getUnitBn={getUnitBn} />
              ))}
            </div>
          </section>
        )}

        {/* Section: All Products */}
        <section id="all-products-section" className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সব পণ্য</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs sm:text-sm text-gray-600">সাজান</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-[#008a45] shadow-xs"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} getUnitBn={getUnitBn} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  getUnitBn,
}: {
  product: Product;
  getUnitBn: (unit: string) => string;
}) {
  const { data: session } = authClient.useSession();
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  // ইউজার সাইন ইন থাকলে প্রডাক্ট ডিটেইলস পেজে যাবে, না থাকলে সাইন ইন পেজে পাঠাবে
  const targetHref = session ? `/product/${product.slug}` : `/signin`;

  return (
    <Link href={targetHref} className="block group">
      <div className="bg-[#FAFCFA] rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md transition-all group-hover:border-[#008a45]/40 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#008a45] transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              প্রতি {getUnitBn(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">আজকের দাম</p>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
              {product.today} <span className="text-base font-semibold">টাকা</span>
            </p>
          </div>

          {product.change && (
            <div
              className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                isUp
                  ? 'bg-red-50 text-red-600'
                  : isDown
                  ? 'bg-green-50 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isUp ? '▲' : isDown ? '▼' : '—'} {Math.abs(product.change.pct)}%
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}