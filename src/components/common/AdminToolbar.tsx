
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, X } from 'lucide-react';

interface AdminToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  filters?: ReactNode;
  actions?: ReactNode;

  addLabel?: string;
  onAdd?: () => void;
  showAddButton?: boolean;

  className?: string;
  searchClassName?: string;
  buttonClassName?: string;
}

export default function AdminToolbar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder,
  filters,
  actions,
  addLabel,
  onAdd,
  showAddButton = true,
  className = '',
  searchClassName = '',
  buttonClassName = '',
}: AdminToolbarProps) {
  const { t } = useTranslation('common');

  const resolvedSearchPlaceholder =
    searchPlaceholder ?? t('toolbar.searchPlaceholder');

  const resolvedAddLabel = addLabel ?? t('toolbar.add');

  return (
    <div
      className={[
        'flex flex-col gap-3',
        'xl:flex-row xl:items-center xl:justify-between',
        className,
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div
            className={[
              'relative min-w-0 flex-1',
              searchClassName,
            ].join(' ')}
          >
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={resolvedSearchPlaceholder}
              aria-label={resolvedSearchPlaceholder}
              className={[
                'w-full rounded-xl border border-slate-200',
                'bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700',
                'outline-none transition',
                'placeholder:text-slate-400',
                'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10',
                'dark:border-slate-700 dark:bg-slate-900 dark:text-white',
              ].join(' ')}
            />

            {searchValue && (
              <button
                type="button"
                aria-label={t('toolbar.clearSearch')}
                title={t('toolbar.clearSearch')}
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {filters && (
          <div className="flex flex-wrap items-center gap-2">
            {filters}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {actions}

        {showAddButton && onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className={[
              'inline-flex items-center justify-center gap-2',
              'rounded-xl bg-purple-600 px-4 py-2.5',
              'text-sm font-semibold text-white',
              'shadow-md shadow-purple-600/15',
              'transition hover:bg-purple-700',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-purple-500 focus-visible:ring-offset-2',
              'whitespace-nowrap',
              buttonClassName,
            ].join(' ')}
          >
            <Plus size={18} aria-hidden="true" />
            {resolvedAddLabel}
          </button>
        )}
      </div>
    </div>
  );
}
