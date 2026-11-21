import preview from '../../../.storybook/preview';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { Card } from './Card';

const meta = preview.meta({
  component: Card,
  tags: [],
});

export const WithTitle = meta.story({
  args: { title: 'タスクを追加', children: <p>タイトルと優先度を入れてください。</p> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: 'タスクを追加' })).toBeVisible();
  },
});

export const WithoutTitle = meta.story({ args: { children: <p>見出しの無いカード</p> } });

export const WithFooter = meta.story({
  args: {
    title: 'タスクを追加',
    children: <p>タイトルと優先度を入れてください。</p>,
    footer: <Button variant="secondary">閉じる</Button>,
  },
});
