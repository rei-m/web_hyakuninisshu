import { Meta, StoryObj } from '@storybook/react';
import KarutaImage from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'atoms/KarutaImage',
  component: KarutaImage,
} as Meta<typeof KarutaImage>;

type Story = StoryObj<typeof KarutaImage>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
    width: 200,
  },
};
