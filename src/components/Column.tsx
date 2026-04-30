import type { Task, Status, Statuses } from '../types';
import { MONTH_INDEX } from '../utils/months';
import TaskCard from './TaskCard';

const COLUMN_STYLES: Record<Status, { header: string; count: string }> = {
  upcoming: { header: 'text-slate-400', count: 'bg-slate-700 text-slate-400' },
  inprogress: { header: 'text-sky-400', count: 'bg-sky-900 text-sky-300' },
  completed: { header: 'text-emerald-400', count: 'bg-emerald-900 text-emerald-300' },
};

const COLUMN_LABELS: Record<Status, string> = {
  upcoming: 'UPCOMING',
  inprogress: 'IN PROGRESS',
  completed: 'COMPLETED',
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
  const styles = COLUMN_STYLES[status];

  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-2 mb-3 px-1">
        <h2 className={`text-xs font-bold tracking-widest ${styles.header}`}>
          {COLUMN_LABELS[status]}
        </h2>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.count}`}>
          {columnTasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {sorted.length === 0 && (
          <div className="text-xs text-slate-600 text-center py-8">No tasks</div>
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
