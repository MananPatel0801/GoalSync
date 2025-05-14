export type KanbanStatus = 'To Do' | 'In Progress' | 'Done';

export const KANBAN_STATUSES: KanbanStatus[] = ['To Do', 'In Progress', 'Done'];

export interface KeyResult {
  id: string;
  description: string;
  progress: number; // 0-100
}

export interface Objective {
  id: string;
  title: string;
  period: 'Weekly' | 'Monthly';
  keyResults: KeyResult[];
  status: KanbanStatus;
  createdAt: string; // ISO date string
}
