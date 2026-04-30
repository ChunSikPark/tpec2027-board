import type { Status, Task } from '../types';
import { isBeforeCurrentMonth } from './months';

export interface FilterState {
  activeMonth: string | null;
  activeAreas: string[];
}

export function isTaskVisible(task: Task, status: Status, filter: FilterState): boolean {
  const { activeMonth, activeAreas } = filter;

  const monthMatch =
    activeMonth === null ||
    task.month === activeMonth ||
    (isBeforeCurrentMonth(task.month) && status !== 'completed');

  const areaMatch =
    activeAreas.length === 0 ||
    activeAreas.includes(task.area);

  return monthMatch && areaMatch;
}

export function cycleStatus(current: Status): Status {
  const cycle: Status[] = ['upcoming', 'inprogress', 'completed'];
  return cycle[(cycle.indexOf(current) + 1) % cycle.length];
}
