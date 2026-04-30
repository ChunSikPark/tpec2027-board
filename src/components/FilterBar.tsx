import { MONTHS_ORDER, MONTH_ABBREV } from '../utils/months';

const AREAS = ['Directors', 'Finance', 'Logistics', 'Promotions'] as const;

interface FilterBarProps {
  activeMonth: string | null;
  activeAreas: string[];
  onMonthChange: (month: string | null) => void;
  onAreasChange: (areas: string[]) => void;
}

export default function FilterBar({ activeMonth, activeAreas, onMonthChange, onAreasChange }: FilterBarProps) {
  function toggleArea(area: string) {
    if (activeAreas.includes(area)) {
      onAreasChange(activeAreas.filter(a => a !== area));
    } else {
      onAreasChange([...activeAreas, area]);
    }
  }

  const areaColors: Record<string, { active: string; inactive: string }> = {
    Directors: { active: 'bg-indigo-600 text-white', inactive: 'bg-slate-700 text-indigo-400 hover:bg-indigo-900 hover:text-indigo-200' },
    Finance: { active: 'bg-amber-600 text-white', inactive: 'bg-slate-700 text-amber-400 hover:bg-amber-900 hover:text-amber-200' },
    Logistics: { active: 'bg-sky-600 text-white', inactive: 'bg-slate-700 text-sky-400 hover:bg-sky-900 hover:text-sky-200' },
    Promotions: { active: 'bg-emerald-600 text-white', inactive: 'bg-slate-700 text-emerald-400 hover:bg-emerald-900 hover:text-emerald-200' },
  };

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 space-y-2">
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => onMonthChange(null)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeMonth === null ? 'bg-slate-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'}`}
        >
          All
        </button>
        {MONTHS_ORDER.map(month => (
          <button
            key={month}
            onClick={() => onMonthChange(month === activeMonth ? null : month)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeMonth === month ? 'bg-slate-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'}`}
          >
            {MONTH_ABBREV[month]}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {AREAS.map(area => {
          const isActive = activeAreas.includes(area);
          const colors = areaColors[area];
          return (
            <button
              key={area}
              onClick={() => toggleArea(area)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${isActive ? colors.active : colors.inactive}`}
            >
              {area}
            </button>
          );
        })}
      </div>
    </div>
  );
}
