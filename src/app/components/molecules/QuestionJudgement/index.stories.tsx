import { Meta, StoryObj } from '@storybook/react';
import QuestionJudgement from './index';
import { KARUTA_LIST } from '@/assets/karuta';
import { fn } from '@storybook/test';

export default {
  title: 'molecules/QuestionJudgement',
  component: QuestionJudgement,
} as Meta<typeof QuestionJudgement>;

type Story = StoryObj<typeof QuestionJudgement>;

export const Default: Story = {
  args: {
    karuta: KARUTA_LIST[0],
    correct: true,
    onClick: fn(),
  },
};

export const Incorrect: Story = {
  args: {
    ...Default.args,
    correct: false,
  },
};
