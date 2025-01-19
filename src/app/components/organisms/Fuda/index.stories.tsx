import { Meta, StoryObj } from '@storybook/react';
import Fuda from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/Fuda',
  component: Fuda,
} as Meta<typeof Fuda>;

type Story = StoryObj<typeof Fuda>;

const karuta = KARUTA_LIST[0];

export const Default: Story = {
  args: {
    karuta,
  },
};

export const SizeS: Story = {
  args: {
    ...Default.args,
    size: 's',
  },
};

export const SizeL: Story = {
  args: {
    ...Default.args,
    size: 'l',
  },
};
