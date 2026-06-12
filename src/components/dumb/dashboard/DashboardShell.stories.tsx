import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';

const meta = {
  title: 'Dashboard/DashboardShell',
  component: DashboardShell,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  args: {
    theme: 'dark',
    configurations: [],
    configurationCount: 0,
    quoteSourceCount: 0,
    exportedJson: '',
    onDuplicateConfiguration: () => undefined,
    onDeleteConfiguration: () => undefined,
    onExportConfiguration: () => undefined,
    onThemeToggle: () => undefined
  }
} satisfies Meta<typeof DashboardShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    configurations: [
      {
        id: 'config-1',
        name: 'ETH Arbitrage Bot',
        tags: [],
        enabled: true,
        selectedSources: ['bybit|ETH/USDC|askPrice'],
        tradingMarket: 'bybit|ETH/USDC|askPrice',
        profitCurrency: 'USDC',
        weightedAverage: { enabled: false, sources: [] },
        conditions: [],
        conditionGroups: [],
        demoSettings: { enabled: true, demoTransactionDelayMs: 5000 },
        advancedSettings: {
          defaultSlippagePercent: 0.1,
          tradingFeePercent: 0.1,
          gasFee: 0,
          autoSaveEnabled: false,
          autoSaveIntervalMs: 30000
        },
        buySettings: { buyAmount: 100, buyCurrency: 'USDC', buyAmountType: 'FIXED' },
        sellSettings: { sellAmount: 100, sellCurrency: 'USDC', sellMode: 'FULL_POSITION' },
        createdAt: '2026-06-12T00:00:00.000Z',
        updatedAt: '2026-06-12T00:00:00.000Z',
        status: 'draft'
      }
    ],
    configurationCount: 3,
    quoteSourceCount: 24
  }
};

export const Empty: Story = {};

export const Loading: Story = {
  args: {
    configurationCount: 0,
    quoteSourceCount: 0
  }
};

export const Error: Story = {
  args: {
    configurationCount: 0,
    quoteSourceCount: 0
  }
};

export const Selected: Story = {
  args: {
    configurations: [],
    configurationCount: 1,
    quoteSourceCount: 6
  }
};
