import { combineReducers, Reducer } from 'redux';
import { karutasReducer, KarutasState } from './karutas';
import { questionsReducer, QuestionsState } from './questions';

export interface GlobalState {
  karutasState: KarutasState;
  questionsState: QuestionsState;
}

export const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karutasState: karutasReducer,
  questionsState: questionsReducer
});
