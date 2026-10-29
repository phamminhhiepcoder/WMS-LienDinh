import { BuildingComplex } from 'lucide-react';

interface AdminFooterProps {
    darkMode: boolean;
    onLogout: () => void;
}

export default function AdminFooter({
    darkMode,
}: AdminFooterProps) {
    return (
        <div
            className={`p-4 border-t transition-colors duration-300 ${darkMode
                ? 'border-slate-800 bg-slate-950/70'
                : 'border-slate-100 bg-slate-50/50'
                }`}
        >
            <div
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${darkMode
                    ? 'border-slate-700 bg-slate-900/80'
                    : 'border-slate-200 bg-white shadow-sm'
                    }`}
            >
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-blue-50 text-blue-600'
                        }`}
                >
                    <BuildingComplex className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <p
                        className={`truncate text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'
                            }`}
                    >
                        Liên Dinh
                    </p>
                </div>

                <span
                    className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                    title="System"
                />
            </div>
        </div>
    );
}