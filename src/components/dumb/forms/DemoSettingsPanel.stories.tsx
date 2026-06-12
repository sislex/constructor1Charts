import type { Meta, StoryObj } from '@storybook/react';
import { DemoSettingsPanel } from './DemoSettingsPanel';

const meta = {
  title: 'Forms/DemoSettingsPanel',
  component: DemoSettingsPanel,
  args: {
    value: {
      enabled: true,
      demoTransactionDelayMs: 5000
    },
    onChange: () => undefined
  }
} satisfies Meta<typeof DemoSettingsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    value: {
      enabled: false,
      demoTransactionDelayMs: 5000
    }
  }
};

export const Error: Story = {
  args: {
    value: {
      enabled: true,
      demoTransactionDelayMs: -1
    }
  }
};
