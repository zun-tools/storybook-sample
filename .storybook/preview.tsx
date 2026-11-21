import { definePreview } from '@storybook/react-vite'
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { sb } from 'storybook/test';
import '../src/index.css';

sb.mock(import('../src/api/tasks.ts'), { spy: true });

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
});