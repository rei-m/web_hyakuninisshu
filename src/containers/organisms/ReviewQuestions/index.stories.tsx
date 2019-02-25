import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PresenterProps, ReviewQuestionsPresenter } from './index';
import { create } from '@helper/factory';
import { Answer, Question } from '@src/types';
import { QuestionState } from '@src/enums';
import { appContextDecorator } from '@helper/storybook';

const question = create<Question>('question');
const answer = create<Answer>('answer');

const props: PresenterProps = {
  question,
  answer,
  totalCount: 10,
  currentPosition: 3,
  dulation: 0.5,
  submitTime: 10000,
  questionState: QuestionState.InAnswer,
  ready: true,
  onClickResult: action('onClickResult'),
  onClickToriFuda: action('onClickToriFuda'),
  onClickGoToNext: action('onClickGoToNext'),
  onClickGoToResult: action('onClickGoToResult'),
};

storiesOf('organisms/ReviewQuestions', module)
  .addDecorator(story => appContextDecorator(story))
  .add('waiting', () => <ReviewQuestionsPresenter {...props} ready={false} />)
  .add('in answer', () => (
    <ReviewQuestionsPresenter {...props} questionState={QuestionState.InAnswer} answer={undefined} />
  ))
  .add('answered', () => <ReviewQuestionsPresenter {...props} questionState={QuestionState.InAnswer} />)
  .add('confirm correct', () => <ReviewQuestionsPresenter {...props} questionState={QuestionState.ConfirmCorrect} />)
  .add('finished', () => <ReviewQuestionsPresenter {...props} questionState={QuestionState.Finished} />);
