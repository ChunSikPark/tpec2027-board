import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MONTHS_ORDER, MONTH_INDEX, MONTH_ABBREV, getCurrentPlanningMonth, isBeforeCurrentMonth } from './months';

describe('MONTHS_ORDER', () => {
  it('starts with March', () => { expect(MONTHS_ORDER[0]).toBe('March'); });
  it('ends with February', () => { expect(MONTHS_ORDER[11]).toBe('February'); });
  it('has exactly 12 months', () => { expect(MONTHS_ORDER).toHaveLength(12); });
});

describe('MONTH_INDEX', () => {
  it('assigns March index 1', () => { expect(MONTH_INDEX['March']).toBe(1); });
  it('assigns December index 10', () => { expect(MONTH_INDEX['December']).toBe(10); });
  it('assigns January index 11', () => { expect(MONTH_INDEX['January']).toBe(11); });
  it('assigns February index 12', () => { expect(MONTH_INDEX['February']).toBe(12); });
});

describe('MONTH_ABBREV', () => {
  it('abbreviates March as Mar', () => { expect(MONTH_ABBREV['March']).toBe('Mar'); });
  it('abbreviates September as Sep', () => { expect(MONTH_ABBREV['September']).toBe('Sep'); });
});

describe('getCurrentPlanningMonth', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns October when system date is October 2026', () => {
    vi.setSystemTime(new Date('2026-10-15'));
    expect(getCurrentPlanningMonth()).toBe('October');
  });

  it('returns March when system date is March 2026', () => {
    vi.setSystemTime(new Date('2026-03-15'));
    expect(getCurrentPlanningMonth()).toBe('March');
  });
});

describe('isBeforeCurrentMonth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-15'));
  });
  afterEach(() => { vi.useRealTimers(); });

  it('returns true for March (before October)', () => { expect(isBeforeCurrentMonth('March')).toBe(true); });
  it('returns true for September (before October)', () => { expect(isBeforeCurrentMonth('September')).toBe(true); });
  it('returns false for October itself', () => { expect(isBeforeCurrentMonth('October')).toBe(false); });
  it('returns false for November (after October)', () => { expect(isBeforeCurrentMonth('November')).toBe(false); });
  it('returns false for February (after October)', () => { expect(isBeforeCurrentMonth('February')).toBe(false); });
});
