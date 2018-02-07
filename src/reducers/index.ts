import { combineReducers, Reducer } from 'redux';
import karuta, { KarutaState } from './karutas';
import Training, { TrainingState } from './trainings';

export interface GlobalState {
  karuta: KarutaState;
  training: TrainingState;
}

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karuta,
  training: Training
});

export default rootReducer;
