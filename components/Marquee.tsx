'use client';

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  today: number;
  image?: string;
  categoryIcon?: string;
  change?: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

interface MarqueeProps {
  products: Product[];
}

export default function Marquee({ products }: MarqueeProps) {
  const getUnitBn = (unit: string) => {
    if (unit === 'kg') return 'কেজি';
    if (unit === 'litre') return 'লিটার';
    if (unit === 'dozen') return 'ডজন';
    if (unit === 'piece') return 'পিস';
    return unit;
  };

  const marqueeItems = [...products, ...products];

  return (
    <div className="bg-white border-b border-gray-200 py-3 overflow-hidden relative w-full">
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 75s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track flex items-center gap-8">
        {marqueeItems.map((item, index) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 shrink-0"
            >
              <span>{item.image || item.categoryIcon}</span>
              <span className="font-semibold">{item.nameBn}</span>
              <span className="text-gray-600">
                {item.today} টাকা/{getUnitBn(item.unit)}
              </span>
              {item.change && (
                <span
                  className={`font-bold text-xs ${
                    isUp
                      ? 'text-red-500'
                      : isDown
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {isUp ? '▲' : isDown ? '▼' : '—'} {Math.abs(item.change.pct)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}