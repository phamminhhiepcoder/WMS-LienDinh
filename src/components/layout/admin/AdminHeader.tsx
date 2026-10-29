
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Sun,
    Moon,
    Search,
    ZoomIn,
    ZoomOut,
    Languages,
    Check,
    Menu,
} from 'lucide-react';

import { adminStyles, getAdminTheme } from '../../../utils/styles';
import AdminUserDropdown from './AdminUserDropdown';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
    title: string;
    user: {
        fullName?: string;
        role?: string;
    };
    darkMode: boolean;
    sidebarOpen: boolean;
    onToggleDarkMode: () => void;
    onToggleSidebar: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    onLogout?: () => void;
    onSearch?: (query: string) => void;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
}

export default function AdminHeader({
    title,
    user,
    darkMode,
    sidebarOpen,
    onToggleDarkMode,
    onToggleSidebar,
    onProfile,
    onSettings,
    onSearch,
    zoom = 100,
    onZoomChange,
}: AdminHeaderProps) {
    const { t, i18n } = useTranslation();
    const theme = getAdminTheme(darkMode);

    const [searchQuery, setSearchQuery] = useState('');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const currentLanguage = i18n.resolvedLanguage?.startsWith('en')
        ? 'en'
        : 'vi';

    const handleZoom = (amount: number) => {
        const nextZoom = Math.min(125, Math.max(75, zoom + amount));
        onZoomChange?.(nextZoom);
    };

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch?.(searchQuery.trim());
    };

    const changeLanguage = async (language: 'vi' | 'en') => {
        await i18n.changeLanguage(language);
        localStorage.setItem('admin-language', language);
        setShowLanguageMenu(false);
    };


    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Đăng xuất thất bại:', error);
        }
    };
    return (

        <header className={`${theme.header} relative min-w-0 flex-wrap gap-y-2`}>
            <button
                type="button"
                onClick={onToggleSidebar}
                aria-label={sidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
                title={sidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
                className={theme.controlButtonClass}
            >
                <Menu className="h-5 w-5" />
            </button>

            <h2
                className={`hidden 2xl:block shrink-0 max-w-48 truncate text-sm font-extrabold tracking-tight ${adminStyles.title}`}
            >
                {title}
            </h2>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2">
                <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative min-w-0 max-w-[220px] flex-1"
                >
                    <Search
                        className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${theme.headerSearchIcon}`}
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder={t('search')}
                        aria-label={t('search')}
                        className={`${adminStyles.input} h-10 w-full min-w-0 pl-9 pr-3 text-sm`}
                    />
                </form>

                <div className="hidden items-center gap-1 sm:flex">
                    <button
                        type="button"
                        onClick={() => handleZoom(-5)}
                        disabled={zoom <= 75}
                        title={t('zoomOut')}
                        aria-label={t('zoomOut')}
                        className={`${theme.controlButtonClass} ${theme.controlButtonDisabled}`}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </button>

                    <span
                        className={`min-w-12 text-center text-xs font-bold tabular-nums ${theme.headerZoomText}`}
                    >
                        {zoom}%
                    </span>

                    <button
                        type="button"
                        onClick={() => handleZoom(5)}
                        disabled={zoom >= 125}
                        title={t('zoomIn')}
                        aria-label={t('zoomIn')}
                        className={`${theme.controlButtonClass} ${theme.controlButtonDisabled}`}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </button>
                </div>

                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() => setShowLanguageMenu((previous) => !previous)}
                        aria-label={t('selectLanguage')}
                        aria-expanded={showLanguageMenu}
                        title={t('language')}
                        className={`${theme.controlButtonClass} ${theme.languageButton}`}
                    >
                        <Languages className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase">
                            {currentLanguage}
                        </span>
                    </button>

                    {showLanguageMenu && (
                        <div className={theme.languageDropdown}>
                            {(
                                [
                                    { value: 'vi', label: 'Tiếng Việt' },
                                    { value: 'en', label: 'English' },
                                ] as const
                            ).map((item) => {
                                const isSelected = currentLanguage === item.value;

                                return (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => changeLanguage(item.value)}
                                        className={[
                                            theme.languageOption,
                                            isSelected
                                                ? theme.languageOptionActive
                                                : theme.languageOptionInactive,
                                        ].join(' ')}
                                    >
                                        {item.label}

                                        {isSelected && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onToggleDarkMode}
                    aria-label={
                        darkMode
                            ? t('enableLightMode')
                            : t('enableDarkMode')
                    }
                    title={
                        darkMode
                            ? t('switchToLightMode')
                            : t('switchToDarkMode')
                    }
                    className={theme.themeToggleButton}
                >
                    {darkMode ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </button>

                <AdminUserDropdown
                    user={user}
                    darkMode={darkMode}
                    onProfile={onProfile}
                    onSettings={onSettings}
                    onLogout={handleLogout}
                />
            </div>
        </header>

    );
}
