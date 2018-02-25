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
import ExamResult, {
  ExamResultDispatchProps
} from '../../components/ExamResult';
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
  ExamResultDispatchProps;

const mapStateToProps = (
  { questionsState }: GlobalState,
  { location }: RouteComponentProps<{}>
): QuestionSectionStateProps & ExamOwnProps => {
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
  ExamResultDispatchProps => {
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
