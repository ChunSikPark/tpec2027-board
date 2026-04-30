import { useState, useEffect, useCallback } from 'react';
import { TASKS } from './tasks';
import { fetchBoardState, updateStatuses, subscribeToBoard } from './supabase';
import { getCurrentPlanningMonth } from './utils/months';
import { cycleStatus, type FilterState } from './utils/filters';
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

  const handleStatusChange = useCallback(async (taskId: string) => {
    const current = (statuses[taskId] ?? 'upcoming') as Status;
    const next = cycleStatus(current);
    const updated: Statuses = { ...statuses, [taskId]: next };
    setStatuses(updated);
    await updateStatuses(updated);
  }, [statuses]);

  const completedCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'completed').length;
  const inProgressCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'inprogress').length;
  const upcomingCount = TASKS.filter(t => (statuses[t.id] ?? 'upcoming') === 'upcoming').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
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
