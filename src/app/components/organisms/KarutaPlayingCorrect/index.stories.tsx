import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import KarutaPlayingCorrect from './index';
import { QuestionId } from '@/domains/models';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/KarutaPlayingCorrect',
  component: KarutaPlayingCorrect,
} as Meta<typeof KarutaPlayingCorrect>;

type Story = StoryObj<typeof KarutaPlayingCorrect>;

export const Default: Story = {
  args: {
    questionId: 1 as QuestionId,
    karuta: KARUTA_LIST[0],
    isAllAnswered: false,
    onClickGoToNext: fn(),
    onClickGoToResult: fn(),
  },
};

export const AllAnswerd: Story = {
  args: {
    ...Default.args,
    isAllAnswered: true,
  },
};
