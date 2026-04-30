import type { Task, Status, Statuses } from '../types';
import { MONTH_INDEX } from '../utils/months';
import TaskCard from './TaskCard';

const COLUMN_CONFIG: Record<Status, { label: string; color: string; dimBg: string }> = {
  upcoming:   { label: 'UPCOMING',    color: '#8BA3BE', dimBg: '#0A1220' },
  inprogress: { label: 'IN PROGRESS', color: '#00E5FF', dimBg: '#001A24' },
  completed:  { label: 'COMPLETED',   color: '#00FF88', dimBg: '#001A12' },
};

interface ColumnProps {
  status: Status;
  tasks: Task[];
  statuses: Statuses;
  onStatusChange: (taskId: string) => void;
}

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    return (MONTH_INDEX[a.month] ?? 0) - (MONTH_INDEX[b.month] ?? 0);
  });
}

export default function Column({ status, tasks, statuses, onStatusChange }: ColumnProps) {
  const columnTasks = tasks.filter(t => (statuses[t.id] ?? 'upcoming') === status);
  const sorted = sortTasks(columnTasks);
  const { label, color, dimBg } = COLUMN_CONFIG[status];

  return (
    <div className="flex flex-col min-w-0">
      {/* Column header */}
      <div
        className="flex items-center gap-2 mb-3 px-2 py-2 rounded-md"
        style={{ background: dimBg, border: `1px solid ${color}18` }}
      >
        <span style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: color, flexShrink: 0,
          boxShadow: `0 0 6px ${color}`,
        }} />
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          color,
          flex: 1,
          margin: 0,
        }}>
          {label}
        </h2>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          padding: '1px 8px',
          borderRadius: '20px',
          color,
          background: `${color}12`,
          border: `1px solid ${color}30`,
        }}>
          {columnTasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-2 flex-1">
        {sorted.length === 0 && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#1E3048',
            textAlign: 'center',
            padding: '32px 0',
            letterSpacing: '0.1em',
          }}>
            NO TASKS
          </div>
        )}
        {sorted.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            status={(statuses[task.id] ?? 'upcoming') as Status}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
