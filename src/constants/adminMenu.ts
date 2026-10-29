import {
    LayoutDashboard,
    Boxes,
    History,
    PackageCheck,
    Radio,
    BarChart3,
    Truck,
    Search,
    ShieldCheck,
    Activity,
    Link2,
    PackageSearch,
    BuildingComplex,
    Warehouse,
    Tags,
    Package,
    ArrowLeftRight,
    AlertTriangle,
    PackageX,
    Factory,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminMenuItem {
    labelKey: string;
    icon: LucideIcon;
    path?: string;
    children?: AdminMenuItem[];
}

export interface AdminMenuSection {
    titleKey: string;
    items: AdminMenuItem[];
}

export const adminMenuSections: AdminMenuSection[] = [
    {
        titleKey: 'mainMenu',
        items: [
            {
                labelKey: 'dashboard',
                icon: LayoutDashboard,
                path: '/admin',
            },
            {
                labelKey: 'generalManagement',
                icon: Boxes,
                children: [
                    {
                        labelKey: 'brands',
                        icon: Tags,
                        path: '/admin/brands',
                    },
                    {
                        labelKey: 'suppliers',
                        icon: Truck,
                        path: '/admin/suppliers',
                    },
                    {
                        labelKey: 'warehouses',
                        icon: Warehouse,
                        path: '/admin/warehouses',
                    },
                    {
                        labelKey: 'products',
                        icon: Boxes,
                        path: '/admin/products',
                    },
                ],
            },
            {
                labelKey: 'rfidSystem',
                icon: Radio,
            },
            {
                labelKey: 'report',
                icon: BarChart3,
                path: '/admin/reports',
                children: [
                    {
                        labelKey: 'inventoryReport',
                        icon: Package,
                        path: '#',
                    },
                    {
                        labelKey: 'importExportReport',
                        icon: ArrowLeftRight,
                        path: '#',
                    },
                    {
                        labelKey: 'stockMovementReport',
                        icon: History,
                        path: '#',
                    },
                    {
                        labelKey: 'lowStockReport',
                        icon: AlertTriangle,
                        path: '#',
                    },
                    {
                        labelKey: 'defectiveStockReport',
                        icon: PackageX,
                        path: '#',
                    },
                    {
                        labelKey: 'productionReport',
                        icon: Factory,
                        path: '#',
                    },
                ],
            },
            {
                labelKey: 'shippingManage',
                icon: Truck,
                path: '#',
            },
            {
                labelKey: 'lookup',
                icon: Search,
                children: [
                    {
                        labelKey: 'inventoryTransactionHistory',
                        icon: History,
                        path: '#',
                    },
                    {
                        labelKey: 'orderTracking',
                        icon: PackageSearch,
                        path: '#',
                    },
                    {
                        labelKey: 'packingInformation',
                        icon: PackageCheck,
                        path: '#',
                    },
                ],
            },
        ],
    },
    {
        titleKey: 'systemLinks',
        items: [
            {
                labelKey: 'iMESSystem',
                icon: Link2,
                path: '#',
            },
        ],
    },
    {
        titleKey: 'administration',
        items: [
            {
                labelKey: 'accessManagement',
                icon: ShieldCheck,
                path: '#',
            },
            {
                labelKey: 'systemMonitoring',
                icon: Activity,
                path: '#',
            }
        ],
    },
    {
        titleKey: '',
        items: [
            {
                labelKey: 'lienDinh',
                icon: BuildingComplex,
            },
        ],
    },
];