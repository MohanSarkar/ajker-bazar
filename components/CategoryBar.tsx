'use client';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
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

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-x-auto scrollbar-none py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-[#008a45] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}