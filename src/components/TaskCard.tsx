import { useState } from 'react';
import type { Task, Status } from '../types';

const AREA_BORDER: Record<string, string> = {
  Directors: 'border-indigo-500',
  Finance: 'border-amber-500',
  Logistics: 'border-sky-500',
  Promotions: 'border-emerald-500',
};

const AREA_BADGE: Record<string, string> = {
  Directors: 'bg-indigo-900 text-indigo-300',
  Finance: 'bg-amber-900 text-amber-300',
  Logistics: 'bg-sky-900 text-sky-300',
  Promotions: 'bg-emerald-900 text-emerald-300',
};

const STATUS_RING: Record<Status, string> = {
  upcoming: '',
  inprogress: 'ring-1 ring-sky-500',
  completed: 'opacity-60',
};

const OWNER_LABEL: Record<string, string> = {
  you: 'You',
  co: 'Co-director',
  both: 'Both',
};

const CYCLE_HINT: Record<Status, string> = {
  upcoming: '→ In Progress',
  inprogress: '→ Completed',
  completed: '→ Upcoming',
};

interface TaskCardProps {
  task: Task;
  status: Status;
  onStatusChange: (taskId: string) => void;
}

export default function TaskCard({ task, status, onStatusChange }: TaskCardProps) {
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <div
      className={`bg-slate-800 border-l-4 ${AREA_BORDER[task.area]} rounded-r-md p-3 ${STATUS_RING[status]} cursor-pointer select-none group`}
      onClick={() => onStatusChange(task.id)}
    >
      {task.urgent && (
        <span className="inline-block mb-1.5 text-xs font-bold text-amber-400">⚡ URGENT</span>
      )}
      <p className={`text-sm font-medium leading-snug ${status === 'completed' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
        {task.text}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">{task.month}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${AREA_BADGE[task.area]}`}>{task.area}</span>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">{OWNER_LABEL[task.owner]}</span>
      </div>
      {task.note && (
        <div className="mt-2">
          <button
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            onClick={e => { e.stopPropagation(); setNoteOpen(o => !o); }}
          >
            {noteOpen ? '▲ Hide note' : '▼ Show note'}
          </button>
          {noteOpen && (
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed border-t border-slate-700 pt-1.5">
              {task.note}
            </p>
          )}
        </div>
      )}
      <div className="mt-1.5 text-xs text-slate-600 group-hover:text-slate-500 transition-colors">
        Click {CYCLE_HINT[status]}
      </div>
    </div>
  );
}
