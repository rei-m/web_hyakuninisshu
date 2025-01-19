import { Meta, StoryObj } from '@storybook/react';
import Heading from './index';

export default {
  title: 'atoms/Heading',
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const LEVEL_1: Story = {
  args: {
    children: 'タイトル',
    level: 1,
  },
};

export const LEVEL_2: Story = {
  args: {
    ...LEVEL_1.args,
    level: 2,
  },
};

export const LEVEL_3: Story = {
  args: {
    ...LEVEL_1.args,
    level: 3,
  },
};

export const LEVEL_4: Story = {
  args: {
    ...LEVEL_1.args,
    level: 4,
  },
};

export const LEVEL_5: Story = {
  args: {
    ...LEVEL_1.args,
    level: 5,
  },
};

export const LEVEL_6: Story = {
  args: {
    ...LEVEL_1.args,
    level: 6,
  },
};
