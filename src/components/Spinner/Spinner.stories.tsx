import preview from '../../../.storybook/preview';
import { expect } from 'storybook/test';
import { Spinner } from './Spinner';

const meta = preview.meta({
  component: Spinner,
  tags: [],
});

export const Medium = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('読み込み中');
  },
});

export const Small = meta.story({ args: { size: 'sm' } });

export const CustomLabel = meta.story({
  args: { label: '保存中' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('保存中');
  },
});
