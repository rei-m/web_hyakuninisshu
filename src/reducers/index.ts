import { combineReducers, Reducer } from 'redux';
import { karutasReducer, KarutasState } from '@src/reducers/karutas';
import { questionsReducer, QuestionsState } from '@src/reducers/questions';

export interface GlobalState {
  karutasState: KarutasState;
  questionsState: QuestionsState;
}

export const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karutasState: karutasReducer,
  questionsState: questionsReducer
});
