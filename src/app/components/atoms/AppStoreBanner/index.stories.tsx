import { Meta, StoryObj } from '@storybook/react';
import { AppStoreBanner } from './index';

export default {
  title: 'atoms/AppStoreBanner',
  component: AppStoreBanner,
} as Meta<typeof AppStoreBanner>;

type Story = StoryObj<typeof AppStoreBanner>;

export const Default: Story = {};
