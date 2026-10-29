import { Link, useLocation } from 'react-router-dom';
import { adminMenuItems } from '../../constants/adminMenu';
import { getAdminTheme } from '../../utils/styles';
import AdminFooter from './AdminFooter';

interface AdminSidebarProps {
    darkMode: boolean;
    onLogout: () => void;
}

export default function AdminSidebar({
    darkMode,
    onLogout,
}: AdminSidebarProps) {
    const location = useLocation();
    const theme = getAdminTheme(darkMode);

    return (
        <aside className={`w-full md:w-64 border-r flex flex-col shrink-0 transition-colors duration-300 ${theme.sidebar}`}>
            <div className={`h-24 flex items-center px-6 gap-3 border-b ${theme.divider}`}>
                <img
                    src="/logo.png"
                    alt="WMS Logo"
                    className="w-16 h-16 object-contain shrink-0"
                />

                <div className="min-w-0">
                    <h1 className={`font-extrabold text-sm tracking-tight ${theme.heading}`}>
                        WMS DinhVang
                    </h1>
                </div>
            </div>

            <nav
                aria-label="Menu quản trị"
                className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto"
            >
                {adminMenuItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        item.path === '/admin'
                            ? location.pathname === '/admin' ||
                            location.pathname === '/admin/'
                            : location.pathname === item.path ||
                            location.pathname.startsWith(`${item.path}/`);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            aria-current={isActive ? 'page' : undefined}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 select-none ${isActive
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/15'
                                : `${theme.secondary} ${theme.hover}`
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 ${isActive
                                        ? 'text-white'
                                        : darkMode
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
                onLogout={onLogout}
            />
        </aside >
    );
}