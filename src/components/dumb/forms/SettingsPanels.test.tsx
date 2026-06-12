import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AdvancedSettingsPanel } from './AdvancedSettingsPanel';
import { BuySettingsPanel } from './BuySettingsPanel';
import { DemoSettingsPanel } from './DemoSettingsPanel';
import { SellSettingsPanel } from './SellSettingsPanel';

describe('settings panels', () => {
  it('updates BUY amount type and amount', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <BuySettingsPanel
        profitCurrency="USDC"
        value={{ buyAmount: 100, buyCurrency: 'USDC', buyAmountType: 'FIXED' }}
        onChange={onChange}
      />
    );

    await user.selectOptions(screen.getByLabelText('Amount Type'), 'PERCENT');
    fireEvent.change(screen.getByLabelText('BUY Amount'), { target: { value: '25' } });

    expect(onChange).toHaveBeenCalledWith({
      buyAmount: 100,
      buyCurrency: 'USDC',
      buyAmountType: 'PERCENT'
    });
    expect(onChange).toHaveBeenLastCalledWith({
      buyAmount: 25,
      buyCurrency: 'USDC',
      buyAmountType: 'FIXED'
    });
  });

  it('updates SELL partial settings and validates percent', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SellSettingsPanel
        profitCurrency="USDC"
        value={{ sellAmount: 100, sellCurrency: 'USDC', sellMode: 'PARTIAL', sellPercent: 120 }}
        onChange={onChange}
      />
    );

    expect(screen.getByText('Partial SELL percent must be between 0 and 100.')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('SELL Mode'), 'FULL_POSITION');

    expect(onChange).toHaveBeenCalledWith({
      sellAmount: 100,
      sellCurrency: 'USDC',
      sellMode: 'FULL_POSITION',
      sellPercent: 120
    });
  });

  it('updates demo settings', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DemoSettingsPanel
        value={{ enabled: true, demoTransactionDelayMs: 5000 }}
        onChange={onChange}
      />
    );

    await user.click(screen.getByLabelText('Demo Mode'));

    expect(onChange).toHaveBeenCalledWith({ enabled: false, demoTransactionDelayMs: 5000 });
  });

  it('updates advanced settings and validates negatives', () => {
    const onChange = vi.fn();

    render(
      <AdvancedSettingsPanel
        value={{
          defaultSlippagePercent: -1,
          tradingFeePercent: 0.1,
          gasFee: 0,
          autoSaveEnabled: false,
          autoSaveIntervalMs: 30000
        }}
        onChange={onChange}
      />
    );

    expect(screen.getByText('Advanced numeric settings cannot be negative.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Gas Fee'), { target: { value: '2' } });

    expect(onChange).toHaveBeenCalledWith({
      defaultSlippagePercent: -1,
      tradingFeePercent: 0.1,
      gasFee: 2,
      autoSaveEnabled: false,
      autoSaveIntervalMs: 30000
    });
  });
});
