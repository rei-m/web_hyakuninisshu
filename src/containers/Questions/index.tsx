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
import QuestionsResult, {
  QuestionsResultProps
} from '../../components/QuestionsResult';
import TrainingInitializer from '../TrainingInitializer';

export interface QuestionsOwnProps {
  readonly started: boolean;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly currentPage: number;
  readonly finished: boolean;
}

export type QuestionsConnectedProps = Omit<
  QuestionSectionProps,
  'onClickToriFuda' | 'onClickResult'
>;

export type QuestionsDispatchProps = Pick<
  QuestionCorrectProps,
  'onClickGoToNext' | 'onClickGoToResult'
> &
  Pick<QuestionSectionProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionsResultProps, 'onClickRestart'>;

export type QuestionsProps = QuestionsOwnProps &
  QuestionSectionProps &
  QuestionsDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: RouteComponentProps<{}>
): QuestionsOwnProps & QuestionsConnectedProps => {
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
): QuestionsDispatchProps => {
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
    onClickToriFuda: ({ questionId, karutaId }: ToriFuda) => {
      dispatch(answerQuestion(questionId, karutaId));
    }
  };
};

const isStarted = ({ started }: QuestionsOwnProps) => started;

const withStartedCheck = branch<QuestionsOwnProps>(
  isStarted,
  component => component,
  renderComponent(TrainingInitializer)
);

const hasQuestion = ({ questions }: QuestionsOwnProps) => questions.length > 0;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<QuestionsOwnProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

const isAnswered = ({ currentPage, finished }: QuestionsOwnProps) =>
  currentPage === 1 && !finished;

const renderQuestionCorrect = ({
  question,
  questions,
  answers,
  onClickGoToNext,
  onClickGoToResult
}: QuestionsProps) => {
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

const withAnsweredCheck = branch<QuestionsOwnProps>(
  isAnswered,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ finished }: QuestionsOwnProps) => finished;

const renderResult = ({
  answers,
  onClickRestart,
  totalCount
}: QuestionsProps) => {
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

const withFinishedCheck = branch<QuestionsOwnProps>(
  isFinished,
  renderComponent(renderResult),
  component => component
);

const QuestionsIndex = compose<QuestionsProps, QuestionsProps>(
  withStartedCheck,
  withHasQuestionCheck,
  withAnsweredCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionsIndex)
);
