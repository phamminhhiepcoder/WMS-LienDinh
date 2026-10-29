import {
    LayoutGrid,
    Laptop,
    Tags,
    Copyright,
    ShoppingCart,
    Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminMenuItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

export const adminMenuItems: AdminMenuItem[] = [
    { label: 'Thống kê', icon: LayoutGrid, path: '/admin' },
    { label: 'Sản phẩm', icon: Laptop, path: '/admin/products' },
    { label: 'Nhà cung cấp', icon: Copyright, path: '/admin/suppliers' },
    { label: 'Kho hàng', icon: ShoppingCart, path: '/admin/warehouses' },
    { label: 'Cài đặt hệ thống', icon: Settings, path: '/admin/settings' },
];