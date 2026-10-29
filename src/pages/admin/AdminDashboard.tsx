import { useState } from "react";

import { adminStyles } from "../../utils/styles";
import type { DashboardData } from "../../types/warehouseDashboard";
import { initialData } from "../../data/warehouseDashboard";
import { DashboardStats, ImportExportChart, NetFlowChart, ProductionOverview } from "../../components/admin/dashboard";

export default function AdminDashboard() {
  const [data] = useState<DashboardData>(initialData);

  const { summary, monthlyMovement, netFlow, defectiveStock, brands } = data;

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
      />
    </div>
  );
}