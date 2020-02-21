import { applyMiddleware, combineReducers, createStore as reduxCreateStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { questionsReducer, questionsTypes } from '@src/state/questions';
import { uiReducer, uiTypes } from '@src/state/ui';

export type GlobalState = {
  questions: questionsTypes.State;
  ui: uiTypes.State;
};

export type Payload<T> = Readonly<{
  payload: Readonly<T>;
}>;

export type Meta<T> = Readonly<{
  meta: Readonly<T>;
}>;

export const reducer: Reducer<GlobalState> = combineReducers<GlobalState>({
  questions: questionsReducer,
  ui: uiReducer,
});

export const createStore = (): Store<GlobalState> => reduxCreateStore(reducer, applyMiddleware(thunk));
