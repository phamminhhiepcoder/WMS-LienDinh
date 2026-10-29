import mockBrands from '../data/brand';
import type { BrandRecord } from '../types/brand';

const brandService = {
  getAll: async (): Promise<BrandRecord[]> => {
    return [...mockBrands];
  },

  getById: async (id: string): Promise<BrandRecord | undefined> => {
    return mockBrands.find((brand) => brand._id === id);
  },
};

export default brandService;