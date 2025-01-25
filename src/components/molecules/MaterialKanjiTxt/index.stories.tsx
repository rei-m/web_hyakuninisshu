import { Meta, StoryObj } from '@storybook/react';
import MaterialKanjiTxt from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'molecules/MaterialKanjiTxt',
  component: MaterialKanjiTxt,
} as Meta<typeof MaterialKanjiTxt>;

type Story = StoryObj<typeof MaterialKanjiTxt>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
  },
};
