import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@src/styles/styled-components';
import KarutaPlaying, { Props as KarutaPlayingProps } from '@src/components/organisms/KarutaPlaying';
import KarutaPlayingCorrect, {
  Props as KarutaPlayingCorrectProps,
} from '@src/components/organisms/KarutaPlayingCorrect';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import Progress from '@src/components/atoms/Progress';
import { useLifeCycle } from '@src/hooks/useLifeCycle';
import { GlobalState } from '@src/state';
import { questionsOperations, questionsTypes } from '@src/state/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { Answer, Karuta, Question, ToriFuda } from '@src/types';

export interface OwnProps {
  karutas: Karuta[];
  rangeFrom: RangeFromCondition;
  rangeTo: RangeToCondition;
  kimariji: KimarijiCondition;
  color: ColorCondition;
  kamiNoKuStyle: KarutaStyleCondition;
  shimoNoKuStyle: KarutaStyleCondition;
  questionAnim: QuestionAnimCondition;
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

export type PresenterProps = Pick<OwnProps, 'onClickGoToResult'> &
  ConnectedProps &
  Pick<KarutaPlayingProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type ContainerProps = OwnProps & {
  presenter: React.FC<PresenterProps>;
};

const ErrorMessage = styled(CenteredFrame)`
  padding: ${({ theme }) => theme.spacing2x};
  background-color: #fff;
`;

export const TrainingQuestionsPresenter = ({
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
  if (questionState === undefined || questionState === QuestionState.Finished) {
    return <Progress />;
  }

  if (totalCount === 0 || question === undefined) {
    return (
      <ErrorMessage tag={`div`}>
        <Txt role={`error`}>指定した条件の歌はありませんでした。</Txt>
      </ErrorMessage>
    );
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

export const TrainingQuestionsContainer = ({
  karutas,
  rangeFrom,
  rangeTo,
  kimariji,
  color,
  kamiNoKuStyle,
  shimoNoKuStyle,
  questionAnim,
  onClickGoToResult,
  presenter,
}: ContainerProps) => {
  const dispatch = useDispatch();
  const { questions, currentIndex, answers, questionState, dulation } = useSelector<GlobalState, questionsTypes.State>(
    state => state.questions
  );

  useLifeCycle(
    () => {
      dispatch(
        questionsOperations.startTraining(
          karutas,
          rangeFrom,
          rangeTo,
          kimariji,
          color,
          kamiNoKuStyle,
          shimoNoKuStyle,
          questionAnim
        )
      );
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
    question: questions ? questions[currentIndex] : undefined,
    answer: answers ? answers[currentIndex] : undefined,
    totalCount: questions ? questions.length : 0,
    questionState,
    currentPosition: currentIndex + 1,
    dulation,
    onClickResult: handleClickResult,
    onClickToriFuda: handleClickToriFuda,
    onClickGoToNext: handleClickGoToNext,
    onClickGoToResult,
  });
};

export const TrainingQuestions = (props: OwnProps) => (
  <TrainingQuestionsContainer {...props} presenter={TrainingQuestionsPresenter} />
);

export default TrainingQuestions;
