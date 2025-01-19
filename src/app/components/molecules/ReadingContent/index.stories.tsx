import { Meta, StoryObj } from '@storybook/react';
import ReadingContent from './index';

export default {
  title: 'molecules/ReadingContent',
  component: ReadingContent,
} as Meta<typeof ReadingContent>;

type Story = StoryObj<typeof ReadingContent>;

export const Default: Story = {
  args: {
    children: 'コンテンツ',
    title: 'タイトル',
  },
};
