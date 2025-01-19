import { Meta, StoryObj } from '@storybook/react';
import NavigationItem from './index';

export default {
  title: 'molecules/NavigationItem',
  component: NavigationItem,
  decorators: [(story) => <div style={{ backgroundColor: '#000000' }}>{story()}</div>],
} as Meta<typeof NavigationItem>;

type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  args: {
    menuType: 'training',
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};
