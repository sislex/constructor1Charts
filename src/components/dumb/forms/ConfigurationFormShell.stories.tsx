import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { ConfigurationFormShell } from './ConfigurationFormShell';

const meta = {
  title: 'Forms/ConfigurationFormShell',
  component: ConfigurationFormShell,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  args: {
    name: 'ETH Arbitrage Bot',
    selectedSources: [mockQuoteSources[0].key],
    quoteSources: mockQuoteSources,
    quoteSourcesLoading: false,
    quoteSourcesError: null,
    tradingMarket: mockQuoteSources[0].key,
    profitCurrency: 'USDC',
    weightedAverage: {
      enabled: false,
      sources: []
    },
    latestValues: {},
    exportedJson: '',
    onNameChange: () => undefined,
    onSourcesChange: () => undefined,
    onTradingMarketChange: () => undefined,
    onWeightedAverageChange: () => undefined,
    onExportJson: () => undefined
  }
} satisfies Meta<typeof ConfigurationFormShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    quoteSourcesLoading: true,
    quoteSources: []
  }
};

export const Empty: Story = {
  args: {
    quoteSources: [],
    selectedSources: [],
    tradingMarket: '',
    profitCurrency: ''
  }
};

export const Error: Story = {
  args: {
    quoteSourcesError: 'Failed to load quote sources.',
    quoteSources: [],
    selectedSources: []
  }
};

export const Disabled: Story = {
  args: {
    name: '',
    selectedSources: []
  }
};

export const Selected: Story = {
  args: {
    selectedSources: [mockQuoteSources[0].key, mockQuoteSources[1].key, mockQuoteSources[3].key]
  }
};
