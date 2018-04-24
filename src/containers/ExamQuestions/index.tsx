import * as React from 'react';
import { GlobalState } from '../../reducers/index';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Answer, Question, ToriFuda } from '../../types';
import { connect, Dispatch } from 'react-redux';
import {
  answerQuestion,
  confirmCorrect,
  finishQuestions,
  openNextQuestion,
  restartQuestions
} from '../../actions/questions';
import QuestionSection, {
  QuestionSectionProps
} from '../../components/QuestionSection';
import QuestionCorrect, {
  QuestionCorrectProps
} from '../../components/QuestionCorrect';
import ExamResult, { ExamResultProps } from '../../components/ExamResult';
import ExamInitializer from '../ExamInitializer';
import { QuestionState } from '../../enums';

export type ExamQuestionsOwnProps = RouteComponentProps<{}>;

export type ExamQuestionsConnectedProps = Omit<
  QuestionSectionProps,
  'onClickToriFuda' | 'onClickResult'
> & {
  readonly submitTime: number;
  readonly lastStartedTime?: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly questionState?: QuestionState;
};

export type ExamQuestionsDispatchProps = Pick<
  ExamResultProps,
  'onClickRestart'
> &
  Pick<QuestionCorrectProps, 'onClickGoToNext' | 'onClickGoToResult'> &
  Pick<QuestionSectionProps, 'onClickToriFuda' | 'onClickResult'>;

export type ExamQuestionsProps = ExamQuestionsOwnProps &
  ExamQuestionsConnectedProps &
  ExamQuestionsDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: ExamQuestionsOwnProps
): ExamQuestionsConnectedProps => {
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
  dispatch: Dispatch<GlobalState>
): ExamQuestionsDispatchProps => ({
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
}: ExamQuestionsConnectedProps) =>
  !!lastStartedTime && lastStartedTime > submitTime;

const withStartedCheck = branch<ExamQuestionsConnectedProps>(
  isStarted,
  component => component,
  renderComponent(ExamInitializer)
);

const isConfirmedQuestionResult = ({
  questionState
}: ExamQuestionsConnectedProps) =>
  questionState === QuestionState.ConfirmCorrect;

const renderQuestionCorrect = ({
  question,
  questions,
  answers,
  onClickGoToNext,
  onClickGoToResult
}: ExamQuestionsProps) => {
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

const withConfirmedQuestionResultCheck = branch<ExamQuestionsConnectedProps>(
  isConfirmedQuestionResult,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ questionState }: ExamQuestionsConnectedProps) =>
  questionState === QuestionState.Finished;

const renderResult = ({
  questions,
  answers,
  onClickRestart,
  totalCount
}: ExamQuestionsProps) => {
  const correctCount = answers.filter(a => a.correct).length;
  const averageAnswerSecond =
    answers.reduce((prev, current) => prev + current.time, 0) /
    1000 /
    totalCount;
  return (
    <ExamResult
      averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
      totalCount={totalCount}
      correctCount={correctCount}
      answers={answers}
      questions={questions}
      onClickRestart={onClickRestart}
    />
  );
};

const withFinishedCheck = branch<ExamQuestionsConnectedProps>(
  isFinished,
  renderComponent(renderResult),
  component => component
);

const ExamQuestionIndex = compose<ExamQuestionsProps, ExamQuestionsProps>(
  withStartedCheck,
  withConfirmedQuestionResultCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExamQuestionIndex)
);
