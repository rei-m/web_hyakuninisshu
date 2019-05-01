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
import { QuestionAnimCondition, QuestionState } from '@src/enums';
import { Answer, Karuta, Question, ToriFuda } from '@src/types';
import { toDulation } from '@src/utils/questions';

export interface OwnProps {
  karutas: Karuta[];
  onClickGoToResult: () => void;
}

export interface ConnectedProps {
  question?: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
}

export type DispatchProps = { onStart: () => void; onFinish: () => void } & Pick<
  KarutaPlayingProps,
  'onClickToriFuda' | 'onClickResult'
> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export type PresenterProps = Omit<Props, 'karutas' | 'onStart' | 'onFinish'>;

export const ExamQuestionsPresenter = ({
  question,
  answer,
  totalCount,
  questionState,
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
          duration={toDulation(QuestionAnimCondition.Normal)}
          onClickResult={onClickResult}
          onClickToriFuda={onClickToriFuda}
        />
      );
  }
};

export const ExamQuestions = (props: Props) => {
  useLifeCycle(props.onStart, props.onFinish);
  return <ExamQuestionsPresenter {...props} />;
};

export const mapStateToProps = ({ questions }: GlobalState, props: OwnProps): ConnectedProps => {
  const { currentIndex, answers, questionState } = questions;

  return {
    ...props,
    answer: answers ? answers[currentIndex] : undefined,
    currentPosition: currentIndex + 1,
    question: questions.questions ? questions.questions[currentIndex] : undefined,
    totalCount: questions.questions ? questions.questions.length : 0,
    questionState,
  };
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, questionsTypes.Actions>,
  { karutas }: OwnProps
): DispatchProps => ({
  onStart: () => {
    dispatch(questionsOperations.startExam(karutas));
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
)(ExamQuestions);
