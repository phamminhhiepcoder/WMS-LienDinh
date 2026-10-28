import { Sun, Moon } from 'lucide-react';
import { adminStyles } from '../../utils/styles';

interface AdminHeaderProps {
    title: string;
    user: {
        fullName?: string;
        role?: string;
    };
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export default function AdminHeader({
    title,
    user,
    darkMode,
    onToggleDarkMode,
}: AdminHeaderProps) {
    const userInitial = user.fullName?.trim() ? user.fullName.trim()[0].toUpperCase() : 'A';

    return (
        <header
            className={`min-h-20 backdrop-blur-md border-b flex items-center justify-between gap-4 px-4 sm:px-8 py-3 z-10 shrink-0 transition-colors duration-300 ${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/80 border-slate-200/80'
                }`}
        >
            <h2 className={`font-extrabold text-base tracking-tight ${adminStyles.title}`}>
                {title}
            </h2>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleDarkMode}
                    aria-label={darkMode ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
                    title={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${darkMode
                            ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="text-right hidden sm:block">
                    <div className={`text-sm font-bold ${adminStyles.title}`}>
                        {user.fullName || 'Quản trị viên'}
                    </div>
                    <div className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">
                        {user.role || 'admin'}
                    </div>
                </div>

                <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center font-extrabold text-sm select-none ${darkMode
                            ? 'bg-purple-950 text-purple-300 border-purple-800'
                            : 'bg-purple-50 text-purple-600 border-purple-200'
                        }`}
                >
                    {userInitial}
                </div>
            </div>
        </header>
    );
}