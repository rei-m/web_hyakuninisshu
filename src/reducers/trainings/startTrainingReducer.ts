import { StartTrainingAction } from '../../actions/trainings';
import { TrainingState } from './';

export const startTrainingReducer = (
  _state: TrainingState,
  action: StartTrainingAction
): TrainingState => {
  return {
    lastStartedTime: action.payload.startedTime,
    questions: action.payload.questions
  };
};
