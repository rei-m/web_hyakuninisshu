import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PresenterProps, TrainingResultPresenter } from './index';
import { create } from '@helper/factory';
import { Answer } from '@src/types';

const answers = [...Array(100).keys()].map(_ => create<Answer>('answer'));

const props: PresenterProps = {
  answers,
  onClickBack: action('onClickBack'),
  onClickRestart: action('onClickRestart'),
};

storiesOf('organisms/TrainingResult', module).add('default', () => <TrainingResultPresenter {...props} />);
