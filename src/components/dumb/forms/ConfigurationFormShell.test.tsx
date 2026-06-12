import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { ConfigurationFormShell } from './ConfigurationFormShell';

describe('ConfigurationFormShell', () => {
  it('validates required name and sources', () => {
    renderForm({ name: '', selectedSources: [] });

    expect(screen.getByText('Configuration name is required.')).toBeInTheDocument();
    expect(screen.getByText('Select at least one quote source.')).toBeInTheDocument();
    expect(screen.getByText('Trading market is required.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Configuration' })).toBeDisabled();
  });

  it('emits name, source and market changes', async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    const onSourcesChange = vi.fn();
    const onTradingMarketChange = vi.fn();

    renderForm({ onNameChange, onSourcesChange, onTradingMarketChange });

    await user.type(screen.getByLabelText('Configuration Name'), 'A');
    await user.click(screen.getByRole('button', { name: /bybit.*ETH\/USDC.*askPrice/i }));
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Trading Market' }),
      mockQuoteSources[1].key
    );

    expect(onNameChange).toHaveBeenCalledWith('ETH Arbitrage BotA');
    expect(onSourcesChange).toHaveBeenCalledWith([
      mockQuoteSources[1].key,
      mockQuoteSources[0].key
    ]);
    expect(onTradingMarketChange).toHaveBeenCalledWith(mockQuoteSources[1].key);
  });
});

function renderForm(
  props: Partial<ComponentProps<typeof ConfigurationFormShell>> = {}
) {
  return render(
    <MemoryRouter>
      <ConfigurationFormShell
        name="ETH Arbitrage Bot"
        quoteSources={mockQuoteSources}
        quoteSourcesError={null}
        quoteSourcesLoading={false}
        selectedSources={[mockQuoteSources[1].key]}
        tradingMarket={mockQuoteSources[1].key}
        profitCurrency="USDC"
        onNameChange={() => undefined}
        onSourcesChange={() => undefined}
        onTradingMarketChange={() => undefined}
        {...props}
      />
    </MemoryRouter>
  );
}
