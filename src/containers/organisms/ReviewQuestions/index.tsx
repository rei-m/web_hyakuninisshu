import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import KarutaPlaying, { Props as KarutaPlayingProps } from '@src/components/organisms/KarutaPlaying';
import KarutaPlayingCorrect, {
  Props as KarutaPlayingCorrectProps,
} from '@src/components/organisms/KarutaPlayingCorrect';
import Progress from '@src/components/atoms/Progress';
import { useLifeCycle } from '@src/hooks/useLifeCycle';
import { GlobalState } from '@src/state';
import { questionsOperations, questionsTypes } from '@src/state/questions';
import { QuestionState } from '@src/enums';
import { Answer, Question, ToriFuda } from '@src/types';

export interface OwnProps {
  submitTime: number;
  onClickGoToResult: () => void;
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

export type DispatchProps = { onStart: () => void; onFinish: () => void } & Pick<
  KarutaPlayingProps,
  'onClickToriFuda' | 'onClickResult'
> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export type PresenterProps = Omit<Props, 'onStart' | 'onFinish'>;

export const ReviewQuestionsPresenter = ({
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
}: PresenterProps) => {
  if (question === undefined || questionState === undefined || questionState === QuestionState.Finished) {
    return <Progress />;
  }

  switch (questionState) {
    case QuestionState.ConfirmCorrect:
      return (
        <KarutaPlayingCorrect
          karuta={question.correctKaruta}
          isAllAnswered={totalCount === currentPosition}
          onClickGoToNext={onClickGoToNext}
          onClickGoToResult={onClickGoToResult}
        />
      );
    default:
      return (
        <KarutaPlaying
          question={question}
          answer={answer}
          totalCount={totalCount}
          currentPosition={currentPosition}
          duration={dulation}
          onClickResult={onClickResult}
          onClickToriFuda={onClickToriFuda}
        />
      );
  }
};

export const ReviewQuestions = (props: Props) => {
  useLifeCycle(props.onStart, props.onFinish);
  return <ReviewQuestionsPresenter {...props} />;
};

export const mapStateToProps = ({ questions }: GlobalState, props: OwnProps): ConnectedProps => {
  const { lastStartedTime, currentIndex, answers, questionState, dulation } = questions;

  return {
    ...props,
    lastStartedTime,
    answer: answers ? answers[currentIndex] : undefined,
    currentPosition: currentIndex + 1,
    question: questions.questions ? questions.questions[currentIndex] : undefined,
    totalCount: questions.questions ? questions.questions.length : 0,
    questionState,
    dulation,
  };
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, questionsTypes.Actions>
): DispatchProps => ({
  onStart: () => {
    dispatch(questionsOperations.restartQuestions());
  },
  onFinish: () => {
    dispatch(questionsOperations.finishQuestion());
  },
  onClickGoToNext: () => {
    dispatch(questionsOperations.openNextQuestion());
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
