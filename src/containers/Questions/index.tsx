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
}

export type QuestionsConnectedProps = Pick<
  QuestionSectionProps,
  'question' | 'answer' | 'totalCount' | 'currentPosition'
>;

export type QuestionsDispatchProps = Pick<
  QuestionCorrectProps,
  'onClickGoToNext'
> &
  Pick<QuestionSectionProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionsResultProps, 'onClickRestart'>;

export type TrainingProps = QuestionsOwnProps &
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
): QuestionsDispatchProps => {
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

const isAnswered = ({ currentPage }: QuestionsOwnProps) => currentPage === 1;

const renderQuestionCorrect = ({
  question,
  onClickGoToNext
}: TrainingProps) => {
  const { correctKaruta } = question;
  return (
    <QuestionCorrect karuta={correctKaruta} onClickGoToNext={onClickGoToNext} />
  );
};

const withAnsweredCheck = branch<QuestionsOwnProps>(
  isAnswered,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ answers, questions }: QuestionsOwnProps) =>
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
