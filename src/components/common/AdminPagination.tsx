import { useTranslation } from 'react-i18next';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface AdminPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSize?: boolean;
  showSummary?: boolean;
  maxVisiblePages?: number;
  className?: string;
  activePageClassName?: string;
}

export default function AdminPagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [8, 12, 20, 50],
  showPageSize = true,
  showSummary = true,
  maxVisiblePages = 5,
  className = '',
  activePageClassName = 'border-purple-600 bg-purple-600 text-white shadow-sm shadow-purple-200 dark:shadow-none',
}: AdminPaginationProps) {
  const { t } = useTranslation('common');

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const visibleCount = Math.max(1, maxVisiblePages);
  const half = Math.floor(visibleCount / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + visibleCount - 1);
  startPage = Math.max(1, endPage - visibleCount + 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const buttonBase =
    'inline-flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-100 dark:focus-visible:ring-purple-900/40';

  const navButtonClass = [
    buttonBase,
    'border-slate-200 bg-white text-slate-500',
    'hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700',
    'disabled:pointer-events-none disabled:opacity-30',
    'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
    'dark:hover:border-purple-800 dark:hover:bg-purple-950/40 dark:hover:text-purple-300',
  ].join(' ');

  return (
    <div
      className={[
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      ].join(' ')}
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {showSummary && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('pagination.showing', {
              from: startItem,
              to: endItem,
              total: totalItems,
            })}
          </p>
        )}

        {showPageSize && onPageSizeChange && (
          <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="whitespace-nowrap">
              {t('pagination.pageSize')}
            </span>

            <select
              value={pageSize}
              onChange={(event) =>
                onPageSizeChange(Number(event.target.value))
              }
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-purple-900/30"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <nav
        aria-label={t('pagination.navigation')}
        className="flex items-center gap-1.5"
      >
        <button
          type="button"
          aria-label={t('pagination.first')}
          title={t('pagination.first')}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className={navButtonClass}
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          type="button"
          aria-label={t('pagination.previous')}
          title={t('pagination.previous')}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={navButtonClass}
        >
          <ChevronLeft size={16} />
        </button>

        {startPage > 1 && (
          <span
            aria-hidden="true"
            className="px-1 text-sm text-slate-400"
          >
            …
          </span>
        )}

        {pages.map((pageNumber) => {
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              type="button"
              aria-label={t('pagination.pageNumber', {
                page: pageNumber,
              })}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={[
                buttonBase,
                isActive
                  ? activePageClassName
                  : [
                    'border-transparent bg-transparent text-slate-600',
                    'hover:border-slate-200 hover:bg-white hover:text-purple-700',
                    'dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900',
                  ].join(' '),
              ].join(' ')}
            >
              {pageNumber}
            </button>
          );
        })}

        {endPage < totalPages && (
          <span
            aria-hidden="true"
            className="px-1 text-sm text-slate-400"
          >
            …
          </span>
        )}

        <button
          type="button"
          aria-label={t('pagination.next')}
          title={t('pagination.next')}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={navButtonClass}
        >
          <ChevronRight size={16} />
        </button>

        <button
          type="button"
          aria-label={t('pagination.last')}
          title={t('pagination.last')}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className={navButtonClass}
        >
          <ChevronsRight size={16} />
        </button>
      </nav>
    </div>
  );
}
