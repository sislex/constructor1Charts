import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';

const meta = {
  title: 'Dashboard/DashboardShell',
  component: DashboardShell,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  args: {
    theme: 'dark',
    configurationCount: 0,
    quoteSourceCount: 0,
    onThemeToggle: () => undefined
  }
} satisfies Meta<typeof DashboardShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    configurationCount: 3,
    quoteSourceCount: 24
  }
};

export const Empty: Story = {};

export const Loading: Story = {
  args: {
    configurationCount: 0,
    quoteSourceCount: 0
  }
};

export const Error: Story = {
  args: {
    configurationCount: 0,
    quoteSourceCount: 0
  }
};

export const Selected: Story = {
  args: {
    configurationCount: 1,
    quoteSourceCount: 6
  }
};
