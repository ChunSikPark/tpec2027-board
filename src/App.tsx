import { useState, useEffect, useCallback } from 'react';
import { TASKS } from './tasks';
import { fetchBoardState, updateStatuses, subscribeToBoard } from './supabase';
import { getCurrentPlanningMonth } from './utils/months';
import { type FilterState } from './utils/filters';
import type { Status, Statuses } from './types';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import KanbanBoard from './components/KanbanBoard';

export default function App() {
  const [statuses, setStatuses] = useState<Statuses>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterState>({
    activeMonth: getCurrentPlanningMonth(),
    activeAreas: [],
  });

  useEffect(() => {
    fetchBoardState()
      .then(({ statuses: s, updatedAt: u }) => {
        setStatuses(s);
        setUpdatedAt(u);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    const channel = subscribeToBoard((newStatuses, newUpdatedAt) => {
      setStatuses(newStatuses);
      setUpdatedAt(newUpdatedAt);
    });

    return () => { channel.unsubscribe(); };
  }, []);

  const handleStatusChange = useCallback(async (taskId: string, newStatus: Status) => {
    const updated: Statuses = { ...statuses, [taskId]: newStatus };
    setStatuses(updated);
    await updateStatuses(updated);
  }, [statuses]);

  const completedCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'completed').length;
  const inProgressCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'inprogress').length;
  const upcomingCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'upcoming').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D1117' }}>
        <div className="text-center">
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#00E5FF',
            marginBottom: '12px',
          }}>
            INITIALIZING BOARD
          </div>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#00E5FF',
                boxShadow: '0 0 6px #00E5FF',
                animation: `pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D1117', color: '#8BA3BE', fontFamily: 'var(--font-sans)' }}>
      <Header
        completedCount={completedCount}
        totalCount={TASKS.length}
        inProgressCount={inProgressCount}
        upcomingCount={upcomingCount}
        updatedAt={updatedAt}
      />
      <FilterBar
        activeMonth={filter.activeMonth}
        activeAreas={filter.activeAreas}
        onMonthChange={month => setFilter(f => ({ ...f, activeMonth: month }))}
        onAreasChange={areas => setFilter(f => ({ ...f, activeAreas: areas }))}
      />
      <KanbanBoard
        tasks={TASKS}
        statuses={statuses}
        filter={filter}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
