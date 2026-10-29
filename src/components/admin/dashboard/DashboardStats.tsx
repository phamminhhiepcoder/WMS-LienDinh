
import { useTranslation } from 'react-i18next';

import {
    TrendingUp,
    TrendingDown,
    Minus,
} from 'lucide-react';

import { adminStyles } from '../../../utils/styles';
import { formatNumber } from '../../../utils/format';
import type { WarehouseSummary } from '../../../types/warehouseDashboard';

interface DashboardStatsProps {
    summary: WarehouseSummary;
}

export default function DashboardStats({
    summary,
}: DashboardStatsProps) {
    const { t } = useTranslation('dashboard');

    const stats = [
        {
            key: 'totalImport',
            label: t('stats.totalImport'),
            value: formatNumber(summary.totalImport),
            change: 12.5,
            changeAmount: 320,
            unit: t('stats.products'),
        },
        {
            key: 'totalExport',
            label: t('stats.totalExport'),
            value: formatNumber(summary.totalExport),
            change: -8.2,
            changeAmount: 150,
            unit: t('stats.products'),
        },
        {
            key: 'currentStock',
            label: t('stats.currentStock'),
            value: formatNumber(summary.currentStock),
            change: 0,
            changeAmount: 0,
            unit: t('stats.products'),
        },
        {
            key: 'inventoryTurnover',
            label: t('stats.inventoryTurnover'),
            value: `${summary.inventoryTurnover.toFixed(2)} ${t('stats.turns')}`,
            change: -15.4,
            changeAmount: 0.76,
            unit: t('stats.turns'),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {stats.map((stat) => {
                const isIncrease = stat.change > 0;
                const unchanged = stat.change === 0;

                const TrendIcon = unchanged
                    ? Minus
                    : isIncrease
                        ? TrendingUp
                        : TrendingDown;

                const trendClass = unchanged
                    ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    : isIncrease
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400';

                return (
                    <div
                        key={stat.key}
                        className={`${adminStyles.statCard} rounded-2xl`}
                    >
                        <p className={`text-xs font-bold uppercase tracking-wide ${adminStyles.mutedText}`}>
                            {stat.label}
                        </p>

                        <h2 className={`mt-3 break-words text-2xl font-black sm:text-3xl ${adminStyles.title}`}>
                            {stat.value}
                        </h2>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${trendClass}`}>
                                <TrendIcon className="h-3.5 w-3.5" />
                                {stat.change > 0 ? '+' : ''}{stat.change.toFixed(1)}%
                            </span>

                            <span className={`text-xs ${adminStyles.mutedText}`}>
                                {t('stats.comparedToLastMonth')}
                            </span>
                        </div>

                        <p className={`mt-2 text-xs ${adminStyles.mutedText}`}>
                            {t('stats.difference')}: {formatNumber(stat.changeAmount)} {stat.unit}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
