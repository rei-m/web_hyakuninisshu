import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

export type OwnProps = {
  submitTime: number;
  onClickGoToResult: () => void;
};

export type ConnectedProps = {
  lastStartedTime?: number;
  question?: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
  dulation: number;
};

export type PresenterProps = Pick<OwnProps, 'onClickGoToResult'> &
  ConnectedProps &
  Pick<KarutaPlayingProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type ContainerProps = OwnProps & {
  presenter: React.FC<PresenterProps>;
};

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

export const ReviewQuestionsContainer = ({ onClickGoToResult, presenter }: ContainerProps) => {
  const dispatch = useDispatch();
  const { questions, lastStartedTime, currentIndex, answers, questionState, dulation } = useSelector<
    GlobalState,
    questionsTypes.State
  >(state => state.questions);

  useLifeCycle(
    () => {
      dispatch(questionsOperations.restartQuestions());
    },
    () => {
      dispatch(questionsOperations.finishQuestion());
    }
  );

  const handleClickGoToNext = () => {
    dispatch(questionsOperations.openNextQuestion());
  };
  const handleClickResult = () => {
    dispatch(questionsOperations.confirmCorrect());
  };
  const handleClickToriFuda = ({ questionId, karutaNo }: ToriFuda) => {
    dispatch(questionsOperations.answerQuestion(questionId, karutaNo));
  };

  return presenter({
    lastStartedTime,
    answer: answers ? answers[currentIndex] : undefined,
    currentPosition: currentIndex + 1,
    question: questions ? questions[currentIndex] : undefined,
    totalCount: questions ? questions.length : 0,
    questionState,
    dulation,
    onClickResult: handleClickResult,
    onClickToriFuda: handleClickToriFuda,
    onClickGoToNext: handleClickGoToNext,
    onClickGoToResult,
  });
};

export const ReviewQuestions = (props: OwnProps) => (
  <ReviewQuestionsContainer {...props} presenter={ReviewQuestionsPresenter} />
);

export default ReviewQuestions;
