import { Meta, StoryObj } from '@storybook/react';
import { FormSelectRangeItem } from './index';
import { fn } from '@storybook/test';

export default {
  title: 'molecules/FormSelectRangeItem',
  component: FormSelectRangeItem,
} as Meta<typeof FormSelectRangeItem>;

type Story = StoryObj<typeof FormSelectRangeItem>;

export const Default: Story = {
  args: {
    title: 'タイトル',
    from: {
      name: 'from',
      value: '1',
      list: [
        { value: 1, text: 'いち' },
        { value: 2, text: 'に' },
        { value: 3, text: 'さん' },
      ],
      onChange: fn(),
    },
    to: {
      name: 'to',
      value: '4',
      list: [
        { value: 4, text: 'よん' },
        { value: 5, text: 'ご' },
        { value: 6, text: 'ろく' },
      ],
      onChange: fn(),
    },
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'エラー',
  },
};
