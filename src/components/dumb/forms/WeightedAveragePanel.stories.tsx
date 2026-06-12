import type { Meta, StoryObj } from '@storybook/react';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { WeightedAveragePanel } from './WeightedAveragePanel';

const meta = {
  title: 'Forms/WeightedAveragePanel',
  component: WeightedAveragePanel,
  args: {
    selectedSources: mockQuoteSources.slice(0, 2),
    latestValues: {
      [mockQuoteSources[0].key]: 3524,
      [mockQuoteSources[1].key]: 3523
    },
    value: {
      enabled: true,
      sources: [
        { key: mockQuoteSources[0].key, weight: 0.5 },
        { key: mockQuoteSources[1].key, weight: 0.5 }
      ]
    },
    onChange: () => undefined
  }
} satisfies Meta<typeof WeightedAveragePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    value: {
      enabled: false,
      sources: []
    }
  }
};

export const Empty: Story = {
  args: {
    selectedSources: [],
    value: {
      enabled: false,
      sources: []
    }
  }
};

export const Error: Story = {
  args: {
    value: {
      enabled: true,
      sources: [
        { key: mockQuoteSources[0].key, weight: 0.2 },
        { key: mockQuoteSources[1].key, weight: 0.2 }
      ]
    }
  }
};

export const Selected: Story = {
  args: {
    selectedSources: mockQuoteSources.slice(0, 3)
  }
};
