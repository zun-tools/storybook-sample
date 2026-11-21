import preview from '../../.storybook/preview';
import { expect, mocked } from 'storybook/test';
import { createTask } from '../api/tasks';
import { AddTaskPage } from './AddTaskPage';

const meta = preview.meta({
  component: AddTaskPage,
  tags: [],
  beforeEach() {
    mocked(createTask).mockImplementation(async (input) => ({
      ...input,
      id: 't1',
      done: false,
      createdAt: '2026-11-21T09:00:00.000Z',
    }));
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('combobox', { name: '優先度' })).toHaveValue('medium');
  },
});

export const EmptyTitleError = meta.story({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '追加' }));
    await expect(await canvas.findByText('タイトルを入れてください')).toBeVisible();
    await expect(createTask).not.toHaveBeenCalled();
  },
});

export const SubmitTask = meta.story({
  play: async ({ canvas, userEvent }) => {
    const title = canvas.getByLabelText('タイトル');
    await userEvent.type(title, '牛乳を買う');
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: '優先度' }), 'high');
    await userEvent.click(canvas.getByRole('button', { name: '追加' }));
    await expect(createTask).toHaveBeenCalledWith({ title: '牛乳を買う', priority: 'high' });
    await expect(title).toHaveValue('');
  },
});
