import { useState } from 'react';
import type { Task, Status, Statuses } from '../types';
import { isTaskVisible, type FilterState } from '../utils/filters';
import Column from './Column';
import MobileTabBar from './MobileTabBar';

interface KanbanBoardProps {
  tasks: Task[];
  statuses: Statuses;
  filter: FilterState;
  onStatusChange: (taskId: string) => void;
}

const COLUMN_ORDER: Status[] = ['upcoming', 'inprogress', 'completed'];

export default function KanbanBoard({ tasks, statuses, filter, onStatusChange }: KanbanBoardProps) {
  const [mobileTab, setMobileTab] = useState<Status>('upcoming');

  const visibleTasks = tasks.filter(task =>
    isTaskVisible(task, (statuses[task.id] ?? 'upcoming') as Status, filter)
  );

  return (
    <>
      {/* Desktop: 3 columns side by side */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {COLUMN_ORDER.map(status => (
          <Column
            key={status}
            status={status}
            tasks={visibleTasks}
            statuses={statuses}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Mobile: one column at a time + fixed tab bar */}
      <div className="md:hidden p-4 pb-20">
        <Column
          status={mobileTab}
          tasks={visibleTasks}
          statuses={statuses}
          onStatusChange={onStatusChange}
        />
        <MobileTabBar
          activeTab={mobileTab}
          tasks={visibleTasks}
          statuses={statuses}
          onTabChange={setMobileTab}
        />
      </div>
    </>
  );
}
