import type { DashboardData } from '../types/warehouseDashboard';

export const initialData: DashboardData = {
    summary: {
        totalImport: 12500,
        totalExport: 9800,
        currentStock: 18750,
        inventoryTurnover: 4.2,
    },

    monthlyMovement: [
        { month: 'T1', importQuantity: 1800, exportQuantity: 1200 },
        { month: 'T2', importQuantity: 1500, exportQuantity: 1400 },
        { month: 'T3', importQuantity: 2200, exportQuantity: 1700 },
        { month: 'T4', importQuantity: 1900, exportQuantity: 1600 },
        { month: 'T5', importQuantity: 2400, exportQuantity: 2100 },
        { month: 'T6', importQuantity: 2700, exportQuantity: 1800 },
    ],

    netFlow: [
        { month: 'T1', quantity: 600 },
        { month: 'T2', quantity: 100 },
        { month: 'T3', quantity: 500 },
        { month: 'T4', quantity: 300 },
        { month: 'T5', quantity: 300 },
        { month: 'T6', quantity: 900 },
    ],

    defectiveStock: [
        { name: 'Hàng lỗi', quantity: 320 },
        { name: 'Hàng đạt chuẩn', quantity: 18430 },
    ],
};