import { Meta, StoryObj } from '@storybook/react';
import { FormSelectItem } from './index';
import { fn } from '@storybook/test';

export default {
  title: 'molecules/FormSelectItem',
  component: FormSelectItem,
} as Meta<typeof FormSelectItem>;

type Story = StoryObj<typeof FormSelectItem>;

export const Default: Story = {
  args: {
    title: 'タイトル',
    name: 'test',
    value: '1',
    list: [
      { value: 1, text: 'いち' },
      { value: 2, text: 'に' },
      { value: 3, text: 'さん' },
    ],
    onChange: fn(),
  },
};
