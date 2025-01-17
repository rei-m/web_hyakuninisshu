import { Meta, StoryObj } from '@storybook/react';
import { Article } from './index';
import { Heading } from '../Heading';

export default {
  title: 'atoms/Article',
  component: Article,
} as Meta<typeof Article>;

type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    children: 'test',
    heading: <Heading>タイトル</Heading>,
  },
};
