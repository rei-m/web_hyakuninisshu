import { combineReducers, Reducer } from 'redux';
import karutas, { KarutasState } from './karutas';
import questions, { QuestionsState } from './questions';

export interface GlobalState {
  karutasState: KarutasState;
  questionsState: QuestionsState;
}

const rootReducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  karutasState: karutas,
  questionsState: questions
});

export default rootReducer;
