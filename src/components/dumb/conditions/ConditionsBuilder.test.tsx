import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConditionsBuilder } from './ConditionsBuilder';

const draft = {
  name: 'Take Profit',
  action: 'SELL' as const,
  metric: 'positionProfitPercent',
  operator: 'GREATER_OR_EQUAL' as const,
  value: 0.5,
  base: ''
};

describe('ConditionsBuilder', () => {
  it('edits draft and adds valid condition', async () => {
    const user = userEvent.setup();
    const onDraftChange = vi.fn();
    const onAddCondition = vi.fn();

    render(
      <ConditionsBuilder
        conditions={[]}
        draft={draft}
        onAddCondition={onAddCondition}
        onDraftChange={onDraftChange}
      />
    );

    await user.clear(screen.getByLabelText('Condition Name'));
    await user.type(screen.getByLabelText('Condition Name'), 'Stop Loss');
    await user.click(screen.getByRole('button', { name: 'Add Condition' }));

    expect(onDraftChange).toHaveBeenCalled();
    expect(onAddCondition).toHaveBeenCalledOnce();
  });

  it('renders configured conditions and validation errors', () => {
    render(
      <ConditionsBuilder
        conditions={[
          {
            id: 'condition-1',
            name: 'Take Profit',
            enabled: true,
            action: 'SELL',
            priority: 1,
            when: {
              metric: 'positionProfitPercent',
              operator: 'GREATER_OR_EQUAL',
              value: 0.5
            }
          }
        ]}
        draft={{ ...draft, name: '', metric: 'unknownMetric' }}
        onAddCondition={() => undefined}
        onDraftChange={() => undefined}
      />
    );

    expect(screen.getByText('Take Profit')).toBeInTheDocument();
    expect(screen.getByText('Condition name is required.')).toBeInTheDocument();
    expect(screen.getByText('Unsupported metric: unknownMetric.')).toBeInTheDocument();
  });
});
