import { START_TRAINING_NAME, TrainingActions } from '../../actions/trainings';
import { Question } from '../../types';
import { startTrainingReducer } from './startTrainingReducer';

export interface TrainingState {
  readonly questions: Question[];
  readonly lastStartedTime?: number;
}

const initialState: TrainingState = {
  questions: []
};

export default function karuta(
  state = initialState,
  action: TrainingActions
): TrainingState {
  switch (action.type) {
    case START_TRAINING_NAME:
      return startTrainingReducer(state, action);
    default:
      return state;
  }
}
