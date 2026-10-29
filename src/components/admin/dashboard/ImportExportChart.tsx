
import { useTranslation } from 'react-i18next';
import {
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    Bar,
    BarChart,
} from 'recharts';

import type { MonthlyMovement } from '../../../types/warehouseDashboard';
import { formatNumber, formatTooltip } from '../../../utils/format';
import { adminStyles } from '../../../utils/styles';

interface ImportExportChartProps {
    data: MonthlyMovement[];
}

export default function ImportExportChart({
    data,
}: ImportExportChartProps) {
    const { t } = useTranslation('dashboard');

    return (
        <section className={`${adminStyles.section} rounded-2xl space-y-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className={adminStyles.sectionTitle}>
                        {t('importExport.title')}
                    </h2>

                    <p className={`text-xs mt-2 ${adminStyles.mutedText}`}>
                        {t('importExport.description')}
                    </p>
                </div>

                <span className="text-xs font-bold px-3 py-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {t('importExport.unit')}
                </span>
            </div>

            <div className="h-[300px] sm:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 15, right: 8, left: -15, bottom: 5 }}
                        barGap={6}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#94A3B8"
                            strokeOpacity={0.2}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fontSize: 12,
                                fill: '#94A3B8',
                                fontWeight: 500,
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                                fill: '#94A3B8',
                                fontWeight: 500,
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            tickFormatter={(value: number) =>
                                formatNumber(value)
                            }
                        />

                        <Tooltip
                            formatter={(value) =>
                                formatTooltip(Number(value ?? 0))
                            }
                            contentStyle={{
                                borderRadius: 12,
                                border: '1px solid #94A3B8',
                                fontSize: 12,
                            }}
                        />

                        <Legend
                            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                        />

                        <Bar
                            dataKey="importQuantity"
                            name={t('importExport.import')}
                            fill="#3B82F6"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={32}
                        />

                        <Bar
                            dataKey="exportQuantity"
                            name={t('importExport.export')}
                            fill="#8B5CF6"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
