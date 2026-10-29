
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { adminMenuSections } from '../../constants/adminMenu';
import { getAdminTheme } from '../../utils/styles';
import { useTranslation } from 'react-i18next';
import type { AdminMenuItem } from '../../constants/adminMenu';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('admin-dark-mode') === 'true'
  );
  const [zoom, setZoom] = useState(100);

  const theme = getAdminTheme(darkMode);

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Lấy toàn bộ menu chính và menu con từ các section
  const allMenuItems: AdminMenuItem[] = adminMenuSections.flatMap(
    (section) =>
      section.items.flatMap((item) => [
        item,
        ...(item.children ?? []),
      ])
  );

  // Xác định menu đang hoạt động theo URL
  const currentMenu = allMenuItems
    .filter((item) => {
      if (!item.path) return false;

      return item.path === '/admin'
        ? location.pathname === '/admin' ||
        location.pathname === '/admin/'
        : location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`);
    })
    .sort(
      (a, b) =>
        (b.path?.length ?? 0) - (a.path?.length ?? 0)
    )[0];

  const currentTitle = currentMenu
    ? t(currentMenu.labelKey)
    : t('dashboard');

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${theme.main} ${theme.heading}`}
      >
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-purple-500" />
          <p className={`text-sm font-bold ${theme.secondary}`}>
            {t('checkingAdminPermission', {
              defaultValue: 'Đang kiểm tra quyền quản trị...',
            })}
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

  return (
    <div
      className={`flex min-h-screen flex-col antialiased transition-colors duration-300 md:flex-row ${theme.page}`}
    >
      {sidebarOpen && (
        <AdminSidebar
          darkMode={darkMode}
          onLogout={logout}
        />
      )}

      <main
        className={`flex min-h-0 min-w-0 flex-1 flex-col transition-colors duration-300 ${theme.main}`}
      >
        <AdminHeader
          title={currentTitle}
          user={user}
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          onToggleDarkMode={() =>
            setDarkMode((prev) => !prev)
          }
          onToggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
          zoom={zoom}
          onZoomChange={setZoom}
        />

        <div
          className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          style={{ zoom: `${zoom}%` }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
