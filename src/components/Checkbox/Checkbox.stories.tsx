import preview from '../../../.storybook/preview';
import { expect, fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = preview.meta({
  component: Checkbox,
  tags: [],
  args: { label: '追加したあとも続けて入力する', onChange: fn() },
});

export const Unchecked = meta.story({
  args: { checked: false },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('checkbox', { name: '追加したあとも続けて入力する' }));
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
});

export const Checked = meta.story({
  args: { checked: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeChecked();
  },
});

export const Disabled = meta.story({
  args: { checked: false, disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeDisabled();
  },
});
