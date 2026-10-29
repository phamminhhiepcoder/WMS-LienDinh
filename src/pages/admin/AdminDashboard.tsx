import { useState } from "react";
import {
  Loader2,
  AlertCircle,
} from "lucide-react";

import { adminStyles } from "../../utils/styles";
import type { DashboardData } from "../../types/warehouseDashboard";
import { initialData } from "../../data/warehouseDashboard";
import { DashboardStats, ImportExportChart, NetFlowChart, ProductionOverview } from "./dashboard";

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { summary, monthlyMovement, netFlow, defectiveStock, productionData, brands } = data;

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
      <DashboardStats summary={summary} />

      <ImportExportChart data={monthlyMovement} />

      <NetFlowChart
        netFlow={netFlow}
        defectiveStock={defectiveStock}
      />

      <ProductionOverview
        brands={brands}
        productionData={productionData}
      />
    </div>
  );
}