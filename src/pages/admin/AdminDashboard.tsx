import { useState } from "react";
import {
  PackagePlus,
  PackageMinus,
  Warehouse,
  RefreshCw,
  Loader2,
  AlertCircle,
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
} from "recharts";
import { adminStyles } from "../../utils/styles";
import type { DashboardData } from "../../types/warehouseDashboard";
import { initialData } from "../../data/warehouseDashboard";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

const formatTooltip = (value: number | string) =>
  `${formatNumber(Number(value))} sản phẩm`;

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { summary, monthlyMovement } = data;

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
      label: "Tổng số lượng nhập",
      value: formatNumber(summary.totalImport),
      description: "Sản phẩm đã nhập kho",
      icon: PackagePlus,
      iconClass: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
      badgeClass: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Tổng số lượng xuất",
      value: formatNumber(summary.totalExport),
      description: "Sản phẩm đã xuất kho",
      icon: PackageMinus,
      iconClass: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
      badgeClass: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Tổng tồn kho",
      value: formatNumber(summary.currentStock),
      description: "Sản phẩm còn trong kho",
      icon: Warehouse,
      iconClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      badgeClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Vòng quay tồn kho",
      value: `${summary.inventoryTurnover.toFixed(2)} vòng`,
      description: "Hiệu suất luân chuyển hàng",
      icon: RefreshCw,
      iconClass: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      badgeClass: "text-amber-600 dark:text-amber-400",
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

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`${adminStyles.statCard} rounded-2xl`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-xs font-bold uppercase tracking-wide ${adminStyles.mutedText}`}>
                    {stat.label}
                  </p>
                  <h2 className={`text-2xl sm:text-3xl font-black mt-3 break-words ${adminStyles.title}`}>
                    {stat.value}
                  </h2>
                  <p className={`text-xs mt-2 ${stat.badgeClass}`}>
                    {stat.description}
                  </p>
                </div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.iconClass}`}>
                  <Icon className="w-6 h-6" />
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
    </div>
  );
}