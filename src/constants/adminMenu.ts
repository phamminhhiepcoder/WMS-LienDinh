import {
    LayoutDashboard,
    Boxes,
    History,
    PackagePlus,
    PackageCheck,
    Radio,
    BarChart3,
    Truck,
    Search,
    ShieldCheck,
    Activity,
    Link2,
    Clock3,
    PackageSearch,
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
                        labelKey: 'inventoryTransactionHistory',
                        icon: History,
                        path: '/admin/inventory',
                    },
                    {
                        labelKey: 'importReceipts',
                        icon: PackagePlus,
                        path: '/admin/inventory/imports',
                    },
                    {
                        labelKey: 'packingInformation',
                        icon: PackageCheck,
                        path: '/admin/inventory/packing',
                    },
                ],
            },
            {
                labelKey: 'rfidSystem',
                icon: Radio,
                children: [
                    {
                        labelKey: 'Pending',
                        icon: Clock3,
                        path: '/admin/inventory',
                    }
                ],
            },
            {
                labelKey: 'report',
                icon: BarChart3,
                path: '/admin/reports',
                children: [
                    {
                        labelKey: 'Report Pending',
                        icon: History,
                        path: '/admin/inventory',
                    }
                ],
            },
            {
                labelKey: 'shippingManage',
                icon: Truck,
                path: '/admin/shipping',
            },
            {
                labelKey: 'lookup',
                icon: Search,
                children: [
                    {
                        labelKey: 'inventoryTransactionHistory',
                        icon: History,
                        path: '/admin/inventory',
                    },
                    {
                        labelKey: 'orderTracking',
                        icon: PackageSearch,
                        path: '/admin/inventory/order',
                    },
                    {
                        labelKey: 'packingInformation',
                        icon: PackageCheck,
                        path: '/admin/inventory/packing',
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
                path: '/admin/imesSystem',
            },
        ],
    },
    {
        titleKey: 'administration',
        items: [
            {
                labelKey: 'accessManagement',
                icon: ShieldCheck,
                path: '/admin/access',
            },
            {
                labelKey: 'systemMonitoring',
                icon: Activity,
                path: '/admin/monitoring',
            }
        ],
    },
];