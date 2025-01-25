import { Meta, StoryObj } from '@storybook/react';
import MenuLink from './index';
import { TrainingIcon } from '@/components/atoms/MenuIcon';

export default {
  title: 'molecules/MenuLink',
  component: MenuLink,
} as Meta<typeof MenuLink>;

type Story = StoryObj<typeof MenuLink>;

export const Default: Story = {
  args: {
    href: 'example',
    icon: <TrainingIcon />,
    name: 'test',
    description: '説明',
  },
};
