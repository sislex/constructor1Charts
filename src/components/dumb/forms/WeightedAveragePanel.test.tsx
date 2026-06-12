import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { WeightedAveragePanel } from './WeightedAveragePanel';

describe('WeightedAveragePanel', () => {
  it('enables weighted average and creates default weights', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <WeightedAveragePanel
        latestValues={{}}
        selectedSources={mockQuoteSources.slice(0, 2)}
        value={{ enabled: false, sources: [] }}
        onChange={onChange}
      />
    );

    await user.click(screen.getByLabelText('Enable Weighted Average'));

    expect(onChange).toHaveBeenCalledWith({
      enabled: true,
      sources: [
        { key: mockQuoteSources[0].key, weight: 0.5 },
        { key: mockQuoteSources[1].key, weight: 0.5 }
      ]
    });
  });

  it('edits source weights and shows validation errors', () => {
    const onChange = vi.fn();

    render(
      <WeightedAveragePanel
        latestValues={{ [mockQuoteSources[0].key]: 100, [mockQuoteSources[1].key]: 200 }}
        selectedSources={mockQuoteSources.slice(0, 2)}
        value={{
          enabled: true,
          sources: [
            { key: mockQuoteSources[0].key, weight: 0.2 },
            { key: mockQuoteSources[1].key, weight: 0.2 }
          ]
        }}
        onChange={onChange}
      />
    );

    expect(screen.getByText('Weights sum must be equal to 1.0 or 100%.')).toBeInTheDocument();

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '0.8' } });

    expect(onChange).toHaveBeenLastCalledWith({
      enabled: true,
      sources: [
        { key: mockQuoteSources[0].key, weight: 0.8 },
        { key: mockQuoteSources[1].key, weight: 0.2 }
      ]
    });
  });
});
