import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isTaskVisible, cycleStatus } from './filters';
import type { Task } from '../types';

const baseTask: Task = {
  id: 't0', month: 'October', area: 'Finance', owner: 'you', urgent: false, text: 'Test task',
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-15'));
});
afterEach(() => { vi.useRealTimers(); });

describe('isTaskVisible — month filter', () => {
  it('shows task when activeMonth is null', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: null, activeAreas: [] })).toBe(true);
  });
  it('shows task matching active month', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: 'October', activeAreas: [] })).toBe(true);
  });
  it('hides task not matching active month', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: 'November', activeAreas: [] })).toBe(false);
  });
  it('shows overdue upcoming task even when different month is active', () => {
    const t = { ...baseTask, month: 'March' };
    expect(isTaskVisible(t, 'upcoming', { activeMonth: 'October', activeAreas: [] })).toBe(true);
  });
  it('shows overdue inprogress task even when different month is active', () => {
    const t = { ...baseTask, month: 'March' };
    expect(isTaskVisible(t, 'inprogress', { activeMonth: 'October', activeAreas: [] })).toBe(true);
  });
  it('hides completed overdue task when different month is active', () => {
    const t = { ...baseTask, month: 'March' };
    expect(isTaskVisible(t, 'completed', { activeMonth: 'October', activeAreas: [] })).toBe(false);
  });
});

describe('isTaskVisible — area filter', () => {
  it('shows task when no areas selected', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: null, activeAreas: [] })).toBe(true);
  });
  it('shows task matching area', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: null, activeAreas: ['Finance'] })).toBe(true);
  });
  it('hides task not matching area', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: null, activeAreas: ['Logistics'] })).toBe(false);
  });
  it('shows task in multi-select area list', () => {
    expect(isTaskVisible(baseTask, 'upcoming', { activeMonth: null, activeAreas: ['Finance', 'Logistics'] })).toBe(true);
  });
});

describe('cycleStatus', () => {
  it('cycles upcoming → inprogress', () => { expect(cycleStatus('upcoming')).toBe('inprogress'); });
  it('cycles inprogress → completed', () => { expect(cycleStatus('inprogress')).toBe('completed'); });
  it('cycles completed → upcoming', () => { expect(cycleStatus('completed')).toBe('upcoming'); });
});
