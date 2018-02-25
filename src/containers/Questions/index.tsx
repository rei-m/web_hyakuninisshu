import {
  answerQuestion,
  goToCorrect,
  goToNextQuestion,
  restart
} from '../../actions/questions';
import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Answer, Question, ToriFuda } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import QuestionSection, {
  QuestionSectionDispatchProps,
  QuestionSectionProps,
  QuestionSectionStateProps
} from '../../components/QuestionSection';
import QuestionCorrect, {
  QuestionCorrectDispatchProps
} from '../../components/QuestionCorrect';
import TrainingResult, {
  TrainingResultDispatchProps
} from '../../components/TrainingResult';
import TrainingInitializer from '../TrainingInitializer';

export interface TrainingOwnProps {
  started: boolean;
  questions: Question[];
  answers: Answer[];
  currentPage: number;
}

export type TrainingProps = TrainingOwnProps &
  QuestionSectionProps &
  QuestionCorrectDispatchProps &
  TrainingResultDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: RouteComponentProps<{}>
): QuestionSectionStateProps & TrainingOwnProps => {
  const { submitTime } = location.state;
  const {
    answers,
    currentIndex,
    currentPage,
    lastStartedTime,
    questions
  } = questionsState;

  return {
    answer: answers[currentIndex],
    answers,
    currentPage,
    currentPosition: currentIndex + 1,
    question: questions[currentIndex],
    questions,
    started: !!lastStartedTime && lastStartedTime > submitTime,
    totalCount: questions.length
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): QuestionSectionDispatchProps &
  QuestionCorrectDispatchProps &
  TrainingResultDispatchProps => {
  return {
    onClickGoToNext: () => {
      dispatch(goToNextQuestion());
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

const isStarted = ({ started }: TrainingOwnProps) => started;

const withStartedCheck = branch<TrainingOwnProps>(
  isStarted,
  component => component,
  renderComponent(TrainingInitializer)
);

const hasQuestion = ({ questions }: TrainingOwnProps) => questions.length > 0;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingOwnProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

const isAnswered = ({ currentPage }: TrainingOwnProps) => currentPage === 1;

const renderQuestionCorrect = ({
  question,
  onClickGoToNext
}: TrainingProps) => {
  const { correctKaruta } = question;
  return (
    <QuestionCorrect karuta={correctKaruta} onClickGoToNext={onClickGoToNext} />
  );
};

const withAnsweredCheck = branch<TrainingOwnProps>(
  isAnswered,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ answers, questions }: TrainingOwnProps) =>
  questions.length > 0 && questions.length === answers.length;

const renderTrainingResult = ({
  answers,
  onClickRestart,
  totalCount
}: TrainingProps) => {
  const correctCount = answers.filter(a => a.correct).length;
  const averageAnswerSecond =
    answers.reduce((prev, current) => prev + current.time, 0) /
    1000 /
    totalCount;
  return (
    <TrainingResult
      averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
      totalCount={totalCount}
      correctCount={correctCount}
      onClickRestart={onClickRestart}
    />
  );
};

const withFinishedCheck = branch<TrainingOwnProps>(
  isFinished,
  renderComponent(renderTrainingResult),
  component => component
);

const TrainingIndex = compose<TrainingProps, TrainingProps>(
  withStartedCheck,
  withHasQuestionCheck,
  withAnsweredCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainingIndex)
);
