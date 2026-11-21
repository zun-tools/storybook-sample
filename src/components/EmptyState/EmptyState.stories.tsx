import preview from '../../../.storybook/preview';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { EmptyState } from './EmptyState';

const meta = preview.meta({
  component: EmptyState,
  tags: [],
});

export const TitleOnly = meta.story({ args: { title: 'タスクはまだありません' } });

export const WithDescription = meta.story({
  args: { title: 'タスクはまだありません', description: '最初のタスクを追加しましょう。' },
});

export const WithAction = meta.story({
  args: {
    title: 'タスクはまだありません',
    description: '最初のタスクを追加しましょう。',
    action: <Button>タスクを追加</Button>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'タスクを追加' })).toBeEnabled();
  },
});
