import { Meta, StoryObj } from '@storybook/react';
import { VerticalTxt } from './index';

export default {
  title: 'atoms/VerticalTxt',
  component: VerticalTxt,
} as Meta<typeof VerticalTxt>;

type Story = StoryObj<typeof VerticalTxt>;

export const Default: Story = {
  args: {
    children: 'たてがきだよ',
    fontSize: '1.6rem',
  },
};
