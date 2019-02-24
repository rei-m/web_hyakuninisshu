import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import ReviewInitializer from '@src/containers/ReviewInitializer';
import QuestionView, { Props as QuestionViewProps } from '@src/components/QuestionView';
import QuestionCorrect, { Props as QuestionCorrectProps } from '@src/components/QuestionCorrect';
import { GlobalState } from '@src/state';
import { questionsOperations, questionsTypes } from '@src/state/questions';
import { QuestionState } from '@src/enums';
import { Answer, Question, ToriFuda } from '@src/types';
import { navigate } from 'gatsby';
import { ROUTE_PATHS } from '@src/constants';

export interface OwnProps {
  submitTime: number;
}

export interface ConnectedProps {
  lastStartedTime?: number;
  question?: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
  dulation: number;
}

export type DispatchProps = Pick<QuestionViewProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionCorrectProps, 'onClickGoToNext' | 'onClickGoToResult'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export const ReviewQuestions: React.FC<Props> = ({
  submitTime,
  lastStartedTime,
  question,
  answer,
  totalCount,
  questionState,
  dulation,
  currentPosition,
  onClickResult,
  onClickToriFuda,
  onClickGoToNext,
  onClickGoToResult,
}) => {
  const isStarted = !!lastStartedTime && lastStartedTime > submitTime;

  if (!isStarted) {
    return <ReviewInitializer />;
  }

  if (question === undefined) {
    throw new Error('invalid state');
  }

  switch (questionState) {
    case QuestionState.ConfirmCorrect:
    case QuestionState.Finished:
      return (
        <QuestionCorrect
          karuta={question.correctKaruta}
          isAllAnswered={questionState === QuestionState.Finished}
          onClickGoToNext={onClickGoToNext}
          onClickGoToResult={onClickGoToResult}
        />
      );
    default:
      return (
        <QuestionView
          question={question}
          answer={answer}
          totalCount={totalCount}
          currentPosition={currentPosition}
          dulation={dulation}
          onClickResult={onClickResult}
          onClickToriFuda={onClickToriFuda}
        />
      );
  }
};

export const mapStateToProps = ({ questions }: GlobalState, props: OwnProps): ConnectedProps => {
  const { lastStartedTime, currentIndex, answers, questionState, dulation } = questions;

  return {
    ...props,
    lastStartedTime,
    answer: answers[currentIndex],
    currentPosition: currentIndex + 1,
    question: questions.questions[currentIndex],
    totalCount: questions.questions.length,
    questionState,
    dulation,
  };
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, questionsTypes.Actions>
): DispatchProps => ({
  onClickGoToNext: () => {
    dispatch(questionsOperations.openNextQuestion());
  },
  onClickGoToResult: () => {
    navigate(ROUTE_PATHS.TRAINING_RESULT, {
      replace: true,
    });
  },
  onClickResult: () => {
    dispatch(questionsOperations.confirmCorrect());
  },
  onClickToriFuda: ({ questionId, karutaNo }: ToriFuda) => {
    dispatch(questionsOperations.answerQuestion(questionId, karutaNo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewQuestions);
