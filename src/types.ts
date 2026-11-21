export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: string;
}

export type NewTask = Pick<Task, 'title' | 'priority'>;

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};
