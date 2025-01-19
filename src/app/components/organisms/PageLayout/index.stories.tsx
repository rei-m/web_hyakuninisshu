import { Meta, StoryObj } from '@storybook/react';
import PageLayout from './index';

export default {
  title: 'organisms/PageLayout',
  component: PageLayout,
  decorators: [(story) => <div style={{ width: '100vw' }}>{story()}</div>],
} as Meta<typeof PageLayout>;

type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    children: 'コンテンツ',
    title: 'タイトル',
    isDisplayNav: false,
  },
};

export const WithNav: Story = {
  args: {
    ...Default.args,
    isDisplayNav: true,
  },
};
