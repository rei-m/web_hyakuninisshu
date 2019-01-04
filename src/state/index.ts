import { applyMiddleware, combineReducers, createStore as reduxCreateStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { questions, QuestionsState } from '@src/state/questions';

export interface GlobalState {
  questions: QuestionsState;
}

export const reducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  questions,
});

export const createStore = (): Store<GlobalState> => reduxCreateStore(reducer, applyMiddleware(thunk));
