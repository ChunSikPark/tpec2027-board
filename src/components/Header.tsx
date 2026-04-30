import { formatRelativeTime } from '../utils/time';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  inProgressCount: number;
  upcomingCount: number;
  updatedAt: string | null;
}

export default function Header({ completedCount, totalCount, inProgressCount, upcomingCount, updatedAt }: HeaderProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg font-bold text-slate-100 tracking-wide">TPEC 2027 Planning Board</h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 bg-slate-700 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 whitespace-nowrap tabular-nums">
            {completedCount}/{totalCount} done ({pct}%)
          </span>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-slate-500">
          <span>{upcomingCount} upcoming</span>
          <span className="text-sky-400">{inProgressCount} in progress</span>
          <span className="text-emerald-400">{completedCount} completed</span>
          {updatedAt && (
            <span className="ml-auto">updated {formatRelativeTime(updatedAt)}</span>
          )}
        </div>
      </div>
    </header>
  );
}
