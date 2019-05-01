import { Dispatch } from 'redux';
import { Karuta } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { GlobalState } from '@src/state';
import * as actions from './actions';
import * as types from './types';

export const startTraining = (
  karutas: Karuta[],
  rangeFrom: RangeFromCondition,
  rangeTo: RangeToCondition,
  kimariji: KimarijiCondition,
  color: ColorCondition,
  kamiNoKuStyle: KarutaStyleCondition,
  shimoNoKuStyle: KarutaStyleCondition,
  questionAnim: QuestionAnimCondition
) => (dispatch: Dispatch<types.StartTrainingAction>) =>
  dispatch(
    actions.startTraining(karutas, rangeFrom, rangeTo, kimariji, color, kamiNoKuStyle, shimoNoKuStyle, questionAnim)
  );

export const startExam = (karutas: Karuta[]) => (dispatch: Dispatch<types.StartExamAction>) =>
  dispatch(actions.startExam(karutas));

export const restartQuestions = () => (
  dispatch: Dispatch<types.RestartQuestionsAction>,
  getState: () => GlobalState
) => {
  const { questions, answers } = getState().questions;
  if (questions && answers) {
    dispatch(actions.restartQuestions(questions, answers));
  }
};

export const answerQuestion = (questionId: number, karutaNo: number) => (
  dispatch: Dispatch<types.AnswerQuestionAction>,
  getState: () => GlobalState
) => {
  const { questions, lastStartedTime } = getState().questions;
  if (questions) {
    dispatch(actions.answerQuestion(questionId, karutaNo, questions, lastStartedTime));
  }
};

export const confirmCorrect = () => (dispatch: Dispatch<types.ConfirmCorrectAction>, getState: () => GlobalState) => {
  const { questions, answers } = getState().questions;
  if (questions && answers) {
    dispatch(actions.confirmCorrect(questions, answers));
  }
};

export const openNextQuestion = () => (
  dispatch: Dispatch<types.OpenNextQuestionAction>,
  getState: () => GlobalState
) => {
  const { currentIndex } = getState().questions;
  dispatch(actions.openNextQuestion(currentIndex));
};

export const finishQuestion = () => (dispatch: Dispatch<types.FinishQuestionAction>, _getState: () => GlobalState) => {
  dispatch(actions.finishQuestion());
};
