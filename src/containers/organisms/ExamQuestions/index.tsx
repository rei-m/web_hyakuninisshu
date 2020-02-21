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
import { QuestionAnimCondition, QuestionState } from '@src/enums';
import { Answer, Karuta, Question, ToriFuda } from '@src/types';
import { toDulation } from '@src/utils/questions';

export type OwnProps = {
  karutas: Karuta[];
  onClickGoToResult: () => void;
};

export type ConnectedProps = {
  question?: Question;
  answer?: Answer;
  totalCount: number;
  currentPosition: number;
  questionState?: QuestionState;
};

export type PresenterProps = Pick<OwnProps, 'onClickGoToResult'> &
  ConnectedProps &
  Pick<KarutaPlayingProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type ContainerProps = OwnProps & {
  presenter: React.FC<PresenterProps>;
};

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

export const ExamQuestionsContainer = ({ karutas, onClickGoToResult, presenter }: ContainerProps) => {
  const dispatch = useDispatch();
  useLifeCycle(
    () => {
      dispatch(questionsOperations.startExam(karutas));
    },
    () => {
      dispatch(questionsOperations.finishQuestion());
    }
  );
  const { questions, currentIndex, answers, questionState } = useSelector<GlobalState, questionsTypes.State>(
    state => state.questions
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
    question: questions ? questions[currentIndex] : undefined,
    answer: answers ? answers[currentIndex] : undefined,
    totalCount: questions ? questions.length : 0,
    currentPosition: currentIndex + 1,
    questionState,
    onClickResult: handleClickResult,
    onClickToriFuda: handleClickToriFuda,
    onClickGoToNext: handleClickGoToNext,
    onClickGoToResult,
  });
};

export const ExamQuestions = (props: OwnProps) => {
  return <ExamQuestionsContainer {...props} presenter={ExamQuestionsPresenter} />;
};

export default ExamQuestions;
