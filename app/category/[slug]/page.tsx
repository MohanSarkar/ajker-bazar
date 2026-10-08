import { Suspense } from 'react';
import CategoryContent from './CategoryContent';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg text-[#008a45]"></span>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}