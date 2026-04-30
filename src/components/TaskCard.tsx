import { useState } from 'react';
import type { Task, Status } from '../types';
import { isBeforeCurrentMonth } from '../utils/months';

const AREA_COLOR: Record<string, string> = {
  Directors:  '#7B93FF',
  Finance:    '#FBBF24',
  Logistics:  '#38BDF8',
  Promotions: '#00FF88',
};

const OWNER_LABEL: Record<string, string> = {
  you:  'You',
  co:   'Co-dir',
  both: 'Both',
};

interface TaskCardProps {
  task: Task;
  status: Status;
  onStatusChange: (taskId: string) => void;
}

export default function TaskCard({ task, status, onStatusChange }: TaskCardProps) {
  const [noteOpen, setNoteOpen] = useState(false);

  const areaColor   = AREA_COLOR[task.area];
  const isCompleted = status === 'completed';
  const isInProgress = status === 'inprogress';
  const isOverdue   = status === 'upcoming' && isBeforeCurrentMonth(task.month);
  const isUrgent    = task.urgent && !isCompleted;

  const borderColor = isOverdue ? '#FF4655' : areaColor;

  let boxShadow = 'none';
  if (isUrgent)      boxShadow = '0 0 14px rgba(255,107,0,0.18), inset 0 0 20px rgba(255,107,0,0.03)';
  else if (isInProgress) boxShadow = '0 0 10px rgba(0,229,255,0.10)';
  else if (isOverdue)    boxShadow = '0 0 10px rgba(255,70,85,0.12)';

  return (
    <div
      onClick={() => onStatusChange(task.id)}
      className="group relative cursor-pointer select-none"
      style={{
        background: isCompleted ? '#0A121E' : '#0F1520',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '0 5px 5px 0',
        padding: '10px 12px',
        opacity: isCompleted ? 0.5 : 1,
        boxShadow,
        transition: 'all 0.15s',
      }}
    >
      {/* In-progress top accent */}
      {isInProgress && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px', borderRadius: '0 5px 0 0',
          background: 'linear-gradient(90deg, rgba(0,229,255,0.5) 0%, transparent 100%)',
        }} />
      )}

      {/* Alert badges */}
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {isUrgent && (
          <Badge color="#FF6B00" label="⚡ URGENT" />
        )}
        {isOverdue && (
          <Badge color="#FF4655" label="OVERDUE" />
        )}
        {isInProgress && (
          <Badge color="#00E5FF" label="● ACTIVE" />
        )}
      </div>

      {/* Task text */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: '1.45',
        color: isCompleted ? '#3A5068' : '#D4E8FF',
        textDecoration: isCompleted ? 'line-through' : 'none',
        marginBottom: '8px',
      }}>
        {task.text}
      </p>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-1.5">
        <MetaBadge label={task.month.slice(0, 3).toUpperCase()} mono />
        <MetaBadge label={task.area} color={areaColor} />
        <MetaBadge label={OWNER_LABEL[task.owner]} mono />
      </div>

      {/* Note */}
      {task.note && (
        <div style={{ marginTop: '8px' }}>
          <button
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: '#2A4A6A',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={e => { e.stopPropagation(); setNoteOpen(o => !o); }}
          >
            {noteOpen ? '▲ hide note' : '▼ note'}
          </button>
          {noteOpen && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: '#6A8BA8',
              lineHeight: '1.5',
              marginTop: '6px',
              paddingTop: '6px',
              borderTop: '1px solid #1E2D42',
            }}>
              {task.note}
            </p>
          )}
        </div>
      )}

      {/* Hover hint */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: '#1A3A4A',
        marginTop: '6px',
        opacity: 0,
        transition: 'opacity 0.15s',
      }}
        className="group-hover:opacity-100"
      >
        {status === 'upcoming' ? 'click → active' : status === 'inprogress' ? 'click → done' : 'click → upcoming'}
      </div>
    </div>
  );
}

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.07em',
      padding: '2px 7px',
      borderRadius: '3px',
      color,
      background: `${color}12`,
      border: `1px solid ${color}35`,
    }}>
      {label}
    </span>
  );
}

function MetaBadge({ label, mono, color }: { label: string; mono?: boolean; color?: string }) {
  return (
    <span style={{
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: '10px',
      padding: '2px 7px',
      borderRadius: '3px',
      color: color ?? '#4A6278',
      background: color ? `${color}10` : '#0A121E',
      border: `1px solid ${color ? `${color}25` : '#1E2D42'}`,
    }}>
      {label}
    </span>
  );
}
