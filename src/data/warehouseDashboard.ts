import type { BrandColor } from '../types/brand';
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
    
    brands: [
        {
            name: 'UGG',
            value: 12500,
            color: 'blue',
            productionData: [
                { date: '01/08', value: 45000 },
                { date: '05/08', value: 60000 },
                { date: '10/08', value: 75000 },
                { date: '15/08', value: 95000 },
                { date: '20/08', value: 88000 },
                { date: '25/08', value: 70000 },
                { date: '30/08', value: 55000 },
            ],
        },
        {
            name: 'TEVA',
            value: 4687,
            color: 'violet',
            productionData: [
                { date: '01/08', value: 18000 },
                { date: '05/08', value: 25000 },
                { date: '10/08', value: 32000 },
                { date: '15/08', value: 28000 },
                { date: '20/08', value: 40000 },
                { date: '25/08', value: 35000 },
                { date: '30/08', value: 42000 },
            ],
        },
        {
            name: 'KOOLABURRA',
            value: 3124,
            color: 'emerald',
            productionData: [
                { date: '01/08', value: 12000 },
                { date: '05/08', value: 16000 },
                { date: '10/08', value: 14000 },
                { date: '15/08', value: 22000 },
                { date: '20/08', value: 19000 },
                { date: '25/08', value: 26000 },
                { date: '30/08', value: 30000 },
            ],
        },
    ],
};

export const colorStyles: Record<
    BrandColor,
    {
        icon: string;
        selected: string;
        dot: string;
    }
> = {
    blue: {
        icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        selected: 'border-blue-500 ring-2 ring-blue-500/10',
        dot: 'bg-blue-500',
    },
    violet: {
        icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
        selected: 'border-violet-500 ring-2 ring-violet-500/10',
        dot: 'bg-violet-500',
    },
    emerald: {
        icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        selected: 'border-emerald-500 ring-2 ring-emerald-500/10',
        dot: 'bg-emerald-500',
    },
};