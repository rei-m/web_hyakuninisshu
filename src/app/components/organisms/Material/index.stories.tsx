import { Meta, StoryObj } from '@storybook/react';
import Material from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/Material',
  component: Material,
} as Meta<typeof Material>;

type Story = StoryObj<typeof Material>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
  },
};
