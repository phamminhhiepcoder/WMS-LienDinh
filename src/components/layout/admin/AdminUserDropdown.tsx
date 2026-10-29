import { useEffect, useRef, useState } from 'react';
import { ChevronDown, UserRound, Settings, LogOut } from 'lucide-react';
import { adminStyles, getAdminTheme } from '../../../utils/styles';

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
                className={[
                    theme.dropdownTrigger,
                    isDropdownOpen ? theme.dropdownTriggerActive : '',
                ].join(' ')}
            >
                <div className={theme.dropdownTriggerInfo}>
                    <div className={theme.dropdownTriggerName}>
                        {userName}
                    </div>

                    <div className={theme.dropdownTriggerRole}>
                        {userRole}
                    </div>
                </div>

                <div className={theme.dropdownTriggerAvatar}>
                    {userInitial}
                </div>

                <ChevronDown
                    className={[
                        theme.dropdownTriggerChevron,
                        isDropdownOpen ? 'rotate-180' : '',
                    ].join(' ')}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className={theme.dropdownClass}
                    role="menu"
                    aria-label="Menu tài khoản"
                >
                    <div className={theme.dropdownHeader}>
                        <div className="flex items-center gap-3">
                            <div
                                className={theme.dropdownAvatar}
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
                            className={theme.dropdownRole}
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

                    <div className={theme.dropdownFooter}>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => handleMenuAction(onLogout)}
                            className={theme.dropdownLogoutButton}
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