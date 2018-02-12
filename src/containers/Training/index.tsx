import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Answer, Question, ToriFuda } from '../../types';
import {
  answerQuestion,
  goToNextQuestion,
  restartTraining
} from '../../actions/trainings';
import { GlobalState } from '../../reducers/index';
import TrainingSection, {
  TrainingSectionDispatchProps,
  TrainingSectionOwnProps,
  TrainingSectionProps
} from '../../components/TrainingSection';
import TrainingResult, {
  TrainingResultDispatchProps
} from '../../components/TrainingResult';
import TrainingInitializer from '../TrainingInitializer';

export interface TrainingOwnProps {
  started: boolean;
  questions: Question[];
  answers: Answer[];
}

export type TrainingProps = TrainingOwnProps &
  TrainingSectionProps &
  TrainingResultDispatchProps;

const mapStateToProps = (
  { trainings }: GlobalState,
  { location }: RouteComponentProps<{}>
): TrainingSectionOwnProps & TrainingOwnProps => {
  const { submitTime } = location.state;
  const { answers, currentIndex, lastStartedTime, questions } = trainings;
  return {
    answer: answers[currentIndex],
    answers,
    question: questions[currentIndex],
    questions,
    started: !!lastStartedTime && lastStartedTime > submitTime
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): TrainingSectionDispatchProps & TrainingResultDispatchProps => {
  return {
    onClickRestart: () => {
      dispatch(restartTraining());
    },
    onClickResult: () => {
      dispatch(goToNextQuestion());
    },
    onClickToriFuda: ({ questionId, karutaId }: ToriFuda) => {
      dispatch(answerQuestion(questionId, karutaId));
    }
  };
};

const isStarted = ({ started }: TrainingOwnProps) => started;

const withStartedCheck = branch<TrainingProps>(
  isStarted,
  component => component,
  _ => TrainingInitializer
);

const hasQuestion = ({ questions }: TrainingOwnProps) => questions.length > 0;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

const isFinished = ({ answers, questions }: TrainingOwnProps) =>
  questions.length > 0 && questions.length === answers.length;

const FinishedMessage = ({
  answers,
  onClickRestart,
  questions
}: TrainingProps) => {
  const totalCount = questions.length;
  const correctCount = answers.filter(a => a.correct).length;
  return (
    <TrainingResult
      totalCount={totalCount}
      correctCount={correctCount}
      onClickRestart={onClickRestart}
    />
  );
};

const withIsFinishedCheck = branch<TrainingProps>(
  isFinished,
  renderComponent(FinishedMessage),
  component => component
);

const TrainingIndex = compose<TrainingProps, TrainingProps>(
  withStartedCheck,
  withHasQuestionCheck,
  withIsFinishedCheck
)(TrainingSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainingIndex)
);
