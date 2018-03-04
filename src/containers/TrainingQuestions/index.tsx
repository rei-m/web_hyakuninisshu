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
import QuestionsResult, {
  QuestionsResultProps
} from '../../components/QuestionsResult';
import TrainingInitializer from '../TrainingInitializer';
import { QuestionState } from '../../enums';

export interface TrainingQuestionsOwnProps {
  readonly started: boolean;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly questionState?: QuestionState;
}

export type TrainingQuestionsConnectedProps = Omit<
  QuestionSectionProps,
  'onClickToriFuda' | 'onClickResult'
>;

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
  { location }: RouteComponentProps<{}>
): TrainingQuestionsOwnProps & TrainingQuestionsConnectedProps => {
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
    question: questions[currentIndex],
    questionState,
    questions,
    started: !!lastStartedTime && lastStartedTime > submitTime,
    totalCount: questions.length
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): TrainingQuestionsDispatchProps => {
  return {
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
  };
};

const isStarted = ({ started }: TrainingQuestionsOwnProps) => started;

const withStartedCheck = branch<TrainingQuestionsOwnProps>(
  isStarted,
  component => component,
  renderComponent(TrainingInitializer)
);

const hasQuestion = ({ questions }: TrainingQuestionsOwnProps) =>
  questions.length > 0;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingQuestionsOwnProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

const isConfirmedQuestionResult = ({
  questionState
}: TrainingQuestionsOwnProps) => questionState === QuestionState.ConfirmCorrect;

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

const withConfirmedQuestionResultCheck = branch<TrainingQuestionsOwnProps>(
  isConfirmedQuestionResult,
  renderComponent(renderQuestionCorrect),
  component => component
);

const isFinished = ({ questionState }: TrainingQuestionsOwnProps) =>
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

const withFinishedCheck = branch<TrainingQuestionsOwnProps>(
  isFinished,
  renderComponent(renderResult),
  component => component
);

const QuestionsIndex = compose<TrainingQuestionsProps, TrainingQuestionsProps>(
  withStartedCheck,
  withHasQuestionCheck,
  withConfirmedQuestionResultCheck,
  withFinishedCheck
)(QuestionSection);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionsIndex)
);
