import { Meta, StoryObj } from '@storybook/react';
import { ToriFudaView } from './index';
import { KARUTA_LIST } from '@/assets/karuta';
import { fn } from '@storybook/test';

export default {
  title: 'organisms/ToriFudaView',
  component: ToriFudaView,
} as Meta<typeof ToriFudaView>;

type Story = StoryObj<typeof ToriFudaView>;

const karuta = KARUTA_LIST[0];

export const Default: Story = {
  args: {
    toriFuda: {
      karutaNo: karuta.no,
      shiku: karuta.shiku.kana,
      kekku: karuta.kekku.kana,
    },
    onClick: fn(),
  },
};

export const WithThin: Story = {
  args: {
    ...Default.args,
    thin: true,
  },
};
