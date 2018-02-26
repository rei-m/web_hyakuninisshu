import {
  answerQuestion,
  goToCorrect,
  goToNextQuestion,
  goToResult,
  restart
} from '../../actions/questions';
import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Answer, Question, ToriFuda } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import QuestionSection, {
  QuestionSectionProps
} from '../../components/QuestionSection';
import QuestionCorrect, {
  QuestionCorrectProps
} from '../../components/QuestionCorrect';
import ExamResult, { ExamResultProps } from '../../components/ExamResult';
import ExamInitializer from '../ExamInitializer';

export interface ExamOwnProps {
  readonly started: boolean;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly currentPage: number;
  readonly finished: boolean;
}

export type ExamConnectedProps = Omit<
  QuestionSectionProps,
  'onClickToriFuda' | 'onClickResult'
>;

export type ExamDispatchProps = Pick<
  ExamResultProps,
  'onClickRestart' | 'onClickResultsMap'
> &
  Pick<QuestionCorrectProps, 'onClickGoToNext' | 'onClickGoToResult'> &
  Pick<QuestionSectionProps, 'onClickToriFuda' | 'onClickResult'>;

export type ExamProps = ExamOwnProps & ExamConnectedProps & ExamDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: RouteComponentProps<{}>
): ExamOwnProps & ExamConnectedProps => {
  const { submitTime } = location.state;
  const {
    answers,
    currentIndex,
    currentPage,
    lastStartedTime,
    questions,
    finished
  } = questionsState;

  return {
    answer: answers[currentIndex],
    answers,
    currentPage,
    currentPosition: currentIndex + 1,
    finished,
    question: questions[currentIndex],
    questions,
    started: !!lastStartedTime && lastStartedTime > submitTime,
    totalCount: questions.length
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): ExamDispatchProps => {
  return {
    onClickGoToNext: () => {
      dispatch(goToNextQuestion());
    },
    onClickGoToResult: () => {
      dispatch(goToResult());
    },
    onClickRestart: () => {
      dispatch(restart());
    },
    onClickResult: () => {
      dispatch(goToCorrect());
    },
    onClickResultsMap: (karutaId: number) => {
      console.dir(karutaId);
    },
    onClickToriFuda: ({ questionId, karutaId }: ToriFuda) => {
      dispatch(answerQuestion(questionId, karutaId));
    }
  };
};

const isStarted = ({ started }: ExamOwnProps) => started;

const withStartedCheck = branch<ExamOwnProps>(
  isStarted,
  component => component,
  renderComponent(ExamInitializer)
);

const isAnswered = ({ currentPage, finished }: ExamOwnProps) =>
  currentPage === 1 && !finished;

const renderQuestionCorrect = ({
  question,
  questions,
  answers,
  onClickGoToNext,
  onClickGoToResult
}: ExamProps) => {
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

const withAnsweredCheck = branch<ExamOwnProps>(
  isAnswered,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ finished }: ExamOwnProps) => finished;

const renderResult = ({
  questions,
  answers,
  onClickRestart,
  onClickResultsMap,
  totalCount
}: ExamProps) => {
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
      onClickResultsMap={onClickResultsMap}
    />
  );
};

const withFinishedCheck = branch<ExamOwnProps>(
  isFinished,
  renderComponent(renderResult),
  component => component
);

const ExamIndex = compose<ExamProps, ExamProps>(
  withStartedCheck,
  withAnsweredCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExamIndex)
);
