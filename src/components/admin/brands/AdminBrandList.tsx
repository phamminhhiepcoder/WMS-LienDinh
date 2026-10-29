
import { useTranslation } from 'react-i18next';

import {
    Tags,
    Copyright,
    Edit3,
    Trash2,
    EyeOff,
    Eye,
    Loader2,
} from 'lucide-react';

import type { BrandRecord } from '../../../types/brand';
import { adminStyles } from '../../../utils/styles';
import { AdminPagination } from '../../../components/common';

interface AdminBrandListProps {
    brands: BrandRecord[];
    isLoading?: boolean;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onEdit: (brand: BrandRecord) => void;
}

export default function AdminBrandList({
    brands,
    isLoading = false,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onEdit,
}: AdminBrandListProps) {
    const { t } = useTranslation('brands');

    const paginatedBrands = brands.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    if (isLoading) {
        return (
            <div
                role="status"
                aria-label={t('loading')}
                className={`${adminStyles.card} flex min-h-64 items-center justify-center rounded-2xl border`}
            >
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                <span className="sr-only">{t('loading')}</span>
            </div>
        );
    }

    if (brands.length === 0) {
        return (
            <div
                className={`${adminStyles.card} flex flex-col items-center justify-center rounded-2xl border px-4 py-16 text-center`}
            >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <Tags className="h-7 w-7" />
                </div>

                <h3 className={`text-base font-bold ${adminStyles.title}`}>
                    {t('noResults')}
                </h3>

                <p className={`mt-2 max-w-sm text-sm ${adminStyles.mutedText}`}>
                    {t('noResultsDescription')}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/75 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
                                <th scope="col" className="px-6 py-4">
                                    {t('table.logo')}
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    {t('table.name')}
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    {t('table.slug')}
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    {t('table.description')}
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    {t('table.status')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-right">
                                    {t('table.actions')}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {paginatedBrands.map((brand) => (
                                <tr
                                    key={brand._id}
                                    className="text-sm transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800">
                                            {brand.logo ? (
                                                <img
                                                    alt={t('logoAlt', {
                                                        name: brand.name,
                                                    })}
                                                    src={brand.logo}
                                                    className="h-full w-full object-contain"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <Copyright
                                                    className="h-5 w-5 text-slate-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                        {brand.name}
                                    </td>

                                    <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        /{brand.slug}
                                    </td>

                                    <td className="max-w-xs truncate px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                                        {brand.description || t('noDescription')}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={[
                                                'inline-flex items-center gap-1.5 rounded-full',
                                                'border px-2.5 py-1 text-xs font-bold',
                                                brand.isActive
                                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                                    : 'border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
                                            ].join(' ')}
                                            title={
                                                brand.isActive
                                                    ? t('active')
                                                    : t('inactive')
                                            }
                                        >
                                            {brand.isActive ? (
                                                <Eye
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <EyeOff
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            <span>
                                                {brand.isActive
                                                    ? t('active')
                                                    : t('inactive')}
                                            </span>
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(brand)}
                                                title={t('editBrand')}
                                                aria-label={t('editAriaLabel', {
                                                    name: brand.name,
                                                })}
                                                className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/40"
                                            >
                                                <Edit3
                                                    className="h-4 w-4"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            <button
                                                type="button"
                                                title={t('deleteBrand')}
                                                aria-label={t('deleteAriaLabel', {
                                                    name: brand.name,
                                                })}
                                                className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                                            >
                                                <Trash2
                                                    className="h-4 w-4"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AdminPagination
                page={page}
                pageSize={pageSize}
                totalItems={brands.length}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                pageSizeOptions={[8, 12, 20, 50]}
            />
        </div>
    );
}
