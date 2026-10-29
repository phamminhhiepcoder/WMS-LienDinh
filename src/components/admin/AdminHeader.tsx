
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
    X,
    Menu,
} from 'lucide-react';

import { adminStyles, getAdminTheme } from '../../utils/styles';
import AdminUserDropdown from './AdminUserDropdown';
import { useTranslation } from 'react-i18next';

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
    onLogout,
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

    const controlButtonClass = [
        'h-10 w-10 shrink-0 flex items-center justify-center',
        'rounded-xl border transition-colors duration-200',
        darkMode
            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100',
    ].join(' ');

    return (
        <header className={`${theme.header} relative`}>
            <button
                type="button"
                onClick={onToggleSidebar}
                aria-label={sidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
                title={sidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
                className={controlButtonClass}
            >
                {sidebarOpen ? (
                    <Menu className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
            </button>

            <h2
                className={`hidden xl:block font-extrabold text-base tracking-tight whitespace-nowrap ${adminStyles.title}`}
            >
                {title}
            </h2>

            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 min-w-0">
                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative flex-1 min-w-0 max-w-xs"
                >
                    <Search
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                        placeholder={t('search')}
                        aria-label={t('search')}
                        className={`${adminStyles.input} h-10 pl-9 pr-3 text-sm`}
                    />
                </form>

                {/* Zoom */}
                <div className="hidden sm:flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => handleZoom(-5)}
                        disabled={zoom <= 75}
                        title={t('zoomOut')}
                        aria-label={t('zoomOut')}
                        className={`${controlButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>

                    <span
                        className={`min-w-12 text-center text-xs font-bold tabular-nums ${darkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}
                    >
                        {zoom}%
                    </span>

                    <button
                        type="button"
                        onClick={() => handleZoom(5)}
                        disabled={zoom >= 125}
                        title={t('zoomIn')}
                        aria-label={t('zoomIn')}
                        className={`${controlButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>

                {/* Language */}
                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() =>
                            setShowLanguageMenu((previous) => !previous)
                        }
                        aria-label={t('selectLanguage')}
                        aria-expanded={showLanguageMenu}
                        title={t('language')}
                        className={`${controlButtonClass} gap-1 px-2 w-auto`}
                    >
                        <Languages className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">
                            {currentLanguage}
                        </span>
                    </button>

                    {showLanguageMenu && (
                        <div
                            className={`absolute right-0 top-full mt-2 z-50 w-40 rounded-xl border shadow-xl p-1 ${darkMode
                                ? 'bg-slate-900 border-slate-700'
                                : 'bg-white border-slate-200'
                                }`}
                        >
                            {(
                                [
                                    { value: 'vi', label: 'Tiếng Việt' },
                                    { value: 'en', label: 'English' },
                                ] as const
                            ).map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() =>
                                        changeLanguage(item.value)
                                    }
                                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm ${currentLanguage === item.value
                                        ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-300'
                                        : `${theme.secondary} ${theme.hover}`
                                        }`}
                                >
                                    {item.label}
                                    {currentLanguage === item.value && (
                                        <Check className="w-4 h-4" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dark mode */}
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
