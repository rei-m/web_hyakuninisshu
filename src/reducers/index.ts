import { combineReducers, Reducer } from 'redux';
import karutas, { KarutasState } from './karutas';
import trainings, { TrainingsState } from './trainings';

export interface GlobalState {
  karutas: KarutasState;
  trainings: TrainingsState;
}

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karutas,
  trainings
});

export default rootReducer;
