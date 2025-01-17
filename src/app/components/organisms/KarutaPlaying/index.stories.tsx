import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { KarutaPlaying } from './index';
import { QuestionId } from '@/domains/models';
import { KARUTA_LIST } from '@/assets/karuta';

export default {
  title: 'organisms/KarutaPlaying',
  component: KarutaPlaying,
} as Meta<typeof KarutaPlaying>;

type Story = StoryObj<typeof KarutaPlaying>;

const karuta = KARUTA_LIST[0];
const torifuda_1 = KARUTA_LIST[1];
const torifuda_2 = KARUTA_LIST[2];
const torifuda_3 = KARUTA_LIST[3];

export const Default: Story = {
  args: {
    questionId: 1 as QuestionId,
    yomiFuda: {
      karutaNo: karuta.no,
      shoku: karuta.shoku.kanji,
      niku: karuta.niku.kanji,
      sanku: karuta.sanku.kanji,
    },
    toriFudaList: [
      {
        karutaNo: karuta.no,
        shiku: karuta.shiku.kana,
        kekku: karuta.kekku.kana,
      },
      {
        karutaNo: torifuda_1.no,
        shiku: torifuda_1.shiku.kana,
        kekku: torifuda_1.kekku.kana,
      },
      {
        karutaNo: torifuda_2.no,
        shiku: torifuda_2.shiku.kana,
        kekku: torifuda_2.kekku.kana,
      },
      {
        karutaNo: torifuda_3.no,
        shiku: torifuda_3.shiku.kana,
        kekku: torifuda_3.kekku.kana,
      },
    ],
    totalCount: 100,
    currentPosition: 1,
    duration: 500,
    onClickToriFuda: fn(),
    onClickResult: fn(),
  },
};

export const Answerd: Story = {
  args: {
    ...Default.args,
    answer: {
      isCorrect: true,
      selectedKarutaNo: karuta.no,
    },
  },
};
