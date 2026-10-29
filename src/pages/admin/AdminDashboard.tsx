import { useState } from "react";

import { adminStyles } from "../../utils/styles";
import type { DashboardData } from "../../types/warehouseDashboard";
import { initialData } from "../../data/warehouseDashboard";
import { DashboardStats, ImportExportChart, NetFlowChart, ProductionOverview } from "../../components/admin/dashboard";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const [data] = useState<DashboardData>(initialData);
  const [t] = useTranslation('dashboard');

  const { summary, monthlyMovement, netFlow, defectiveStock, brands } = data;

  return (
    <div className="space-y-6 sm:space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${adminStyles.title}`}>
            Dashboard
          </h1>
          <p className={`mt-2 text-sm ${adminStyles.mutedText}`}>
            {t('description')}
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