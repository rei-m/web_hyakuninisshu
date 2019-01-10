import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import TrainingInitializer from '@src/containers/TrainingInitializer';
import QuestionView, { Props as QuestionViewProps } from '@src/components/QuestionView';
import QuestionCorrect, { Props as QuestionCorrectProps } from '@src/components/QuestionCorrect';
import TrainingResult, { Props as TrainingResultProps } from '@src/components/TrainingResult';
import ErrorMessage from '@src/components/ErrorMessage';
import { GlobalState } from '@src/state';
import {
  answerQuestion,
  confirmCorrect,
  finishQuestions,
  openNextQuestion,
  restartQuestions,
  QuestionsActions,
} from '@src/actions/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
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
  Pick<TrainingResultProps, 'onClickRestart'>;

export type Props = OwnProps & ConnectedProps & DispatchProps;

export const TrainingQuestions: React.FC<Props> = ({
  karutas,
  rangeFrom,
  rangeTo,
  kimariji,
  color,
  kamiNoKuStyle,
  shimoNoKuStyle,
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
    return (
      <TrainingInitializer
        karutas={karutas}
        rangeFrom={rangeFrom}
        rangeTo={rangeTo}
        kimariji={kimariji}
        color={color}
        kamiNoKuStyle={kamiNoKuStyle}
        shimoNoKuStyle={shimoNoKuStyle}
      />
    );
  }

  if (questions.length === 0) {
    return <ErrorMessage text="指定した条件の歌はありませんでした" />;
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
        <TrainingResult
          averageAnswerSecond={Math.round(averageAnswerSecond * 100) / 100}
          totalCount={totalCount}
          correctCount={answers.filter(a => a.correct).length}
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
)(TrainingQuestions);
