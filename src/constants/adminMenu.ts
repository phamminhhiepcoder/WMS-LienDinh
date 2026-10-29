import {
    LayoutGrid,
    Laptop,
    Copyright,
    ShoppingCart,
    Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminMenuItem {
    labelKey: string;
    icon: LucideIcon;
    path: string;
}

export const adminMenuItems: AdminMenuItem[] = [
    { labelKey: 'dashboard', icon: LayoutGrid, path: '/admin' },
    { labelKey: 'products', icon: Laptop, path: '/admin/products' },
    { labelKey: 'suppliers', icon: Copyright, path: '/admin/suppliers' },
    { labelKey: 'warehouses', icon: ShoppingCart, path: '/admin/warehouses' },
    { labelKey: 'settings', icon: Settings, path: '/admin/settings' },
];