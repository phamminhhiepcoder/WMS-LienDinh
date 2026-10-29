import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { adminMenuItems } from '../../constants/adminMenu';
import { getAdminTheme } from '../../utils/styles';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('admin-dark-mode') === 'true'
  );

  const theme = getAdminTheme(darkMode);

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const currentMenu = [...adminMenuItems]
    .filter((item) =>
      item.path === '/admin'
        ? location.pathname === '/admin' ||
        location.pathname === '/admin/'
        : location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`)
    )
    .sort((a, b) => b.path.length - a.path.length)[0];

  const currentTitle = currentMenu?.label ?? 'Bảng điều khiển';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.main} ${theme.heading}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className={`text-sm font-bold ${theme.secondary}`}>
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

  return (
    <div className={`min-h-screen flex flex-col md:flex-row antialiased transition-colors duration-300 ${theme.page}`}>
      <AdminSidebar
        darkMode={darkMode}
        onLogout={logout}
      />

      <main className={`flex-1 flex flex-col min-h-0 min-w-0 transition-colors duration-300 ${theme.main}`}>
        <AdminHeader
          title={currentTitle}
          user={user}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-0 min-w-0 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}