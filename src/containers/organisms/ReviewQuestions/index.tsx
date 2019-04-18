import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import KarutaPlaying, { Props as KarutaPlayingProps } from '@src/components/organisms/KarutaPlaying';
import KarutaPlayingCorrect, {
  Props as KarutaPlayingCorrectProps,
} from '@src/components/organisms/KarutaPlayingCorrect';
import Progress from '@src/components/atoms/Progress';
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
  totalCount?: number;
  currentPosition: number;
  questionState?: QuestionState;
  dulation: number;
}

export type DispatchProps = { onStart: () => void } & Pick<KarutaPlayingProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export type PresenterProps = Omit<Props, 'onStart'> & { ready: boolean };

export const ReviewQuestionsPresenter = ({
  question,
  answer,
  totalCount,
  questionState,
  dulation,
  currentPosition,
  ready,
  onClickResult,
  onClickToriFuda,
  onClickGoToNext,
  onClickGoToResult,
}: PresenterProps) => {
  if (!ready || question === undefined || totalCount === undefined) {
    return <Progress />;
  }

  switch (questionState) {
    case QuestionState.ConfirmCorrect:
    case QuestionState.Finished:
      return (
        <KarutaPlayingCorrect
          karuta={question.correctKaruta}
          isAllAnswered={questionState === QuestionState.Finished}
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
  // ここちょっと後で修正。。。
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    props.onStart();
    setReady(true);
  }, []);

  return <ReviewQuestionsPresenter {...props} ready={ready} />;
};

export const mapStateToProps = ({ questions }: GlobalState, props: OwnProps): ConnectedProps => {
  const { lastStartedTime, currentIndex, answers, questionState, dulation } = questions;

  return {
    ...props,
    lastStartedTime,
    answer: answers ? answers[currentIndex] : undefined,
    currentPosition: currentIndex + 1,
    question: questions.questions ? questions.questions[currentIndex] : undefined,
    totalCount: questions.questions ? questions.questions.length : undefined,
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
