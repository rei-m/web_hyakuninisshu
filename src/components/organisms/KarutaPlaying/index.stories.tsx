import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { create } from '@helper/factory';
import KarutaPlaying, { Props } from './index';
import { Answer, Question } from '@src/types';

const question = create<Question>('question');
const answer = create<Answer>('answer');

const props: Props = {
  question,
  totalCount: 10,
  currentPosition: 1,
  duration: 1,
  onClickToriFuda: action('onClickToriFuda'),
  onClickResult: action('onClickResult'),
};

storiesOf('organisms/KarutaPlaying', module)
  .add('in answer', () => <KarutaPlaying {...props} />)
  .add('answered', () => <KarutaPlaying {...props} answer={answer} />);
