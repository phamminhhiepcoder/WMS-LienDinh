import { useMemo, useState } from 'react';
import type { Brand } from '../../../types/brand';
import { Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, AreaChart } from 'recharts';
import { formatNumber } from '../../../utils/format';
import { adminStyles } from '../../../utils/styles';
import { TrendingUp } from 'lucide-react';
import { colorStyles } from '../../../data/warehouseDashboard';

interface ProductionOverviewProps {
    brands: Brand[];
}

export default function ProductionOverview({
    brands
}: ProductionOverviewProps) {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m'>('3m');
    const [selectedBrand, setSelectedBrand] = useState(
        brands[0]?.name ?? '',
    );

    const activeBrand = brands.find(
        (brand) => brand.name === selectedBrand,
    ) ?? brands[0];

    const chartColor = activeBrand
        ? {
            blue: '#3B82F6',
            violet: '#8B5CF6',
            emerald: '#10B981',
        }[activeBrand.color]
        : '#3B82F6';

    const gradientId = `productionGradient-${activeBrand?.color ?? 'default'}`;

    const filteredChartData = useMemo(() => {
        const allData = activeBrand?.productionData ?? [];

        const limits = {
            '7d': 7,
            '30d': 30,
            '3m': 90,
        };

        return allData.slice(-limits[timeRange]);
    }, [activeBrand, timeRange]);


    return (
        <section className={`${adminStyles.section} space-y-6 rounded-2xl`}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className={adminStyles.sectionTitle}>
                                Tổng quan sản lượng thành phẩm
                            </h2>
                            <p className={`mt-1 text-xs ${adminStyles.mutedText}`}>
                                Theo dõi sản lượng theo nhãn hàng và thời gian.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-900 sm:w-fit">
                    {[
                        { value: '7d', label: '7 ngày' },
                        { value: '30d', label: '30 ngày' },
                        { value: '3m', label: '3 tháng' },
                    ].map((range) => (
                        <button
                            key={range.value}
                            type="button"
                            onClick={() => setTimeRange(range.value as '3m' | '30d' | '7d')}
                            className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold transition-all sm:flex-none ${timeRange === range.value
                                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400'
                                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {brands.map((brand) => {
                    const selected = selectedBrand === brand.name;
                    const colors = colorStyles[brand.color];

                    return (
                        <button
                            key={brand.name}
                            type="button"
                            onClick={() => setSelectedBrand(brand.name)}
                            aria-pressed={selected}
                            className={`min-w-0 rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${selected
                                ? `${colors.selected} ${adminStyles.section}`
                                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className={`mt-1 break-words text-base font-extrabold ${adminStyles.title}`}>
                                        {brand.name}
                                    </h3>
                                </div>
                            </div>

                            <p className={`mt-5 break-words text-2xl font-black sm:text-3xl ${adminStyles.title}`}>
                                {formatNumber(brand.value)}
                            </p>


                            {selected && (
                                <div className="mt-4 border-t border-slate-200 pt-3 text-xs font-bold text-blue-600 dark:border-slate-700 dark:text-blue-400">
                                    Đang xem biểu đồ
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/40 sm:p-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className={`text-sm font-bold ${adminStyles.title}`}>
                            Sản lượng theo thời gian
                        </h3>
                        <p className={`mt-1 text-xs ${adminStyles.mutedText}`}>
                            Nhãn hàng đang chọn: {selectedBrand}
                        </p>
                    </div>

                    <span className={`w-fit rounded-lg px-3 py-1.5 text-xs font-semibold ${adminStyles.softPanel} ${adminStyles.mutedText}`}>
                        Đơn vị: sản phẩm
                    </span>
                </div>

                <div className="h-[280px] w-full sm:h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={filteredChartData}
                            margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id={gradientId}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={chartColor} stopOpacity={0.01} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#94A3B8"
                                strokeOpacity={0.2}
                            />

                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                            />

                            <YAxis
                                tick={{ fontSize: 11, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value: number) =>
                                    new Intl.NumberFormat('vi-VN', {
                                        notation: 'compact',
                                    }).format(value)
                                }
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatNumber(Number(value ?? 0)),
                                    'Sản lượng',
                                ]}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: '1px solid #E2E8F0',
                                    fontSize: 12,
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="value"
                                name="Sản lượng"
                                stroke={chartColor}
                                strokeWidth={2.5}
                                fill={`url(#${gradientId})`}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}