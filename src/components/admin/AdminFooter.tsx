import { LogOut } from 'lucide-react';

interface AdminFooterProps {
    darkMode: boolean;
    onLogout: () => void;
}

export default function AdminFooter({
    darkMode,
    onLogout,
}: AdminFooterProps) {
    return (
        <div
            className={`p-4 border-t space-y-2 transition-colors duration-300 ${darkMode
                ? 'border-slate-800 bg-slate-950/70'
                : 'border-slate-100 bg-slate-50/50'
                }`}
        >
            <button
                type="button"
                onClick={onLogout}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${darkMode
                    ? 'text-red-400 hover:bg-red-950/50 hover:text-red-300'
                    : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                    }`}
            >
                <LogOut
                    className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-500'
                        }`}
                />
                <span>Đăng xuất hệ thống</span>
            </button>
        </div>
    );
}