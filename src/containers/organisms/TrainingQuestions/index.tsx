import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from '@src/styles/styled-components';
import KarutaPlaying, { Props as KarutaPlayingProps } from '@src/components/organisms/KarutaPlaying';
import KarutaPlayingCorrect, {
  Props as KarutaPlayingCorrectProps,
} from '@src/components/organisms/KarutaPlayingCorrect';
import CenteredFrame from '@src/components/atoms/CenteredFrame';
import Txt from '@src/components/atoms/Txt';
import Progress from '@src/components/atoms/Progress';
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
  totalCount?: number;
  currentPosition: number;
  questionState?: QuestionState;
  dulation: number;
}

export type DispatchProps = { onStart: () => void } & Pick<KarutaPlayingProps, 'onClickToriFuda' | 'onClickResult'> &
  Pick<KarutaPlayingCorrectProps, 'onClickGoToNext'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export type PresenterProps = Pick<OwnProps, 'onClickGoToResult'> &
  ConnectedProps &
  Omit<DispatchProps, 'onStart'> & { ready: boolean };

const ErrorMessage = styled(CenteredFrame)`
  height: 300px;
  width: 100%;
`;

export const TrainingQuestionsPresenter = ({
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

  if (totalCount === 0) {
    return (
      <ErrorMessage tag={`div`}>
        <Txt role={`error`}>指定した条件の歌はありませんでした。</Txt>
      </ErrorMessage>
    );
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

export const TrainingQuestions = (props: Props) => {
  // ここちょっと後で修正。。。
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    props.onStart();
    setReady(true);
  }, []);

  return <TrainingQuestionsPresenter {...props} ready={ready} />;
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
  dispatch: ThunkDispatch<GlobalState, {}, questionsTypes.Actions>,
  { karutas, rangeFrom, rangeTo, kimariji, color, kamiNoKuStyle, shimoNoKuStyle, questionAnim }: OwnProps
): DispatchProps => ({
  onStart: () => {
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
)(TrainingQuestions);