import { Meta, StoryObj } from '@storybook/react';
import { MaterialListFilterView } from './index';
import { fn } from '@storybook/test';

export default {
  title: 'organisms/MaterialListFilterView',
  component: MaterialListFilterView,
} as Meta<typeof MaterialListFilterView>;

type Story = StoryObj<typeof MaterialListFilterView>;

export const Default: Story = {
  args: {
    isOpened: true,
    colorList: [
      { color: 'blue', checked: true },
      { color: 'green', checked: false },
    ],
    kimarijiList: [
      { kimariji: 1, checked: true },
      { kimariji: 2, checked: false },
    ],
    onChangeColor: fn(),
    onChangeKimariji: fn(),
    onClickClose: fn(),
  },
};
