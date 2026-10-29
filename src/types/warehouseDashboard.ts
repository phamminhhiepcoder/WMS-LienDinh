import type { Brand } from "./brand";

export interface WarehouseSummary {
  totalImport: number;
  totalExport: number;
  currentStock: number;
  inventoryTurnover: number;
}

export interface MonthlyMovement {
  month: string;
  importQuantity: number;
  exportQuantity: number;
}

export interface NetFlow {
  month: string;
  quantity: number;
}

export interface DefectiveStock {
  name: string;
  quantity: number;
}

export interface ProductionData {
  date: string;
  value: number;
}

export interface DashboardData {
  summary: WarehouseSummary;
  monthlyMovement: MonthlyMovement[];
  netFlow: NetFlow[];
  defectiveStock: DefectiveStock[];
  productionData: ProductionData[];
  brands: Brand[];
}
