import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { BotConfiguration } from '@domainTypes/domain';
import { DashboardShell } from './DashboardShell';

describe('DashboardShell', () => {
  it('renders saved configurations and emits row actions', async () => {
    const user = userEvent.setup();
    const onDuplicateConfiguration = vi.fn();
    const onDeleteConfiguration = vi.fn();
    const onExportConfiguration = vi.fn();

    render(
      <MemoryRouter>
        <DashboardShell
          configurationCount={1}
          configurations={[createConfiguration()]}
          exportedJson=""
          quoteSourceCount={4}
          theme="dark"
          onDeleteConfiguration={onDeleteConfiguration}
          onDuplicateConfiguration={onDuplicateConfiguration}
          onExportConfiguration={onExportConfiguration}
          onThemeToggle={() => undefined}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('ETH Arbitrage Bot')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Export JSON' }));
    await user.click(screen.getByRole('button', { name: 'Duplicate' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onExportConfiguration).toHaveBeenCalledWith('config-1');
    expect(onDuplicateConfiguration).toHaveBeenCalledWith('config-1');
    expect(onDeleteConfiguration).toHaveBeenCalledWith('config-1');
  });
});

function createConfiguration(): BotConfiguration {
  return {
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
  };
}
