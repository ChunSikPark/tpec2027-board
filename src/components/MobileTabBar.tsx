import type { Status, Statuses, Task } from '../types';

const TABS: { status: Status; label: string }[] = [
  { status: 'upcoming', label: 'Upcoming' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'completed', label: 'Done' },
];

const TAB_ACTIVE: Record<Status, string> = {
  upcoming: 'border-slate-400 text-slate-200',
  inprogress: 'border-sky-400 text-sky-400',
  completed: 'border-emerald-400 text-emerald-400',
};

interface MobileTabBarProps {
  activeTab: Status;
  tasks: Task[];
  statuses: Statuses;
  onTabChange: (tab: Status) => void;
}

export default function MobileTabBar({ activeTab, tasks, statuses, onTabChange }: MobileTabBarProps) {
  function countForStatus(status: Status): number {
    return tasks.filter(t => (statuses[t.id] ?? 'upcoming') === status).length;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex z-20">
      {TABS.map(({ status, label }) => {
        const isActive = activeTab === status;
        return (
          <button
            key={status}
            onClick={() => onTabChange(status)}
            className={`flex-1 py-3 text-xs font-medium border-t-2 transition-colors ${isActive ? TAB_ACTIVE[status] : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            {label}
            <span className="ml-1 text-slate-500">({countForStatus(status)})</span>
          </button>
        );
      })}
    </div>
  );
}
