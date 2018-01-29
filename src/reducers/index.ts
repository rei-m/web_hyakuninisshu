import { combineReducers, Reducer } from 'redux';
import karuta, { KarutaState } from './karuta';

export interface GlobalState {
  karuta: KarutaState;
}

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karuta
});

export default rootReducer;
