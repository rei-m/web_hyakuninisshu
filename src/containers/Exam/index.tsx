import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { branch, compose, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Answer, Question, ToriFuda } from '../../types';
import {
  answerQuestion,
  goToCorrect,
  goToNextQuestion,
  restartTraining
} from '../../actions/questions';
import { GlobalState } from '../../reducers/index';
import QuestionSection, {
  QuestionSectionDispatchProps,
  QuestionSectionOwnProps,
  QuestionSectionProps
} from '../../components/QuestionSection';
import QuestionCorrect, {
  QuestionCorrectDispatchProps
} from '../../components/QuestionCorrect';
import TrainingResult, {
  TrainingResultDispatchProps
} from '../../components/TrainingResult';
import ExamInitializer from '../ExamInitializer';

export interface ExamOwnProps {
  started: boolean;
  questions: Question[];
  answers: Answer[];
  currentPage: number;
}

export type ExamProps = ExamOwnProps &
  QuestionSectionProps &
  QuestionCorrectDispatchProps &
  TrainingResultDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: RouteComponentProps<{}>
): QuestionSectionOwnProps & ExamOwnProps => {
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
      dispatch(restartTraining());
    },
    onClickResult: () => {
      dispatch(goToCorrect());
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

const isAnswered = ({ currentPage }: ExamOwnProps) => currentPage === 1;

const renderQuestionCorrect = ({ question, onClickGoToNext }: ExamProps) => {
  const { correctKaruta } = question;
  return (
    <QuestionCorrect karuta={correctKaruta} onClickGoToNext={onClickGoToNext} />
  );
};

const withAnsweredCheck = branch<ExamOwnProps>(
  isAnswered,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ answers, questions }: ExamOwnProps) =>
  questions.length > 0 && questions.length === answers.length;

const renderTrainingResult = ({
  answers,
  onClickRestart,
  totalCount
}: ExamProps) => {
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

const withFinishedCheck = branch<ExamOwnProps>(
  isFinished,
  renderComponent(renderTrainingResult),
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
