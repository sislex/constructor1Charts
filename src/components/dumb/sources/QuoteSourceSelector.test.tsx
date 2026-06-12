import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { QuoteSourceSelector } from './QuoteSourceSelector';

describe('QuoteSourceSelector', () => {
  it('selects multiple raw source keys', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <QuoteSourceSelector
        selectedKeys={[]}
        sources={mockQuoteSources}
        onSelectionChange={onSelectionChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /bybit.*ETH\/USDC.*askPrice/i }));

    expect(onSelectionChange).toHaveBeenCalledWith([mockQuoteSources[0].key]);
  });

  it('filters by source type and field', async () => {
    const user = userEvent.setup();

    render(
      <QuoteSourceSelector
        selectedKeys={[]}
        sources={mockQuoteSources}
        onSelectionChange={() => undefined}
      />
    );

    await user.selectOptions(screen.getByLabelText('Filter source type'), 'DEX');

    expect(screen.getByText('USDC/WETH')).toBeInTheDocument();
    expect(screen.queryByText('ETH/USDC')).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Filter quote field'), 'askPrice');

    expect(screen.getByText('No quote sources match current filters.')).toBeInTheDocument();
  });

  it('shows loading and error states', () => {
    const { rerender } = render(
      <QuoteSourceSelector
        loading
        selectedKeys={[]}
        sources={[]}
        onSelectionChange={() => undefined}
      />
    );

    expect(screen.getByText('Loading quote sources...')).toBeInTheDocument();

    rerender(
      <QuoteSourceSelector
        error="Failed"
        selectedKeys={[]}
        sources={[]}
        onSelectionChange={() => undefined}
      />
    );

    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});
