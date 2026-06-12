import type { Preview } from '@storybook/react';
import '../src/app/styles/theme.css';
import '../src/app/styles/global.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Application theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['dark', 'light'],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'light' ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      return <Story />;
    }
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
