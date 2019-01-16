import QuestionCorrect, { Props as QuestionCorrectProps } from '@src/components/QuestionCorrect';
import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import ExamInitializer from '@src/containers/ExamInitializer';
import QuestionView, { Props as QuestionViewProps } from '@src/components/QuestionView';
import { connect } from 'react-redux';
import ExamResult, { Props as ExamResultProps } from '@src/components/ExamResult';
import { GlobalState } from '@src/state';
import {
  answerQuestion,
  confirmCorrect,
  finishQuestions,
  openNextQuestion,
  restartQuestions,
  QuestionsActions,
} from '@src/actions/questions';
import { QuestionAnimCondition, QuestionState } from '@src/enums';
import { Answer, Karuta, Question, ToriFuda } from '@src/types';
import { toDulation } from '@src/utils/questions';

export interface OwnProps {
  karutas: Karuta[];
  submitTime: number;
}

export interface ConnectedProps {
  lastStartedTime?: number;
  questions: Question[];
  question?: Question;
  answer?: Answer;
  answers: Answer[];
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
}

export type DispatchProps = Pick<QuestionViewProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionCorrectProps, 'onClickGoToNext' | 'onClickGoToResult'> &
  Pick<ExamResultProps, 'onClickRestart'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export const ExamQuestions: React.FC<Props> = ({
  karutas,
  submitTime,
  lastStartedTime,
  questions,
  question,
  answer,
  answers,
  totalCount,
  questionState,
  currentPosition,
  onClickResult,
  onClickToriFuda,
  onClickGoToNext,
  onClickGoToResult,
  onClickRestart,
}) => {
  const isStarted = !!lastStartedTime && lastStartedTime > submitTime;

  if (!isStarted) {
    return <ExamInitializer karutas={karutas} />;
  }

  if (question === undefined) {
    throw new Error('invalid state');
  }

  switch (questionState) {
    case QuestionState.ConfirmCorrect:
      return (
        <QuestionCorrect
          karuta={question.correctKaruta}
          isAllAnswered={questions.length === answers.length}
          onClickGoToNext={onClickGoToNext}
          onClickGoToResult={onClickGoToResult}
        />
      );
    case QuestionState.Finished:
      const averageAnswerSecond = answers.reduce((prev, current) => prev + current.time, 0) / 1000 / totalCount;
      return (
        <ExamResult
          averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
          totalCount={totalCount}
          correctCount={answers.filter(a => a.correct).length}
          answers={answers}
          questions={questions}
          onClickRestart={onClickRestart}
        />
      );
    default:
      return (
        <QuestionView
          question={question}
          answer={answer}
          totalCount={totalCount}
          currentPosition={currentPosition}
          dulation={toDulation(QuestionAnimCondition.Normal)}
          onClickResult={onClickResult}
          onClickToriFuda={onClickToriFuda}
        />
      );
  }
};

export const mapStateToProps = ({ questions }: GlobalState, props: OwnProps): ConnectedProps => {
  const { lastStartedTime, currentIndex, answers, questionState } = questions;

  return {
    ...props,
    questions: questions.questions,
    lastStartedTime,
    answer: answers[currentIndex],
    answers,
    currentPosition: currentIndex + 1,
    question: questions.questions[currentIndex],
    totalCount: questions.questions.length,
    questionState,
  };
};

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, QuestionsActions>): DispatchProps => ({
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
  onClickToriFuda: ({ questionId, karutaNo }: ToriFuda) => {
    dispatch(answerQuestion(questionId, karutaNo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamQuestions);
