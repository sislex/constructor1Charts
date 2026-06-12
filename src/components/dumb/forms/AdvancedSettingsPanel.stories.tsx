import type { Meta, StoryObj } from '@storybook/react';
import { AdvancedSettingsPanel } from './AdvancedSettingsPanel';

const meta = {
  title: 'Forms/AdvancedSettingsPanel',
  component: AdvancedSettingsPanel,
  args: {
    value: {
      defaultSlippagePercent: 0.1,
      tradingFeePercent: 0.1,
      gasFee: 0,
      autoSaveEnabled: false,
      autoSaveIntervalMs: 30000
    },
    onChange: () => undefined
  }
} satisfies Meta<typeof AdvancedSettingsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    value: {
      defaultSlippagePercent: 0.2,
      tradingFeePercent: 0.15,
      gasFee: 1.5,
      autoSaveEnabled: true,
      autoSaveIntervalMs: 10000
    }
  }
};

export const Error: Story = {
  args: {
    value: {
      defaultSlippagePercent: -1,
      tradingFeePercent: 0.1,
      gasFee: 0,
      autoSaveEnabled: false,
      autoSaveIntervalMs: 30000
    }
  }
};
