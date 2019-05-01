import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ExamQuestionsPresenter, PresenterProps } from './index';
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
  onClickResult: action('onClickResult'),
  onClickToriFuda: action('onClickToriFuda'),
  onClickGoToNext: action('onClickGoToNext'),
  onClickGoToResult: action('onClickGoToResult'),
};

storiesOf('organisms/ExamQuestions', module)
  .add('waiting', () => <ExamQuestionsPresenter {...props} />)
  .add('in answer', () => (
    <ExamQuestionsPresenter {...props} questionState={QuestionState.InAnswer} answer={undefined} />
  ))
  .add('answered', () => <ExamQuestionsPresenter {...props} questionState={QuestionState.InAnswer} />)
  .add('confirm correct', () => <ExamQuestionsPresenter {...props} questionState={QuestionState.ConfirmCorrect} />)
  .add('finished', () => <ExamQuestionsPresenter {...props} questionState={QuestionState.Finished} />);
