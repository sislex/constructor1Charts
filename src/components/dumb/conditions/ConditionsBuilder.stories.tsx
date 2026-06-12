import type { Meta, StoryObj } from '@storybook/react';
import { ConditionsBuilder } from './ConditionsBuilder';

const meta = {
  title: 'Conditions/ConditionsBuilder',
  component: ConditionsBuilder,
  args: {
    conditions: [],
    draft: {
      name: 'Take Profit',
      action: 'SELL',
      metric: 'positionProfitPercent',
      operator: 'GREATER_OR_EQUAL',
      value: 0.5,
      base: ''
    },
    onDraftChange: () => undefined,
    onAddCondition: () => undefined
  }
} satisfies Meta<typeof ConditionsBuilder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {};

export const Active: Story = {
  args: {
    conditions: [
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
    ]
  }
};

export const Error: Story = {
  args: {
    draft: {
      name: '',
      action: 'BUY',
      metric: 'unknownMetric',
      operator: 'PERCENT_ABOVE',
      value: 0.2,
      base: ''
    }
  }
};
