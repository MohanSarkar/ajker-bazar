import { Category, Product } from '@/types';

const BASE_URL = 'https://api.abcz.workers.dev';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/bazardor/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/api/bazardor/products?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/api/bazardor/products`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/api/bazardor/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}