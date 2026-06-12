import type { Meta, StoryObj } from '@storybook/react';
import { SellSettingsPanel } from './SellSettingsPanel';

const meta = {
  title: 'Forms/SellSettingsPanel',
  component: SellSettingsPanel,
  args: {
    profitCurrency: 'USDC',
    value: {
      sellAmount: 100,
      sellCurrency: 'USDC',
      sellMode: 'FULL_POSITION'
    },
    onChange: () => undefined
  }
} satisfies Meta<typeof SellSettingsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    value: {
      sellAmount: 50,
      sellCurrency: 'USDC',
      sellMode: 'PARTIAL',
      sellPercent: 50
    }
  }
};

export const Error: Story = {
  args: {
    value: {
      sellAmount: 50,
      sellCurrency: 'USDC',
      sellMode: 'PARTIAL',
      sellPercent: 120
    }
  }
};
