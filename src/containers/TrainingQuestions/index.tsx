import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ThunkExtra } from '@src/store';
import { Answer, Question, ToriFuda } from '@src/types';
import { QuestionState } from '@src/enums';
import { GlobalState } from '@src/reducers';
import {
  answerQuestion,
  confirmCorrect,
  finishQuestions,
  openNextQuestion,
  restartQuestions,
  QuestionsActions
} from '@src/actions/questions';
import TrainingInitializer from '@src/containers/TrainingInitializer';
import QuestionSection, {
  QuestionSectionProps
} from '@src/components/QuestionSection';
import QuestionCorrect, {
  QuestionCorrectProps
} from '@src/components/QuestionCorrect';
import QuestionsResult, {
  QuestionsResultProps
} from '@src/components/QuestionsResult';

export type TrainingQuestionsOwnProps = RouteComponentProps<{}>;

export type TrainingQuestionsConnectedProps = Omit<
  QuestionSectionProps,
  'onClickToriFuda' | 'onClickResult'
> & {
  readonly submitTime: number;
  readonly lastStartedTime?: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly questionState?: QuestionState;
};

export type TrainingQuestionsDispatchProps = Pick<
  QuestionCorrectProps,
  'onClickGoToNext' | 'onClickGoToResult'
> &
  Pick<QuestionSectionProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionsResultProps, 'onClickRestart'>;

export type TrainingQuestionsProps = TrainingQuestionsOwnProps &
  TrainingQuestionsConnectedProps &
  TrainingQuestionsDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: TrainingQuestionsOwnProps
): TrainingQuestionsConnectedProps => {
  const { submitTime } = location.state;
  const {
    answers,
    currentIndex,
    lastStartedTime,
    questions,
    questionState
  } = questionsState;

  return {
    answer: answers[currentIndex],
    answers,
    currentPosition: currentIndex + 1,
    lastStartedTime,
    question: questions[currentIndex],
    questionState,
    questions,
    submitTime,
    totalCount: questions.length
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, ThunkExtra, QuestionsActions>
): TrainingQuestionsDispatchProps => ({
  onClickGoToNext: () => {
    dispatch(openNextQuestion());
  },
  onClickGoToResult: () => {
    dispatch(finishQuestions());
  },
  onClickRestart: () => {
    dispatch(restartQuestions());
  },
  onClickResult: () => {
    dispatch(confirmCorrect());
  },
  onClickToriFuda: ({ questionId, karutaId }: ToriFuda) => {
    dispatch(answerQuestion(questionId, karutaId));
  }
});

const isStarted = ({
  lastStartedTime,
  submitTime
}: TrainingQuestionsConnectedProps) =>
  !!lastStartedTime && lastStartedTime > submitTime;

const withStartedCheck = branch<TrainingQuestionsConnectedProps>(
  isStarted,
  component => component,
  renderComponent(TrainingInitializer)
);

const hasQuestion = ({ questions }: TrainingQuestionsConnectedProps) =>
  questions.length > 0;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingQuestionsConnectedProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

const isConfirmedQuestionResult = ({
  questionState
}: TrainingQuestionsConnectedProps) =>
  questionState === QuestionState.ConfirmCorrect;

const renderQuestionCorrect = ({
  question,
  questions,
  answers,
  onClickGoToNext,
  onClickGoToResult
}: TrainingQuestionsProps) => {
  const { correctKaruta } = question;
  return (
    <QuestionCorrect
      karuta={correctKaruta}
      isAllAnswered={questions.length === answers.length}
      onClickGoToNext={onClickGoToNext}
      onClickGoToResult={onClickGoToResult}
    />
  );
};

const withConfirmedQuestionResultCheck = branch<
  TrainingQuestionsConnectedProps
>(
  isConfirmedQuestionResult,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ questionState }: TrainingQuestionsConnectedProps) =>
  questionState === QuestionState.Finished;

const renderResult = ({
  answers,
  onClickRestart,
  totalCount
}: TrainingQuestionsProps) => {
  const correctCount = answers.filter(a => a.correct).length;
  const averageAnswerSecond =
    answers.reduce((prev, current) => prev + current.time, 0) /
    1000 /
    totalCount;
  return (
    <QuestionsResult
      averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
      totalCount={totalCount}
      correctCount={correctCount}
      onClickRestart={onClickRestart}
    />
  );
};

const withFinishedCheck = branch<TrainingQuestionsConnectedProps>(
  isFinished,
  renderComponent(renderResult),
  component => component
);

const QuestionsIndex = compose<QuestionSectionProps, TrainingQuestionsProps>(
  withStartedCheck,
  withHasQuestionCheck,
  withConfirmedQuestionResultCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionsIndex)
);
