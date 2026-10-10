import { Suspense } from 'react';
import CategoryContent from './CategoryContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 font-medium">লোডিং...</div>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}