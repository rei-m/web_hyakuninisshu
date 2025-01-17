import { Meta, StoryObj } from '@storybook/react';
import { Header } from './index';

export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'タイトル',
  },
};

export const WithBack: Story = {
  args: {
    ...Default.args,
    backUrl: '/',
  },
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    isDisplaySearch: true,
  },
};
