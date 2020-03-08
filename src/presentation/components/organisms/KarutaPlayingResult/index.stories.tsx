import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import KarutaPlayingResult, { Props } from './index';

const props: Props = {
  correctCount: 80,
  totalCount: 100,
  averageAnswerSecond: 5.8,
  onClickBack: action('onClickBack'),
  onClickRestart: action('onClickRestart'),
};

storiesOf('organisms/KarutaPlayingResult', module)
  .add('all correct', () => <KarutaPlayingResult {...props} correctCount={100} />)
  .add('has mistake', () => <KarutaPlayingResult {...props} />);
