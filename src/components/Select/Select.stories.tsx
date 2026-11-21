import preview from '../../../.storybook/preview';
import { expect, fn } from 'storybook/test';
import { PRIORITY_LABELS } from '../../types';
import { Select } from './Select';

const OPTIONS = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label }));

const meta = preview.meta({
  component: Select,
  tags: [],
  args: { label: '優先度', options: OPTIONS, onChange: fn() },
});

export const Default = meta.story({
  args: { value: 'medium' },
  play: async ({ canvas, userEvent, args }) => {
    const select = canvas.getByRole('combobox', { name: '優先度' });
    await expect(select).toHaveValue('medium');
    await userEvent.selectOptions(select, 'high');
    await expect(args.onChange).toHaveBeenCalledWith('high');
  },
});

export const HighSelected = meta.story({ args: { value: 'high' } });
