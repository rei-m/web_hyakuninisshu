import { Meta, StoryObj } from '@storybook/react';
import { TrainingMenuFormView } from './index';
import { fn } from '@storybook/test';

export default {
  title: 'organisms/TrainingMenuFormView',
  component: TrainingMenuFormView,
} as Meta<typeof TrainingMenuFormView>;

type Story = StoryObj<typeof TrainingMenuFormView>;

export const Default: Story = {
  args: {
    value: {
      rangeFrom: 1,
      rangeTo: 100,
      kimariji: null,
      color: null,
      kamiNoKuStyle: 'kanji',
      shimoNoKuStyle: 'kana',
      questionAnim: 'normal',
    },
    errors: {},
    setters: {
      rangeFrom: fn(),
      rangeTo: fn(),
      kimariji: fn(),
      color: fn(),
      kamiNoKuStyle: fn(),
      shimoNoKuStyle: fn(),
      questionAnim: fn(),
    },
    onSubmit: fn(),
  },
};

export const WithLocalError: Story = {
  args: {
    ...Default.args,
    errors: {
      range: '範囲エラー',
    },
  },
};

export const WithEmptyError: Story = {
  args: {
    ...Default.args,
    emptyError: '対象がありません',
  },
};
