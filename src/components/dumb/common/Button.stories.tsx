import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  args: {
    children: 'Create Configuration'
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
