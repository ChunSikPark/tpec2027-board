export const MONTHS_ORDER = [
  'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December', 'January', 'February',
];

export const MONTH_INDEX: Record<string, number> = Object.fromEntries(
  MONTHS_ORDER.map((m, i) => [m, i + 1])
);

export const MONTH_ABBREV: Record<string, string> = {
  March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
  July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct',
  November: 'Nov', December: 'Dec', January: 'Jan', February: 'Feb',
};

export function getCurrentPlanningMonth(): string {
  const name = new Date().toLocaleString('en-US', { month: 'long' });
  return MONTHS_ORDER.includes(name) ? name : 'March';
}

export function isBeforeCurrentMonth(taskMonth: string): boolean {
  const currentIdx = MONTH_INDEX[getCurrentPlanningMonth()] ?? 1;
  const taskIdx = MONTH_INDEX[taskMonth] ?? 1;
  return taskIdx < currentIdx;
}
