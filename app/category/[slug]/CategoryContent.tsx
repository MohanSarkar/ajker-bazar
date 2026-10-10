'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/api';
import CategoryBar from '../../../components/CategoryBar';
import Marquee from '../../../components/Marquee';

const categoryMeta: Record<string, { nameBn: string; icon: string }> = {
  chal: { nameBn: 'চাল', icon: '🍚' },
  dal: { nameBn: 'ডাল', icon: '🫘' },
  tel: { nameBn: 'তেল', icon: '🛢️' },
  sobji: { nameBn: 'সবজি', icon: '🥬' },
  mach: { nameBn: 'মাছ', icon: '🐟' },
  mangsho: { nameBn: 'মাংস', icon: '🍗' },
  'dim-dui': { nameBn: 'ডিম-দুধ', icon: '🥛' },
  mosla: { nameBn: 'মসলা', icon: '🌶️' },
};

interface CategoryContentProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryContent({ params }: CategoryContentProps) {
  const { slug } = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProducts(slug);
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch products from API:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  const getUnitBn = (unit: string) => {
    if (unit === 'kg') return 'কেজি';
    if (unit === 'litre') return 'লিটার';
    if (unit === 'dozen') return 'ডজন';
    if (unit === 'piece') return 'পিস';
    return unit;
  };

  const currentMeta = categoryMeta[slug] || { nameBn: 'পণ্য', icon: '🛒' };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.today - b.today;
    if (sortBy === 'high-to-low') return b.today - a.today;
    return 0;
  });

  return (
    <div className="bg-[#f4f6f4] min-h-screen pb-16">
      <CategoryBar />
      <Marquee products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Category Header Banner */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-14 h-14 bg-red-100/60 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            {currentMeta.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentMeta.nameBn}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
          <div>মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে</div>

          <div className="flex items-center gap-2">
            <span>সাজান</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-[#008a45] shadow-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Loading State & Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium text-lg">পণ্য লোড হচ্ছে...</div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium text-lg">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {sortedProducts.map((product) => {
              const isUp = product.change?.dir === 'up';
              const isDown = product.change?.dir === 'down';

              return (
                <div key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-sm hover:shadow-md transition-all group-hover:border-[#008a45]/40 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                          {product.image || product.categoryIcon || '🛒'}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}