# TPEC 2027 Planning Board — Agent Reference

## What This Is

A shared real-time kanban board for the two TPEC 2027 conference co-directors (ChunSik Park and co-director) to track all 50 planning tasks across the conference year (March 2026 – February 2027). Anyone with the URL can view and edit — no login required.

**Live URL:** Deployed on Vercel from `github.com/ChunSikPark/tpec2027-board`

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + inline styles for glow effects |
| Backend | Supabase (PostgreSQL + Realtime) |
| Hosting | Vercel (auto-deploys on push to `master`) |
| Tests | Vitest + @testing-library/react |

---

## Architecture

**Key design decision:** All 50 tasks are hardcoded in `src/tasks.ts`. Only task *statuses* are stored in Supabase. This means the DB has a single row with a JSONB `{taskId: status}` map.

### Supabase Schema
```sql
create table board_state (
  id int primary key default 1,
  statuses jsonb not null default '{}',
  updated_at timestamptz default now()
);
insert into board_state (id, statuses) values (1, '{}');
```

### Supabase Environment Variables (set in Vercel)
- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — your Supabase anon key

---

## File Map

```
src/
  types.ts              — Status, Area, Owner, Task, Statuses types
  tasks.ts              — All 50 TPEC 2027 tasks hardcoded (t0–t49)
  supabase.ts           — fetchBoardState(), updateStatuses(), subscribeToBoard()
  App.tsx               — Root: Supabase fetch, realtime sub, filter state
  index.css             — Global styles, CSS custom properties, @keyframes
  utils/
    months.ts           — MONTHS_ORDER (Mar→Feb), MONTH_INDEX, getCurrentPlanningMonth(), isBeforeCurrentMonth()
    months.test.ts      — 16 tests (all passing)
    filters.ts          — FilterState, isTaskVisible(), cycleStatus()
    filters.test.ts     — 13 tests (all passing)
    time.ts             — formatRelativeTime()
  components/
    Header.tsx          — Progress bar, live dot, monospace stats
    FilterBar.tsx       — Month pills (Mar–Feb) + area pills (multi-select)
    TaskCard.tsx        — Task card with glow effects, click-to-cycle status
    Column.tsx          — Kanban column with sorted tasks
    KanbanBoard.tsx     — Desktop 3-col grid / mobile tabbed view
    MobileTabBar.tsx    — Fixed bottom tab bar for mobile
```

---

## Visual Design — "Mission Control"

Dark near-black theme (`#0D1117`) with glowing status indicators.

**Fonts (loaded from Google Fonts):**
- `JetBrains Mono` — headers, labels, stats, badges
- `IBM Plex Sans` — task body text

**Color meanings:**
| Color | Hex | Meaning |
|-------|-----|---------|
| Cyan | `#00E5FF` | In Progress / active |
| Green | `#00FF88` | Completed |
| Orange | `#FF6B00` | Urgent |
| Red | `#FF4655` | Overdue (past month, not done) |
| Steel | `#8BA3BE` | Upcoming (neutral) |
| Indigo | `#7B93FF` | Directors area |
| Yellow | `#FBBF24` | Finance area |
| Sky | `#38BDF8` | Logistics area |
| Green | `#00FF88` | Promotions area |

**Glow effects use inline styles** (not Tailwind) because Tailwind v3 doesn't support arbitrary `box-shadow` colors easily.

---

## Planning Year Logic

The conference planning year runs **March → February** (not Jan → Dec).

- `MONTHS_ORDER` = `['March', 'April', ..., 'December', 'January', 'February']`
- `getCurrentPlanningMonth()` reads system clock → returns current month name
- On load, board defaults to filtering current month + any overdue (past month, not completed) tasks
- `isBeforeCurrentMonth(month)` uses `MONTH_INDEX` positions to compare

---

## Status Flow

Tasks cycle on click: `upcoming → inprogress → completed → upcoming`

Statuses stored in Supabase as: `'upcoming' | 'inprogress' | 'completed'`

---

## Known Windows/OneDrive Gotchas

**Path spaces break standard CLI tools.** The project lives in:
`D:\Project\OneDrive - Texas A&M University\Documents\Calude\tpec2027-board`

- **Tests:** Use `node ./node_modules/vitest/vitest.mjs run` (not `npm test` / `npx vitest`)
- **TypeScript:** Use `node ./node_modules/typescript/bin/tsc --noEmit`
- **Vite build:** Use `node ./node_modules/vite/bin/vite.js build`
- **npx commands** resolve path incorrectly on this machine — always use `node ./node_modules/...` directly

---

## How to Make Changes

1. Edit files in `src/`
2. `git add` the changed files
3. `git commit -m "description"`
4. `git push` → Vercel auto-deploys in ~1–2 min
5. Hard refresh (`Ctrl+Shift+R`) on the Vercel URL to see changes

---

## Adding or Editing Tasks

All tasks are in `src/tasks.ts`. Each task has:
```ts
{
  id: 't0',           // unique, never change once set
  text: 'Task name',
  month: 'April',     // must be in MONTHS_ORDER
  area: 'Directors',  // 'Directors' | 'Finance' | 'Logistics' | 'Promotions'
  owner: 'both',      // 'you' | 'co' | 'both'
  urgent: false,      // shows ⚡ URGENT badge
  note: 'optional',   // shown as expandable note on card
}
```

---

## Supabase Realtime

Both directors see status changes instantly without refreshing. The `subscribeToBoard()` function in `supabase.ts` uses Supabase Realtime postgres changes channel on the `board_state` table.

---

## Tests

Run with: `node ./node_modules/vitest/vitest.mjs run`

- `months.test.ts` — 16 tests for month ordering, indexing, current month detection
- `filters.test.ts` — 13 tests for task visibility and status cycling
- All 29 tests pass
