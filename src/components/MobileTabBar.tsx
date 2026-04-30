import type { Status, Statuses, Task } from '../types';

const TABS: { status: Status; label: string; color: string }[] = [
  { status: 'upcoming',   label: 'UPCOMING',     color: '#8BA3BE' },
  { status: 'inprogress', label: 'IN PROGRESS',  color: '#00E5FF' },
  { status: 'completed',  label: 'DONE',         color: '#00FF88' },
];

interface MobileTabBarProps {
  activeTab: Status;
  tasks: Task[];
  statuses: Statuses;
  onTabChange: (tab: Status) => void;
}

export default function MobileTabBar({ activeTab, tasks, statuses, onTabChange }: MobileTabBarProps) {
  function countForStatus(s: Status) {
    return tasks.filter(t => (statuses[t.id] ?? 'upcoming') === s).length;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex z-20"
      style={{ background: '#0A1220', borderTop: '1px solid #1E2D42' }}
    >
      {TABS.map(({ status, label, color }) => {
        const isActive = activeTab === status;
        return (
          <button
            key={status}
            onClick={() => onTabChange(status)}
            className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-all duration-150"
            style={{
              borderTop: `2px solid ${isActive ? color : 'transparent'}`,
              background: isActive ? `${color}06` : 'transparent',
              cursor: 'pointer',
              border: 'none',
              borderTop: `2px solid ${isActive ? color : 'transparent'}`,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: isActive ? color : '#2A4A6A',
              textShadow: isActive ? `0 0 8px ${color}` : 'none',
            }}>
              {label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: isActive ? color : '#1E3048',
            }}>
              {countForStatus(status)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
