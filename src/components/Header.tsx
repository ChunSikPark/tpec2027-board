import { formatRelativeTime } from '../utils/time';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  inProgressCount: number;
  upcomingCount: number;
  updatedAt: string | null;
}

export default function Header({ completedCount, totalCount, inProgressCount, upcomingCount, updatedAt }: HeaderProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-50" style={{
      background: 'linear-gradient(180deg, #0A1628 0%, #0D1117 100%)',
      borderBottom: '1px solid #1E2D42',
    }}>
      <div className="max-w-[90rem] mx-auto px-4 py-3">
        {/* Title row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.12em]" style={{
              fontFamily: 'var(--font-mono)',
              color: '#00E5FF',
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#00E5FF',
                display: 'inline-block',
                animation: 'dot-blink 2s ease-in-out infinite',
              }} />
              LIVE
            </span>
            <h1 className="text-sm font-bold tracking-[0.12em]" style={{
              fontFamily: 'var(--font-mono)',
              color: '#D4E8FF',
              fontSize: '13px',
            }}>
              TPEC 2027{' '}
              <span style={{ color: '#2A4A6A', fontWeight: 400 }}>//</span>{' '}
              PLANNING BOARD
            </h1>
          </div>
          {updatedAt && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#2A4A6A',
              letterSpacing: '0.05em',
            }}>
              UPD {formatRelativeTime(updatedAt)}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-2.5">
          <div style={{ height: '3px', background: '#1A2840', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #00E5FF, #00FF88)',
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
              borderRadius: '2px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 flex-wrap" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <span>
            <span style={{ color: '#D4E8FF', fontWeight: 700 }}>{completedCount}</span>
            <span style={{ color: '#2A4A6A' }}>/{totalCount}</span>
            <span style={{ color: '#2A4A6A', marginLeft: '4px' }}>DONE</span>
          </span>
          <span style={{ color: '#1A2840' }}>·</span>
          <span>
            <span style={{ color: '#00E5FF', fontWeight: 700 }}>{inProgressCount}</span>
            <span style={{ color: '#1A6070', marginLeft: '4px' }}>IN PROGRESS</span>
          </span>
          <span style={{ color: '#1A2840' }}>·</span>
          <span>
            <span style={{ color: '#8BA3BE', fontWeight: 700 }}>{upcomingCount}</span>
            <span style={{ color: '#2A4A6A', marginLeft: '4px' }}>UPCOMING</span>
          </span>
          <span className="ml-auto">
            <span style={{ color: '#00FF88', fontWeight: 700 }}>{pct}%</span>
            <span style={{ color: '#2A4A6A', marginLeft: '4px' }}>COMPLETE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
