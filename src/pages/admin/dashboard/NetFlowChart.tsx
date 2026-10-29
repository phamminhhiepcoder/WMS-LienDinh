
import type { DefectiveStock, NetFlow } from '../../../types/warehouseDashboard';
import { LineChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Legend, Line, Cell, Pie } from 'recharts';
import { formatNumber, formatTooltip } from '../../../utils/format';
import { adminStyles } from '../../../utils/styles';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface NetFlowChartProps {
    netFlow: NetFlow[];
    defectiveStock: DefectiveStock[];
}

export default function NetFlowChart({
    netFlow,
    defectiveStock
}: NetFlowChartProps) {
    const DEFECT_COLORS = ["#EF4444", "#10B981"];

    const totalDefective = defectiveStock.find(
        (item) => item.name === "Hàng lỗi"
    )?.quantity ?? 0;

    const totalInventory = defectiveStock.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const defectiveRate =
        totalInventory > 0
            ? ((totalDefective / totalInventory) * 100).toFixed(1)
            : "0.0";

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
            <section className={`${adminStyles.section} rounded-2xl space-y-5`}>
                <div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />

                        <h2 className={adminStyles.sectionTitle}>
                            Dòng hàng ròng
                        </h2>
                    </div>

                    <p className={`text-xs mt-2 ${adminStyles.mutedText}`}>
                        Chênh lệch giữa số lượng nhập và xuất theo tháng.
                    </p>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={netFlow}
                            margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#94A3B8"
                                strokeOpacity={0.2}
                            />

                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                formatter={(value) => formatTooltip(Number(value))}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid #E2E8F0",
                                    fontSize: 12,
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="quantity"
                                name="Hàng ròng"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: "#10B981",
                                    strokeWidth: 2,
                                    stroke: "#FFFFFF",
                                }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={`${adminStyles.softPanel} p-4 rounded-xl`}>
                    <p className={`text-xs ${adminStyles.mutedText}`}>
                        Tổng dòng hàng ròng trong kỳ
                    </p>

                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        {formatNumber(
                            netFlow.reduce((sum, item) => sum + item.quantity, 0)
                        )}{" "}
                        sản phẩm
                    </p>
                </div>
            </section>

            {/* Hàng lỗi */}
            <section className={`${adminStyles.section} rounded-2xl space-y-5`}>
                <div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />

                        <h2 className={adminStyles.sectionTitle}>
                            Tổng quan tồn kho hàng lỗi
                        </h2>
                    </div>

                    <p className={`text-xs mt-2 ${adminStyles.mutedText}`}>
                        Tỷ trọng hàng lỗi so với tổng số lượng tồn kho.
                    </p>
                </div>

                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={defectiveStock}
                                dataKey="quantity"
                                nameKey="name"
                                cx="50%"
                                cy="48%"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={3}
                                stroke="none"
                            >
                                {defectiveStock.map((item, index) => (
                                    <Cell
                                        key={item.name}
                                        fill={DEFECT_COLORS[index % DEFECT_COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => formatTooltip(Number(value))}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid #E2E8F0",
                                    fontSize: 12,
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                wrapperStyle={{ fontSize: 12 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30">
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                            Số lượng hàng lỗi
                        </p>

                        <p className="text-xl font-black text-red-600 dark:text-red-400 mt-2">
                            {formatNumber(totalDefective)}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Tỷ lệ hàng lỗi
                        </p>

                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                            {defectiveRate}%
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}