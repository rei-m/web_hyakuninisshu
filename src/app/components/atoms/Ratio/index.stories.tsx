import { Meta, StoryObj } from '@storybook/react';
import Ratio from './index';

export default {
  title: 'atoms/Ratio',
  component: Ratio,
} as Meta<typeof Ratio>;

type Story = StoryObj<typeof Ratio>;

export const Default: Story = {
  args: {
    denominator: 100,
    numerator: 50,
  },
};
