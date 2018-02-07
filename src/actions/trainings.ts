import { Action } from 'redux';
import { getStore } from '../appStore';

export const START_TRAINING_NAME = 'START_TRAINING_NAME';
export type START_TRAINING_TYPE = typeof START_TRAINING_NAME;

export interface StartTrainingAction extends Action {
  type: START_TRAINING_TYPE;
  payload: {};
}

export type TrainingActions = StartTrainingAction;

/*
 * action creators
 */
export const startTraining = (): StartTrainingAction => {
  console.dir(getStore().getState());
  return {
    payload: {},
    type: START_TRAINING_NAME
  };
};
