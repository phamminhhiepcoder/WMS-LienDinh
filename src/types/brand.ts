export type BrandColor = 'blue' | 'violet' | 'emerald';
export type BrandName = 'UGG' | 'TEVA' | 'KOOLABURRA';

export interface Brand {
  id?: number | string;
  name: BrandName;
  value: number;
  color: BrandColor;
  description?: string;
}