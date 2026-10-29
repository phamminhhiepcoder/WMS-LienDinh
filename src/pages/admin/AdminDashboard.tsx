import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
  Minus,
  PackageCheck,
  type LucideIcon,
  Footprints,
  Waves,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Pie,
  PieChart,
  LineChart,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { adminStyles } from "../../utils/styles";
import type { DashboardData } from "../../types/warehouseDashboard";
import { colorStyles, initialData } from "../../data/warehouseDashboard";
import { formatNumber, formatTooltip } from "../../utils/format";


export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState<'3m' | '30d' | '7d'>('3m');
  const [selectedBrand, setSelectedBrand] = useState<'UGG' | 'TEVA' | 'KOOLABURRA'>('UGG');

  const { summary, monthlyMovement, netFlow, defectiveStock, productionData, brands } = data;
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


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span className="font-semibold">{error}</span>
      </div>
    );
  }

  const stats = [
    {
      label: 'Tổng số lượng nhập',
      value: formatNumber(summary.totalImport),
      change: 12.5,
      changeAmount: 320,
      unit: 'đơn',
    },
    {
      label: 'Tổng số lượng xuất',
      value: formatNumber(summary.totalExport),
      change: -8.2,
      changeAmount: 150,
      unit: 'đơn',
    },
    {
      label: 'Tổng tồn kho',
      value: formatNumber(summary.currentStock),
      change: 0,
      changeAmount: 0,
      unit: 'sản phẩm',
    },
    {
      label: 'Vòng quay tồn kho',
      value: `${summary.inventoryTurnover.toFixed(2)} vòng`,
      change: -15.4,
      changeAmount: 0.76,
      unit: 'vòng',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${adminStyles.title}`}>
            Dashboard
          </h1>
          <p className={`mt-2 text-sm ${adminStyles.mutedText}`}>
            Cung cấp số liệu tổng quan về các chỉ số chính, bao gồm thống kê và hoạt động nhập/xuất kho và các hoạt động khác.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {stats.map((stat) => {
          const isIncrease = stat.change > 0;
          const isDecrease = stat.change < 0;
          const isUnchanged = stat.change === 0;

          const absChange = Math.abs(stat.change);
          const changeLabel = isUnchanged
            ? 'Bằng tháng trước'
            : isIncrease
              ? 'Cao hơn tháng trước'
              : 'Thấp hơn tháng trước';

          const description = isUnchanged
            ? 'Không thay đổi so với tháng trước'
            : `${absChange >= 20 ? 'Biến động mạnh' : absChange >= 10 ? 'Biến động đáng kể' : 'Biến động nhẹ'} (${formatNumber(stat.changeAmount)} ${stat.unit}) so với tháng trước`;

          const TrendIcon = isIncrease
            ? TrendingUp
            : isDecrease
              ? TrendingDown
              : Minus;

          const trendClass = isUnchanged
            ? 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400'
            : isIncrease
              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
              : 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400';

          return (
            <div
              key={stat.label}
              className={`${adminStyles.statCard} rounded-2xl`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-bold uppercase tracking-wide ${adminStyles.mutedText}`}
                  >
                    {stat.label}
                  </p>

                  <h2
                    className={`mt-3 break-words text-2xl font-black sm:text-3xl ${adminStyles.title}`}
                  >
                    {stat.value}
                  </h2>

                  <div className="mt-3">
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${trendClass}`}
                    >
                      <TrendIcon className="h-3.5 w-3.5" />
                      <span>{changeLabel}</span>
                    </div>

                    <p className={`mt-2 text-xs leading-relaxed ${adminStyles.mutedText}`}>
                      {description}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 text-right ${isUnchanged
                    ? 'text-slate-500 dark:text-slate-400'
                    : isIncrease
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                    }`}
                >
                  <p className="text-lg font-extrabold">
                    {isIncrease ? '+' : ''}
                    {stat.change.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide">
                    Tháng trước
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Biểu đồ nhập xuất */}
      <section className={`${adminStyles.section} rounded-2xl space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className={adminStyles.sectionTitle}>
              Tổng quan nhập/xuất kho
            </h2>
            <p className={`text-xs mt-2 ${adminStyles.mutedText}`}>
              So sánh số lượng hàng nhập và xuất theo từng tháng.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            Đơn vị: sản phẩm
          </span>
        </div>

        <div className="h-[300px] sm:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyMovement}
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
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                  new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value) => formatTooltip(Number(value ?? 0))}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              />
              <Bar
                dataKey="importQuantity"
                name="Nhập kho"
                fill="#3B82F6"
                radius={[5, 5, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="exportQuantity"
                name="Xuất kho"
                fill="#8B5CF6"
                radius={[5, 5, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

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

      <section className={`${adminStyles.section} space-y-6 rounded-2xl`}>
        {/* Header và bộ lọc */}
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
                  Theo dõi sản lượng theo thương hiệu và thời gian.
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
                Thương hiệu đang chọn: {selectedBrand}
              </p>
            </div>

            <span className={`w-fit rounded-lg px-3 py-1.5 text-xs font-semibold ${adminStyles.softPanel} ${adminStyles.mutedText}`}>
              Đơn vị: sản phẩm
            </span>
          </div>

          <div className="h-[280px] w-full sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={productionData}
                margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
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
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#productionGradient)"
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}