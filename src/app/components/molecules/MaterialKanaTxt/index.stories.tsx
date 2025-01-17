import { Meta, StoryObj } from '@storybook/react';
import { MaterialKanaTxt } from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'molecules/MaterialKanaTxt',
  component: MaterialKanaTxt,
} as Meta<typeof MaterialKanaTxt>;

type Story = StoryObj<typeof MaterialKanaTxt>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
  },
};
