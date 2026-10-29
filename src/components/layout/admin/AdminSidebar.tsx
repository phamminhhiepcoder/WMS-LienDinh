import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { adminMenuSections } from '../../../constants/adminMenu';
import type { AdminMenuItem } from '../../../constants/adminMenu';
import { getAdminTheme } from '../../../utils/styles';
import { useTranslation } from 'react-i18next';

interface AdminSidebarProps {
    darkMode: boolean;
    onLogout: () => void;
}

export default function AdminSidebar({
    darkMode,
}: AdminSidebarProps) {
    const location = useLocation();
    const theme = getAdminTheme(darkMode);
    const { t } = useTranslation();

    const getActiveParent = () => {
        for (const section of adminMenuSections) {
            const parent = section.items.find((item) =>
                item.children?.some(
                    (child) =>
                        child.path &&
                        (location.pathname === child.path ||
                            location.pathname.startsWith(`${child.path}/`))
                )
            );

            if (parent) return parent.labelKey;
        }

        return '';
    };

    const [openMenu, setOpenMenu] = useState<string>(getActiveParent);

    useEffect(() => {
        const activeParent = getActiveParent();

        if (activeParent) {
            setOpenMenu(activeParent);
        }
    }, [location.pathname]);

    const isItemActive = (item: AdminMenuItem) => {
        if (!item.path) return false;

        return item.path === '/admin'
            ? location.pathname === '/admin' ||
            location.pathname === '/admin/'
            : location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);
    };

    const renderSubmenu = (item: AdminMenuItem) => {
        if (!item.children) return null;

        return (
            <div className="ml-5 mt-1 space-y-1 border-l border-slate-300/40 pl-3 dark:border-slate-700">
                {item.children.map((child, index) => {
                    const ChildIcon = child.icon;
                    const active = isItemActive(child);

                    return (
                        <Link
                            key={child.path ?? `${child.labelKey}-${index}`}
                            to={child.path ?? '/admin'}
                            aria-current={active ? 'page' : undefined}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                                ? 'bg-purple-600/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300'
                                : `${theme.secondary} ${theme.hover}`
                                }`}
                        >
                            <ChildIcon className="h-4 w-4 shrink-0" />
                            <span>{t(child.labelKey)}</span>
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <aside
            className={`flex w-full shrink-0 flex-col border-r transition-colors duration-300 md:w-64 ${theme.sidebar}`}
        >
            <div
                className={`flex h-24 items-center gap-3 border-b px-6 ${theme.divider}`}
            >
                <img
                    src="/logo.png"
                    alt="WMS Logo"
                    className="h-16 w-16 shrink-0 object-contain"
                />

                <div className="min-w-0">
                    <h1
                        className={`text-sm font-extrabold tracking-tight ${theme.heading}`}
                    >
                        Warehouse Management System
                    </h1>
                </div>
            </div>

            <nav aria-label={t('adminMenu')} className={theme.nav}>
                {adminMenuSections.map((section, index) => (
                    <section
                        key={section.titleKey}
                        className={
                            index < adminMenuSections.length - 1
                                ? theme.navSectionDivider
                                : ''
                        }
                    >
                        <h2 className={theme.navSectionTitle}>
                            {t(section.titleKey)}
                        </h2>

                        <div className="space-y-1.5">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const hasChildren = Boolean(item.children?.length);
                                const isOpen = openMenu === item.labelKey;
                                const isActive = isItemActive(item);
                                const hasActiveChild =
                                    item.children?.some(isItemActive) ?? false;

                                const isHighlighted = hasChildren
                                    ? hasActiveChild
                                    : isActive;

                                const itemClassName = [
                                    theme.navItem,
                                    isHighlighted ? theme.navItemActive : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ');

                                const iconClassName = [
                                    'h-5 w-5 shrink-0',
                                    isHighlighted
                                        ? theme.navItemIconActive
                                        : theme.navItemIcon,
                                ].join(' ');

                                return (
                                    <div key={item.labelKey}>
                                        {hasChildren ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu((prev) =>
                                                        prev === item.labelKey ? '' : item.labelKey
                                                    )
                                                }
                                                aria-expanded={isOpen}
                                                className={[
                                                    itemClassName,
                                                    'justify-between',
                                                ].join(' ')}
                                            >
                                                <span className="flex min-w-0 items-center gap-3.5">
                                                    <Icon className={iconClassName} />
                                                    <span className="truncate">
                                                        {t(item.labelKey)}
                                                    </span>
                                                </span>

                                                <ChevronDown
                                                    className={[
                                                        'h-4 w-4 shrink-0 transition-transform duration-200',
                                                        isOpen ? 'rotate-180' : '',
                                                    ].join(' ')}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path ?? '/admin'}
                                                aria-current={isActive ? 'page' : undefined}
                                                className={itemClassName}
                                            >
                                                <Icon className={iconClassName} />
                                                <span className="truncate">
                                                    {t(item.labelKey)}
                                                </span>
                                            </Link>
                                        )}

                                        {hasChildren && isOpen && renderSubmenu(item)}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </nav>
        </aside>
    );
}