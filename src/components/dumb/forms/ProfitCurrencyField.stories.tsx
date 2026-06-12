import type { Meta, StoryObj } from '@storybook/react';
import { ProfitCurrencyField } from './ProfitCurrencyField';

const meta = {
  title: 'Forms/ProfitCurrencyField',
  component: ProfitCurrencyField,
  args: {
    value: 'USDC'
  }
} satisfies Meta<typeof ProfitCurrencyField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    value: ''
  }
};
