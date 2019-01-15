import { applyMiddleware, combineReducers, createStore as reduxCreateStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { questions, QuestionsState } from '@src/state/questions';
import { ui, UiState } from '@src/state/ui';

export interface GlobalState {
  questions: QuestionsState;
  ui: UiState;
}

export const reducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  questions,
  ui,
});

export const createStore = (): Store<GlobalState> => reduxCreateStore(reducer, applyMiddleware(thunk));
