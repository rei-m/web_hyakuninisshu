import { Meta, StoryObj } from '@storybook/react';
import YomiFudaView from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/YomiFudaView',
  component: YomiFudaView,
} as Meta<typeof YomiFudaView>;

type Story = StoryObj<typeof YomiFudaView>;

const karuta = KARUTA_LIST[0];

export const Default: Story = {
  args: {
    yomiFuda: {
      karutaNo: karuta.no,
      shoku: karuta.shoku.kanji,
      niku: karuta.niku.kanji,
      sanku: karuta.sanku.kanji,
    },
    answered: false,
    duration: 1000,
  },
};
