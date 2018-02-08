import { StartTrainingAction } from '../../actions/trainings';
import { TrainingState } from './';

export const startTrainingReducer = (
  _state: TrainingState,
  action: StartTrainingAction
): TrainingState => {
  return {
    questions: action.payload.questions
  };
};
