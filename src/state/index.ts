import { applyMiddleware, combineReducers, createStore as reduxCreateStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { questionsReducer, questionsTypes } from '@src/state/questions';
import { uiReducer, uiTypes } from '@src/state/ui';

export interface GlobalState {
  questions: questionsTypes.State;
  ui: uiTypes.State;
}

export const reducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  questions: questionsReducer,
  ui: uiReducer,
});

export const createStore = (): Store<GlobalState> => reduxCreateStore(reducer, applyMiddleware(thunk));
