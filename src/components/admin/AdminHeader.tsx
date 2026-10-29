import { Sun, Moon } from 'lucide-react';
import { adminStyles, getAdminTheme } from '../../utils/styles';
import AdminUserDropdown from './AdminUserDropdown';

interface AdminHeaderProps {
    title: string;
    user: {
        fullName?: string;
        role?: string;
    };
    darkMode: boolean;
    onToggleDarkMode: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    onLogout?: () => void;
}

export default function AdminHeader({
    title,
    user,
    darkMode,
    onToggleDarkMode,
    onProfile,
    onSettings,
    onLogout,
}: AdminHeaderProps) {
    const theme = getAdminTheme(darkMode);

    return (
        <header className={theme.header}>
            <h2 className={`font-extrabold text-base tracking-tight ${adminStyles.title}`}>
                {title}
            </h2>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleDarkMode}
                    aria-label={darkMode ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
                    title={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
                    className={theme.themeToggleButton}
                >
                    {darkMode ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </button>

                <AdminUserDropdown
                    user={user}
                    darkMode={darkMode}
                    onProfile={onProfile}
                    onSettings={onSettings}
                    onLogout={onLogout}
                />
            </div>
        </header>
    );
}