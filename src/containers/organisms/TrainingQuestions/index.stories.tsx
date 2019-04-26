import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PresenterProps, TrainingQuestionsPresenter } from './index';
import { create } from '@helper/factory';
import { Answer, Question } from '@src/types';
import { QuestionState } from '@src/enums';

const question = create<Question>('question');
const answer = create<Answer>('answer');

const props: PresenterProps = {
  question,
  answer,
  totalCount: 10,
  currentPosition: 3,
  questionState: QuestionState.InAnswer,
  dulation: 0.5,
  ready: true,
  onClickResult: action('onClickResult'),
  onClickToriFuda: action('onClickToriFuda'),
  onClickGoToNext: action('onClickGoToNext'),
  onClickGoToResult: action('onClickGoToResult'),
};

storiesOf('organisms/TrainingQuestions', module)
  .add('waiting', () => <TrainingQuestionsPresenter {...props} ready={false} />)
  .add('in answer', () => (
    <TrainingQuestionsPresenter {...props} questionState={QuestionState.InAnswer} answer={undefined} />
  ))
  .add('answered', () => <TrainingQuestionsPresenter {...props} questionState={QuestionState.InAnswer} />)
  .add('confirm correct', () => <TrainingQuestionsPresenter {...props} questionState={QuestionState.ConfirmCorrect} />)
  .add('finished', () => <TrainingQuestionsPresenter {...props} questionState={QuestionState.Finished} />);
