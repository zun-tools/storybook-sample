import preview from '../../../.storybook/preview';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  tags: [],
  args: { onClick: fn() },
});

export const Primary = meta.story({
  args: { children: '追加' },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '追加' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
});

export const Secondary = meta.story({ args: { variant: 'secondary', children: 'キャンセル' } });

export const Disabled = meta.story({
  args: { children: '追加', disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '追加' })).toBeDisabled();
  },
});

export const Loading = meta.story({
  args: { children: '追加', loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /追加/ })).toBeDisabled();
    await expect(canvas.getByRole('status')).toHaveTextContent('読み込み中');
  },
});

export const CssCheck = meta.story({
  args: { children: '送信' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '送信' });
    // Button.css: .btn--primary { background: #1d4ed8 } — fails if the component CSS did not load.
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(29, 78, 216)');
    // index.css: body { font-family: system-ui, sans-serif } — fails if the global CSS did not load.
    await expect(getComputedStyle(button.ownerDocument.body).fontFamily).toContain('system-ui');
  },
});
