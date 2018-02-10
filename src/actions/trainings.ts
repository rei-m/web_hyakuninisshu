import { Action } from 'redux';
import { getStore } from '../appStore';
import { Question } from '../types';
import { randomizeArray } from '../util';
import { fetchTorifudas, trainingFilter } from '../util/trainings';

export const START_TRAINING_NAME = 'START_TRAINING_NAME';
export type START_TRAINING_TYPE = typeof START_TRAINING_NAME;

export interface StartTrainingAction extends Action {
  type: START_TRAINING_TYPE;
  payload: {
    questions: Question[];
    startedTime: number;
  };
}

export type TrainingActions = StartTrainingAction;

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

  const questions = targetKarutas.map(k => {
    const correctKaruta = k;
    const yomifuda =
      kamiNoKuStyle === 0
        ? {
            firstText: k.firstKanji,
            karutaId: k.id,
            secondText: k.secondKanji,
            thirdText: k.thirdKanji
          }
        : {
            firstText: k.firstKana,
            karutaId: k.id,
            secondText: k.secondKana,
            thirdText: k.thirdKana
          };
    const torifudas = fetchTorifudas(karutas, correctKaruta).map(torifuda => {
      return shimoNoKuStyle === 0
        ? {
            fifthText: torifuda.fifthKanji,
            fourthText: torifuda.fourthKanji,
            karutaId: torifuda.id
          }
        : {
            fifthText: torifuda.fifthKana,
            fourthText: torifuda.fourthKana,
            karutaId: torifuda.id
          };
    });
    return { correctKaruta, yomifuda, torifudas };
  });

  return {
    payload: {
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_TRAINING_NAME
  };
};
