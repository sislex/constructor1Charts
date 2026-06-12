import type { Meta, StoryObj } from '@storybook/react';
import { BuySettingsPanel } from './BuySettingsPanel';

const meta = {
  title: 'Forms/BuySettingsPanel',
  component: BuySettingsPanel,
  args: {
    profitCurrency: 'USDC',
    value: {
      buyAmount: 100,
      buyCurrency: 'USDC',
      buyAmountType: 'FIXED'
    },
    onChange: () => undefined
  }
} satisfies Meta<typeof BuySettingsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    value: {
      buyAmount: 0,
      buyCurrency: 'USDC',
      buyAmountType: 'FIXED'
    }
  }
};

export const Selected: Story = {
  args: {
    value: {
      buyAmount: 25,
      buyCurrency: 'USDC',
      buyAmountType: 'PERCENT'
    }
  }
};
