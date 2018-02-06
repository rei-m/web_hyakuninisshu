import { combineReducers, Reducer } from 'redux';
import karuta, { KarutaState } from './karuta';
import Training, { TrainingState } from './Training';

export interface GlobalState {
  karuta: KarutaState;
  training: TrainingState;
}

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karuta,
  training: Training
});

export default rootReducer;
