import { useEffect, useState } from 'react';
import {
  Navigate,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import {
  LayoutGrid,
  Laptop,
  Tags,
  Copyright,
  ShoppingCart,
  Settings,
  Loader2,
} from 'lucide-react';

import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('admin-dark-mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const menuItems = [
    { label: 'Thống kê', icon: LayoutGrid, path: '/admin' },
    { label: 'Sản phẩm', icon: Laptop, path: '/admin/products' },
    { label: 'Vật liệu', icon: Tags, path: '/admin/categories' },
    { label: 'Nhà cung cấp', icon: Copyright, path: '/admin/brands' },
    { label: 'Kho hàng', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Cài đặt hệ thống', icon: Settings, path: '/admin/settings' },
  ];

  const isDark = darkMode;

  const theme = {
    page: isDark
      ? 'bg-slate-950 text-slate-100'
      : 'bg-slate-50 text-slate-800',

    sidebar: isDark
      ? 'bg-slate-900 border-slate-800'
      : 'bg-white border-slate-200',

    divider: isDark
      ? 'border-slate-800'
      : 'border-slate-100',

    heading: isDark
      ? 'text-white'
      : 'text-slate-900',

    secondary: isDark
      ? 'text-slate-300'
      : 'text-slate-600',

    hover: isDark
      ? 'hover:bg-slate-800 hover:text-white'
      : 'hover:bg-slate-50 hover:text-slate-900',

    main: isDark
      ? 'bg-slate-950'
      : 'bg-slate-50',
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme.main} ${theme.heading}`}
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />

          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Đang kiểm tra quyền quản trị...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const currentTitle =
    menuItems.find((item) => item.path === location.pathname)?.label ||
    'Bảng điều khiển';

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row antialiased transition-colors duration-300 ${theme.page}`}
    >
      <aside
        className={`w-full md:w-64 border-r flex flex-col shrink-0 transition-colors duration-300 ${theme.sidebar}`}
      >
        <div
          className={`h-24 flex items-center px-6 gap-3 border-b ${theme.divider}`}
        >
          <img
            src="/logo.png"
            alt="WMS Logo"
            className="w-16 h-16 object-contain shrink-0"
          />

          <div className="min-w-0">
            <h1
              className={`font-extrabold text-sm tracking-tight ${theme.heading}`}
            >
              WMS DinhVang
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 select-none ${isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/15'
                    : `${theme.secondary} ${theme.hover}`
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive
                      ? 'text-white'
                      : isDark
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <AdminFooter
          darkMode={darkMode}
          onLogout={logout}
        />
      </aside>

      <main
        className={`flex-1 flex flex-col min-h-0 min-w-0 transition-colors duration-300 ${theme.main}`}
      >
        <AdminHeader
          title={currentTitle}
          user={user}
          darkMode={darkMode}
          onToggleDarkMode={() =>
            setDarkMode((prev) => !prev)
          }
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-0 min-w-0 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}