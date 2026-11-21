import preview from '../../../.storybook/preview';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = preview.meta({
  component: Badge,
  tags: [],
});

export const Neutral = meta.story({
  args: { children: '未着手' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('未着手')).toHaveClass('badge--neutral');
  },
});

export const Info = meta.story({ args: { tone: 'info', children: '中' } });
export const Success = meta.story({ args: { tone: 'success', children: '完了' } });
export const Danger = meta.story({ args: { tone: 'danger', children: '高' } });
