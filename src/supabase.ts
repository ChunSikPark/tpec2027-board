import { createClient, type RealtimeChannel } from '@supabase/supabase-js';
import type { Statuses } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchBoardState(): Promise<{ statuses: Statuses; updatedAt: string }> {
  const { data, error } = await supabase
    .from('board_state')
    .select('statuses, updated_at')
    .eq('id', 1)
    .single();

  if (error) throw error;
  return {
    statuses: (data.statuses ?? {}) as Statuses,
    updatedAt: data.updated_at as string,
  };
}

export async function updateStatuses(statuses: Statuses): Promise<void> {
  const { error } = await supabase
    .from('board_state')
    .upsert({ id: 1, statuses, updated_at: new Date().toISOString() });

  if (error) throw error;
}

export function subscribeToBoard(
  callback: (statuses: Statuses, updatedAt: string) => void
): RealtimeChannel {
  return supabase
    .channel('board_state_changes')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'board_state' },
      (payload) => {
        callback(payload.new.statuses as Statuses, payload.new.updated_at as string);
      }
    )
    .subscribe();
}
