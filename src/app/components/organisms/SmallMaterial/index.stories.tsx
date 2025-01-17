import { Meta, StoryObj } from '@storybook/react';
import { SmallMaterial } from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/SmallMaterial',
  component: SmallMaterial,
} as Meta<typeof SmallMaterial>;

type Story = StoryObj<typeof SmallMaterial>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
  },
};

export const WithoutImage: Story = {
  args: {
    ...Default.args,
    image: false,
  },
};
