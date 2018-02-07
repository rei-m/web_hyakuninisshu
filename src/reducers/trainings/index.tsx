import { START_TRAINING_NAME, TrainingActions } from '../../actions/trainings';
import { Question } from '../../types';

export interface TrainingState {
  readonly questions: Question[];
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
      // return fetchKarutasReducer(state, action);
      return state;
    default:
      return state;
  }
}
