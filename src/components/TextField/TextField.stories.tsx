import preview from '../../../.storybook/preview';
import { expect, fn } from 'storybook/test';
import { TextField } from './TextField';

const meta = preview.meta({
  component: TextField,
  tags: [],
  args: { label: 'タイトル', value: '', onChange: fn() },
});

export const Empty = meta.story({
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByLabelText('タイトル'), 'a');
    await expect(args.onChange).toHaveBeenCalledWith('a');
  },
});

export const Filled = meta.story({ args: { value: '牛乳を買う' } });

export const WithPlaceholder = meta.story({ args: { placeholder: '例: 牛乳を買う' } });

export const WithError = meta.story({
  args: { error: 'タイトルを入れてください' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('タイトルを入れてください')).toBeVisible();
  },
});

export const Search = meta.story({ args: { label: '検索', type: 'search', placeholder: 'タスクを検索' } });
