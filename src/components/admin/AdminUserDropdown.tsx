import { useEffect, useRef, useState } from 'react';
import { ChevronDown, UserRound, Settings, LogOut } from 'lucide-react';
import { adminStyles, getAdminTheme } from '../../utils/styles';

interface UserDropdownProps {
    user: {
        fullName?: string;
        role?: string;
    };
    darkMode: boolean;
    onProfile?: () => void;
    onSettings?: () => void;
    onLogout?: () => void;
}

export default function AdminUserDropdown({
    user,
    darkMode,
    onProfile,
    onSettings,
    onLogout,
}: UserDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const theme = getAdminTheme(darkMode);

    const userName = user.fullName?.trim() || 'Quản trị viên';
    const userRole = user.role || 'admin';
    const userInitial = userName.charAt(0).toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleMenuAction = (action?: () => void) => {
        setIsDropdownOpen(false);
        action?.();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                aria-label="Mở menu tài khoản"
                className={`flex items-center gap-3 rounded-2xl p-1.5 pl-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${isDropdownOpen
                        ? darkMode ? 'bg-slate-800' : 'bg-slate-100'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
                    }`}
            >
                <div className="text-right hidden sm:block max-w-40">
                    <div className={`text-sm font-bold truncate ${adminStyles.title}`}>
                        {userName}
                    </div>
                    <div className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">
                        {userRole}
                    </div>
                </div>

                <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center font-extrabold text-sm select-none ${darkMode
                            ? 'bg-purple-950 text-purple-300 border-purple-800'
                            : 'bg-purple-50 text-purple-600 border-purple-200'
                        }`}
                >
                    {userInitial}
                </div>

                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                        } ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className={theme.dropdownClass}
                    role="menu"
                    aria-label="Menu tài khoản"
                >
                    <div className={`p-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black border ${darkMode
                                        ? 'bg-purple-950 text-purple-300 border-purple-800'
                                        : 'bg-purple-50 text-purple-600 border-purple-200'
                                    }`}
                            >
                                {userInitial}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className={`text-sm font-extrabold truncate ${adminStyles.title}`}>
                                    {userName}
                                </p>
                                <p className={`text-xs mt-1 truncate ${adminStyles.mutedText}`}>
                                    Tài khoản quản trị hệ thống
                                </p>
                            </div>
                        </div>

                        <div
                            className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${darkMode
                                    ? 'bg-emerald-950/60 text-emerald-400'
                                    : 'bg-emerald-50 text-emerald-700'
                                }`}
                        >
                            Vai trò: {userRole}
                        </div>
                    </div>

                    <div className="p-2">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleMenuAction(onProfile)}
                            className={theme.menuItemClass}
                        >
                            <UserRound className="w-4 h-4 text-slate-400" />
                            <span className="flex-1">Hồ sơ cá nhân</span>
                        </button>

                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleMenuAction(onSettings)}
                            className={theme.menuItemClass}
                        >
                            <Settings className="w-4 h-4 text-slate-400" />
                            <span className="flex-1">Cài đặt tài khoản</span>
                        </button>
                    </div>

                    <div className={`p-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleMenuAction(onLogout)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-colors ${darkMode
                                    ? 'text-red-400 hover:bg-red-950/40'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}