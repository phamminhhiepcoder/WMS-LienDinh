import type { ProductionData } from './warehouseDashboard';

export type BrandColor = 'blue' | 'violet' | 'emerald';
export type BrandName = 'UGG' | 'TEVA' | 'KOOLABURRA';

export interface Brand {
  id?: number | string;
  name: BrandName;
  value: number;
  color: BrandColor;
  description?: string;
  productionData: ProductionData[];
}

export interface BrandRecord {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  isActive: boolean;
}

export interface BrandPayload {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  isActive: boolean;
}