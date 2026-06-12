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

  it('emits export JSON action when form is valid', async () => {
    const user = userEvent.setup();
    const onExportJson = vi.fn();

    renderForm({ onExportJson });

    await user.click(screen.getByRole('button', { name: 'Export JSON' }));

    expect(onExportJson).toHaveBeenCalledOnce();
  });

  it('emits save configuration action when form is valid', async () => {
    const user = userEvent.setup();
    const onSaveConfiguration = vi.fn();

    renderForm({ onSaveConfiguration });

    await user.click(screen.getByRole('button', { name: 'Save Configuration' }));

    expect(onSaveConfiguration).toHaveBeenCalledOnce();
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

  it('emits buy, sell, demo and advanced settings changes', async () => {
    const user = userEvent.setup();
    const onBuySettingsChange = vi.fn();
    const onSellSettingsChange = vi.fn();
    const onDemoSettingsChange = vi.fn();
    const onAdvancedSettingsChange = vi.fn();

    renderForm({
      onBuySettingsChange,
      onSellSettingsChange,
      onDemoSettingsChange,
      onAdvancedSettingsChange
    });

    await user.selectOptions(screen.getByLabelText('Amount Type'), 'PERCENT');
    await user.selectOptions(screen.getByLabelText('SELL Mode'), 'PARTIAL');
    await user.click(screen.getByLabelText('Demo Mode'));
    await user.click(screen.getByLabelText('Auto Save'));

    expect(onBuySettingsChange).toHaveBeenCalledWith({
      buyAmount: 100,
      buyCurrency: 'USDC',
      buyAmountType: 'PERCENT'
    });
    expect(onSellSettingsChange).toHaveBeenCalledWith({
      sellAmount: 100,
      sellCurrency: 'USDC',
      sellMode: 'PARTIAL'
    });
    expect(onDemoSettingsChange).toHaveBeenCalledWith({
      enabled: false,
      demoTransactionDelayMs: 5000
    });
    expect(onAdvancedSettingsChange).toHaveBeenCalledWith({
      defaultSlippagePercent: 0.1,
      tradingFeePercent: 0.1,
      gasFee: 0,
      autoSaveEnabled: true,
      autoSaveIntervalMs: 30000
    });
  });

  it('emits condition draft and add condition actions', async () => {
    const user = userEvent.setup();
    const onConditionDraftChange = vi.fn();
    const onAddCondition = vi.fn();

    renderForm({ onConditionDraftChange, onAddCondition });

    await user.clear(screen.getByLabelText('Condition Name'));
    await user.type(screen.getByLabelText('Condition Name'), 'Stop Loss');
    await user.click(screen.getByRole('button', { name: 'Add Condition' }));

    expect(onConditionDraftChange).toHaveBeenCalled();
    expect(onAddCondition).toHaveBeenCalledOnce();
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
        weightedAverage={{ enabled: false, sources: [] }}
        buySettings={{ buyAmount: 100, buyCurrency: 'USDC', buyAmountType: 'FIXED' }}
        sellSettings={{ sellAmount: 100, sellCurrency: 'USDC', sellMode: 'FULL_POSITION' }}
        demoSettings={{ enabled: true, demoTransactionDelayMs: 5000 }}
        advancedSettings={{
          defaultSlippagePercent: 0.1,
          tradingFeePercent: 0.1,
          gasFee: 0,
          autoSaveEnabled: false,
          autoSaveIntervalMs: 30000
        }}
        conditions={[]}
        conditionDraft={{
          name: 'Take Profit',
          action: 'SELL',
          metric: 'positionProfitPercent',
          operator: 'GREATER_OR_EQUAL',
          value: 0.5,
          base: ''
        }}
        latestValues={{}}
        exportedJson=""
        onNameChange={() => undefined}
        onSourcesChange={() => undefined}
        onTradingMarketChange={() => undefined}
        onWeightedAverageChange={() => undefined}
        onBuySettingsChange={() => undefined}
        onSellSettingsChange={() => undefined}
        onDemoSettingsChange={() => undefined}
        onAdvancedSettingsChange={() => undefined}
        onConditionDraftChange={() => undefined}
        onAddCondition={() => undefined}
        onSaveConfiguration={() => undefined}
        onExportJson={() => undefined}
        {...props}
      />
    </MemoryRouter>
  );
}
