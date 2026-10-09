'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

interface MarketPrice {
  bazarName: string;
  division: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

interface ProductDetail {
  id?: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categorySlug: string;
  unit: string;
  icon: string;
  todayPrice: number;
  priceChangePct: number;
  changeDir: 'up' | 'down' | 'flat';
  summary: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
  };
  marketPrices: MarketPrice[];
}

function ProductDetailContent({ slug }: { slug: string }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Auth Protection
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/signin');
    }
  }, [session, isPending, router]);

  // Fetch Live API Data
  useEffect(() => {
    if (!session) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/1`);
        if (res.ok) {
          const apiData = await res.json();
          setProduct({
            slug: apiData.slug || slug,
            nameBn: apiData.nameBn || 'রুই মাছ',
            categoryNameBn: apiData.categoryNameBn || 'মাছ',
            categorySlug: apiData.categorySlug || 'mach',
            unit: apiData.unit || 'কেজি',
            icon: apiData.icon || '🐟',
            todayPrice: apiData.todayPrice || apiData.today || 46,
            priceChangePct: apiData.priceChangePct || apiData.change?.pct || 4.5,
            changeDir: apiData.changeDir || apiData.change?.dir || 'up',
            summary: apiData.summary || {
              minPrice: 41,
              maxPrice: 51,
              avgPrice: 46,
            },
            marketPrices: apiData.marketPrices || [
              { bazarName: 'মাঠ বাজার', division: 'ময়মনসিংহ', minPrice: 41, maxPrice: 45, avgPrice: 43 },
              { bazarName: 'সদর বাজার', division: 'রাজশাহী', minPrice: 42, maxPrice: 46, avgPrice: 44 },
              { bazarName: 'বাসারহাট বাজার', division: 'রাজশাহী', minPrice: 42, maxPrice: 47, avgPrice: 44.5 },
              { bazarName: 'বাজারহাট', division: 'খুলনা', minPrice: 42, maxPrice: 47, avgPrice: 44.5 },
              { bazarName: 'চৌর বাজার', division: 'ময়মনসিংহ', minPrice: 42, maxPrice: 48, avgPrice: 45 },
              { bazarName: 'আমতলী বাজার', division: 'চট্টগ্রাম', minPrice: 43, maxPrice: 48, avgPrice: 45.5 },
              { bazarName: 'ডবলগেট বাজার', division: 'খুলনা', minPrice: 43, maxPrice: 48, avgPrice: 45.5 },
              { bazarName: 'চৌরাস্তা বাজার', division: 'সিলেট', minPrice: 44, maxPrice: 49, avgPrice: 46.5 },
              { bazarName: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', minPrice: 45, maxPrice: 49, avgPrice: 47 },
              { bazarName: 'চৌদ্দগ্রাম বাজার', division: 'চট্টগ্রাম', minPrice: 44, maxPrice: 51, avgPrice: 47.5 },
              { bazarName: 'আমবাজার', division: 'সিলেট', minPrice: 44, maxPrice: 51, avgPrice: 47.5 },
              { bazarName: 'কারওয়ান বাজার', division: 'ঢাকা', minPrice: 45, maxPrice: 51, avgPrice: 48 },
            ],
          });
        }
      } catch (err) {
        console.error("API Fetching Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, session]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center">
        <div className="text-gray-600 font-semibold text-sm animate-pulse">
          ডাটা লোড হচ্ছে...
        </div>
      </div>
    );
  }

  if (!session || !product) {
    return null;
  }

  return (
    <div className="bg-[#f4f6f4] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>/</span>
          <span className="hover:underline cursor-pointer">{product.categoryNameBn}</span>
          <span>/</span>
          <span className="font-semibold text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product Hero Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {product.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                গতকালকের তুলনায় আজ দাম{' '}
                <span className="font-bold text-gray-900">
                  {product.changeDir === 'up' ? 'বেড়েছে' : 'কমেছে'}
                </span>{' '}
                <span className="text-red-500 font-semibold">{product.priceChangePct}%</span>
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 sm:p-6 text-center w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              আজকের দাম
            </span>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
              {product.todayPrice}
            </div>
            <span className="text-xs text-gray-500">টাকা / {product.unit}</span>
            <div className="text-xs font-bold text-red-500 mt-1 flex items-center justify-center gap-1">
              ▲ {product.priceChangePct}%
            </div>
          </div>
        </div>

        {/* Price Summary Grid */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500">সর্বনিম্ন দাম</span>
              <div className="text-xl font-extrabold text-emerald-600 mt-1">
                {product.summary.minPrice} টাকা
              </div>
              <span className="text-[11px] text-gray-400">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500">সর্বাধিক দাম</span>
              <div className="text-xl font-extrabold text-red-500 mt-1">
                {product.summary.maxPrice} টাকা
              </div>
              <span className="text-[11px] text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500">গড় দাম</span>
              <div className="text-xl font-extrabold text-emerald-700 mt-1">
                {product.summary.avgPrice} টাকা
              </div>
              <span className="text-[11px] text-gray-400">প্রতি কেজি-এর হিসাবে</span>
            </div>
          </div>
        </div>

        {/* Market Wise Price Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4 overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {product.marketPrices.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{row.bazarName}</td>
                    <td className="py-3 px-4 text-gray-600">{row.division}</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">{row.minPrice} টাকা</td>
                    <td className="py-3 px-4 text-red-500 font-semibold">{row.maxPrice} টাকা</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{row.avgPrice} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <Link href="/" className="text-sm font-semibold text-[#058240] hover:underline flex items-center gap-1">
            🐟 সব {product.categoryNameBn}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PrivateProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    Promise.resolve(params).then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center">
        <div className="text-gray-600 font-semibold text-sm animate-pulse">
          ডাটা লোড হচ্ছে...
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center">
          <div className="text-gray-600 font-semibold text-sm animate-pulse">
            ডাটা লোড হচ্ছে...
          </div>
        </div>
      }
    >
      <ProductDetailContent slug={slug} />
    </Suspense>
  );
}