import preview from '../.storybook/preview';
import { expect, mocked } from 'storybook/test';
import { createTask, fetchTasks } from './api/tasks';
import type { Task } from './types';
import App from './App';

const TASKS: Task[] = [
  { id: 't1', title: '請求書を送る', priority: 'high', done: false, createdAt: '2026-11-20T10:00:00.000Z' },
  { id: 't2', title: '部屋の掃除', priority: 'low', done: true, createdAt: '2026-11-19T18:00:00.000Z' },
];

const NEW_TASK: Task = { id: 't3', title: '牛乳を買う', priority: 'medium', done: false, createdAt: '2026-11-21T09:00:00.000Z' };

const meta = preview.meta({
  component: App,
  parameters: { layout: 'fullscreen' },
  beforeEach() {
    mocked(fetchTasks).mockResolvedValue(TASKS);
    mocked(createTask).mockResolvedValue(NEW_TASK);
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '一覧' })).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByRole('button', { name: '追加' })).not.toHaveAttribute('aria-current');
    await expect(await canvas.findByText('請求書を送る')).toBeVisible();
  },
});

export const SwitchToAdd = meta.story({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '追加' }));
    await expect(canvas.getByRole('heading', { name: 'タスクを追加' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '追加', current: 'page' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '一覧' })).not.toHaveAttribute('aria-current');
    await expect(canvas.queryByRole('heading', { name: 'タスク一覧' })).not.toBeInTheDocument();
  },
});

export const AddReturnsToList = meta.story({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '追加' }));
    await userEvent.type(canvas.getByLabelText('タイトル'), '牛乳を買う');
    mocked(fetchTasks).mockResolvedValue([...TASKS, NEW_TASK]);
    await userEvent.click(canvas.getByRole('button', { name: '追加', current: false }));
    await expect(await canvas.findByRole('heading', { name: 'タスク一覧' })).toBeVisible();
    await expect(await canvas.findByText('牛乳を買う')).toBeVisible();
    await expect(createTask).toHaveBeenCalledWith({ title: '牛乳を買う', priority: 'medium' });
  },
});
