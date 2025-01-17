import { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './index';

export default {
  title: 'organisms/Navigation',
  component: Navigation,
  decorators: [(story) => <div style={{ width: '500px' }}>{story()}</div>],
} as Meta<typeof Navigation>;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {},
};
