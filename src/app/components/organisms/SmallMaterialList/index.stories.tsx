import { Meta, StoryObj } from '@storybook/react';
import SmallMaterialList from './index';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/SmallMaterialList',
  component: SmallMaterialList,
} as Meta<typeof SmallMaterialList>;

type Story = StoryObj<typeof SmallMaterialList>;

export const Default: Story = {
  args: {
    karutaList: KARUTA_LIST,
  },
};
