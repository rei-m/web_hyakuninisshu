import { Meta, StoryObj } from '@storybook/react';
import KarutaPlayingResult from './index';
import { fn } from '@storybook/test';

export default {
  title: 'organisms/KarutaPlayingResult',
  component: KarutaPlayingResult,
} as Meta<typeof KarutaPlayingResult>;

type Story = StoryObj<typeof KarutaPlayingResult>;

export const Default: Story = {
  args: {
    correctCount: 50,
    totalCount: 100,
    averageAnswerSecond: 5.6,
    onClickBack: fn(),
    onClickRestart: fn(),
  },
};
