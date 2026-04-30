export type Status = 'upcoming' | 'inprogress' | 'completed';
export type Area = 'Directors' | 'Finance' | 'Logistics' | 'Promotions';
export type Owner = 'you' | 'co' | 'both';

export interface Task {
  id: string;
  month: string;
  area: Area;
  owner: Owner;
  urgent: boolean;
  text: string;
  note?: string;
}

export type Statuses = Record<string, Status>;
