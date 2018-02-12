import { Action } from 'redux';
import { getStore } from '../appStore';
import { Answer, Question } from '../types';
import { randomizeArray } from '../util';
import { fetchTorifudas, trainingFilter } from '../util/trainings';

export const START_TRAINING_NAME = 'START_TRAINING_NAME';
export type START_TRAINING_TYPE = typeof START_TRAINING_NAME;

export const ANSWER_QUESTION_NAME = 'ANSWER_QUESTION_NAME';
export type ANSWER_QUESTION_TYPE = typeof ANSWER_QUESTION_NAME;

export const GO_TO_NEXT_QUESTION_NAME = 'GO_TO_NEXT_QUESTION_NAME';
export type GO_TO_NEXT_QUESTION_TYPE = typeof GO_TO_NEXT_QUESTION_NAME;

export interface StartTrainingAction extends Action {
  type: START_TRAINING_TYPE;
  payload: {
    questions: Question[];
    startedTime: number;
  };
}

export interface AnswerQuestionAction extends Action {
  type: ANSWER_QUESTION_TYPE;
  payload: {
    answer: Answer;
  };
}

export interface GoToNextQuestionAction extends Action {
  type: GO_TO_NEXT_QUESTION_TYPE;
  payload: {
    nextIndex: number;
  };
}

export type TrainingActions =
  | StartTrainingAction
  | AnswerQuestionAction
  | GoToNextQuestionAction;

/*
 * action creators
 */
export const startTraining = (
  rangeFrom: number,
  rangeTo: number,
  kimariji: number,
  color: string,
  kamiNoKuStyle: number,
  shimoNoKuStyle: number
): StartTrainingAction => {
  const { karutas } = getStore().getState().karutas;

  const targetKarutas = trainingFilter(karutas)(rangeFrom, rangeTo)(kimariji)(
    color
  );

  const questions = targetKarutas.map((k, i) => {
    const id = i + 1;
    const correctKaruta = k;
    const yomiFuda =
      kamiNoKuStyle === 0
        ? {
            firstText: k.firstKanji,
            karutaId: k.id,
            questionId: id,
            secondText: k.secondKanji,
            thirdText: k.thirdKanji
          }
        : {
            firstText: k.firstKana,
            karutaId: k.id,
            questionId: id,
            secondText: k.secondKana,
            thirdText: k.thirdKana
          };
    const toriFudas = fetchTorifudas(karutas, correctKaruta).map(toriFuda => {
      return shimoNoKuStyle === 0
        ? {
            fifthText: toriFuda.fifthKanji,
            fourthText: toriFuda.fourthKanji,
            karutaId: toriFuda.id,
            questionId: id
          }
        : {
            fifthText: toriFuda.fifthKana,
            fourthText: toriFuda.fourthKana,
            karutaId: toriFuda.id,
            questionId: id
          };
    });
    return { id, correctKaruta, yomiFuda, toriFudas };
  });

  return {
    payload: {
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_TRAINING_NAME
  };
};

export const answerQuestion = (
  questionId: number,
  karutaId: number
): AnswerQuestionAction => {
  const { questions } = getStore().getState().trainings;
  const question = questions.find(q => q.id === questionId)!;
  // TODO: Questionがundefinedの場合
  const correct = question.correctKaruta.id === karutaId;
  const answer = {
    correct,
    karutaId,
    questionId
  };
  return {
    payload: {
      answer
    },
    type: ANSWER_QUESTION_NAME
  };
};

export const goToNextQuestion = (): GoToNextQuestionAction => {
  const { currentIndex } = getStore().getState().trainings;
  const nextIndex = currentIndex + 1;
  return {
    payload: {
      nextIndex
    },
    type: GO_TO_NEXT_QUESTION_NAME
  };
};

export const restartTraining = (): StartTrainingAction => {
  const { questions, answers } = getStore().getState().trainings;
  // TODO: 全て回答済みでなかったらエラー
  const finder: { [questionId: number]: Question } = questions.reduce(
    (previous, current) => {
      return { ...previous, [current.id]: current };
    },
    {}
  );
  const targets = answers
    .filter(a => !a.correct)
    .map(a => finder[a.questionId]);
  return {
    payload: {
      questions: randomizeArray(targets),
      startedTime: new Date().getTime()
    },
    type: START_TRAINING_NAME
  };
};
