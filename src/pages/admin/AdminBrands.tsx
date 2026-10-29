
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdminToolbar } from '../../components/common';
import AdminBrandList from '../../components/admin/brands/AdminBrandList';
import AdminBrandForm from '../../components/admin/brands/AdminBrandForm';

import brandService from '../../services/brandService';

import type { BrandRecord } from '../../types/brand';

export default function AdminBrands() {
  const { t } = useTranslation('brands');

  const [brands, setBrands] = useState<BrandRecord[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] =
    useState<BrandRecord | null>(null);

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await brandService.getAll();
      setBrands(data);
    } catch (error) {
      console.error('Failed to load brands:', error);
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBrands();
  }, [fetchBrands]);

  const filteredBrands = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return brands.filter((brand) =>
      [
        brand.name,
        brand.slug,
        brand.description ?? '',
      ].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }, [brands, search]);

  const totalItems = filteredBrands.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize),
  );

  useEffect(() => {
    setPage((currentPage) =>
      Math.min(currentPage, totalPages),
    );
  }, [totalPages]);

  const handleOpenAddModal = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (brand: BrandRecord) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="space-y-5">
      <AdminToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder={t('searchPlaceholder')}
        addLabel={t('addBrand')}
        onAdd={handleOpenAddModal}
      />

      <AdminBrandList
        brands={filteredBrands}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        onEdit={handleOpenEditModal}
      />

      {isModalOpen && (
        <AdminBrandForm
          brand={selectedBrand}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
