import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import ExamInitializer from '@src/containers/ExamInitializer';
import QuestionView, { Props as QuestionViewProps } from '@src/components/QuestionView';
import QuestionCorrect, { Props as QuestionCorrectProps } from '@src/components/QuestionCorrect';
import { GlobalState } from '@src/state';
import { answerQuestion, confirmCorrect, openNextQuestion, QuestionsActions } from '@src/actions/questions';
import { QuestionAnimCondition, QuestionState } from '@src/enums';
import { Answer, Karuta, Question, ToriFuda } from '@src/types';
import { toDulation } from '@src/utils/questions';
import { ROUTE_PATHS } from '@src/constants';
import { navigate } from 'gatsby';

export interface OwnProps {
  karutas: Karuta[];
  submitTime: number;
}

export interface ConnectedProps {
  lastStartedTime?: number;
  question?: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
}

export type DispatchProps = Pick<QuestionViewProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<QuestionCorrectProps, 'onClickGoToNext' | 'onClickGoToResult'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export const ExamQuestions: React.FC<Props> = ({
  karutas,
  submitTime,
  lastStartedTime,
  question,
  answer,
  totalCount,
  questionState,
  currentPosition,
  onClickResult,
  onClickToriFuda,
  onClickGoToNext,
  onClickGoToResult,
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
    lastStartedTime,
    answer: answers[currentIndex],
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
    navigate(ROUTE_PATHS.EXAM_RESULT, {
      replace: true,
    });
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
