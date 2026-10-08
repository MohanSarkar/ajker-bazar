export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface MarketPrice {
  bazarName: string;
  price: number;
}

export interface Product {
  id: string | number;
  name: string;
  category: string;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  changePercent: number;
  emoji: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  bazarPrices?: MarketPrice[];
}