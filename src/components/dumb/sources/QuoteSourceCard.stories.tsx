import type { Meta, StoryObj } from '@storybook/react';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { QuoteSourceCard } from './QuoteSourceCard';

const meta = {
  title: 'Sources/QuoteSourceCard',
  component: QuoteSourceCard,
  args: {
    source: mockQuoteSources[0],
    selected: false,
    onToggle: () => undefined
  }
} satisfies Meta<typeof QuoteSourceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Dex: Story = {
  args: {
    source: mockQuoteSources[3]
  }
};
