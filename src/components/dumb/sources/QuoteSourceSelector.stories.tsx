import type { Meta, StoryObj } from '@storybook/react';
import { mockQuoteSources } from '../../../mocks/quoteSources';
import { QuoteSourceSelector } from './QuoteSourceSelector';

const meta = {
  title: 'Sources/QuoteSourceSelector',
  component: QuoteSourceSelector,
  args: {
    sources: mockQuoteSources,
    selectedKeys: [],
    onSelectionChange: () => undefined
  }
} satisfies Meta<typeof QuoteSourceSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Empty: Story = {
  args: {
    sources: []
  }
};

export const Error: Story = {
  args: {
    error: 'Failed to load quote sources.'
  }
};

export const Selected: Story = {
  args: {
    selectedKeys: [mockQuoteSources[0].key, mockQuoteSources[3].key]
  }
};
