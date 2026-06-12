import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { TradingMarketSelector } from './TradingMarketSelector';

describe('TradingMarketSelector', () => {
  it('selects one market from selected sources', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TradingMarketSelector
        selectedSources={mockQuoteSources.slice(0, 2)}
        value=""
        onChange={onChange}
      />
    );

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Trading Market' }),
      mockQuoteSources[1].key
    );

    expect(onChange).toHaveBeenCalledWith(mockQuoteSources[1].key);
  });

  it('shows empty state before sources are selected', () => {
    render(<TradingMarketSelector selectedSources={[]} value="" onChange={() => undefined} />);

    expect(screen.getByText('Select quote sources before choosing a trading market.')).toBeInTheDocument();
  });
});
