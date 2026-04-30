import { MONTHS_ORDER, MONTH_ABBREV } from '../utils/months';

const AREAS = ['Directors', 'Finance', 'Logistics', 'Promotions'] as const;

const AREA_COLORS: Record<string, { dot: string }> = {
  Directors: { dot: '#7B93FF' },
  Finance:   { dot: '#FBBF24' },
  Logistics: { dot: '#38BDF8' },
  Promotions:{ dot: '#00FF88' },
};

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

  const monoStyle = { fontFamily: 'var(--font-mono)' } as const;
  const sansStyle = { fontFamily: 'var(--font-sans)' } as const;

  return (
    <div style={{ background: '#0F1520', borderBottom: '1px solid #1E2D42', padding: '10px 16px' }}>
      {/* Month row */}
      <div className="flex gap-1 flex-wrap items-center mb-2">
        <span style={{ ...monoStyle, fontSize: '9px', color: '#2A4A6A', letterSpacing: '0.18em', marginRight: '4px' }}>
          MONTH
        </span>
        <MonthPill label="ALL" active={activeMonth === null} onClick={() => onMonthChange(null)} />
        {MONTHS_ORDER.map(month => (
          <MonthPill
            key={month}
            label={MONTH_ABBREV[month].toUpperCase()}
            active={activeMonth === month}
            onClick={() => onMonthChange(month === activeMonth ? null : month)}
          />
        ))}
      </div>

      {/* Area row */}
      <div className="flex gap-1.5 flex-wrap items-center">
        <span style={{ ...monoStyle, fontSize: '9px', color: '#2A4A6A', letterSpacing: '0.18em', marginRight: '4px' }}>
          AREA
        </span>
        {AREAS.map(area => {
          const isActive = activeAreas.includes(area);
          const { dot } = AREA_COLORS[area];
          return (
            <button
              key={area}
              onClick={() => toggleArea(area)}
              style={{
                ...sansStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
                border: `1px solid ${isActive ? `${dot}50` : '#1E2D42'}`,
                color: isActive ? dot : '#4A6278',
                background: isActive ? `${dot}0F` : 'transparent',
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: dot,
                flexShrink: 0,
                boxShadow: isActive ? `0 0 5px ${dot}` : 'none',
              }} />
              {area}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MonthPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        padding: '2px 8px',
        borderRadius: '3px',
        border: `1px solid ${active ? 'rgba(0,229,255,0.5)' : '#1E2D42'}`,
        color: active ? '#00E5FF' : '#4A6278',
        background: active ? 'rgba(0,229,255,0.07)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.15s',
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </button>
  );
}
