import preview from '../../.storybook/preview';
import { expect, mocked } from 'storybook/test';
import { fetchTasks } from '../api/tasks';
import type { Task } from '../types';
import { TaskListPage } from './TaskListPage';

const TASKS: Task[] = [
  { id: 't1', title: '牛乳を買う', priority: 'medium', done: false, createdAt: '2026-11-20T09:00:00.000Z' },
  { id: 't2', title: '請求書を送る', priority: 'high', done: false, createdAt: '2026-11-20T10:00:00.000Z' },
  { id: 't3', title: '部屋の掃除', priority: 'low', done: true, createdAt: '2026-11-19T18:00:00.000Z' },
  { id: 't4', title: '歯医者の予約を取る', priority: 'high', done: true, createdAt: '2026-11-18T12:00:00.000Z' },
];

const meta = preview.meta({
  component: TaskListPage,
  beforeEach() {
    mocked(fetchTasks).mockResolvedValue(TASKS);
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    const list = await canvas.findByRole('list', { name: 'タスク' });
    await expect(list.querySelectorAll('li')).toHaveLength(4);
    await expect(canvas.getByRole('combobox', { name: '状態' })).toHaveValue('all');
  },
});

export const Loading = meta.story({
  beforeEach() {
    mocked(fetchTasks).mockReturnValue(new Promise(() => {}));
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('タスクを読み込み中');
    await expect(canvas.queryByRole('list', { name: 'タスク' })).not.toBeInTheDocument();
  },
});

export const NoTasks = meta.story({
  beforeEach() {
    mocked(fetchTasks).mockResolvedValue([]);
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('タスクはまだありません')).toBeVisible();
  },
});

export const LoadFailed = meta.story({
  beforeEach() {
    mocked(fetchTasks).mockRejectedValue(new Error('storage unavailable'));
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('タスクを読み込めませんでした')).toBeVisible();
  },
});

export const Search = meta.story({
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('list', { name: 'タスク' });
    await userEvent.type(canvas.getByRole('searchbox', { name: '検索' }), '請求書');
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
    await expect(items[0]).toHaveTextContent('請求書を送る');
  },
});

export const FilterOpen = meta.story({
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('list', { name: 'タスク' });
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: '状態' }), 'open');
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(2);
    await expect(canvas.queryByText('部屋の掃除')).not.toBeInTheDocument();
  },
});

export const FilterDone = meta.story({
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('list', { name: 'タスク' });
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: '状態' }), 'done');
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(2);
    await expect(canvas.queryByText('牛乳を買う')).not.toBeInTheDocument();
  },
});

export const NoMatches = meta.story({
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('list', { name: 'タスク' });
    await userEvent.type(canvas.getByRole('searchbox', { name: '検索' }), '旅行');
    await expect(await canvas.findByText('条件に合うタスクはありません')).toBeVisible();
    await expect(canvas.queryByRole('list', { name: 'タスク' })).not.toBeInTheDocument();
  },
});
