import type { Meta, StoryObj } from '@storybook/react';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { TradingMarketSelector } from './TradingMarketSelector';

const meta = {
  title: 'Forms/TradingMarketSelector',
  component: TradingMarketSelector,
  args: {
    selectedSources: mockQuoteSources.slice(0, 2),
    value: mockQuoteSources[0].key,
    onChange: () => undefined
  }
} satisfies Meta<typeof TradingMarketSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    selectedSources: [],
    value: ''
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Selected: Story = {
  args: {
    value: mockQuoteSources[1].key
  }
};
