import { applyMiddleware, combineReducers, createStore as reduxCreateStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { questions, QuestionsState } from '@src/state/questions';
import { uiReducer, uiTypes } from '@src/state/ducks/ui';

export interface GlobalState {
  questions: QuestionsState;
  ui: uiTypes.UiState;
}

export const reducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  questions,
  ui: uiReducer,
});

export const createStore = (): Store<GlobalState> => reduxCreateStore(reducer, applyMiddleware(thunk));
