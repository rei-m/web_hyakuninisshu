import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { GlobalState } from './reducers';

const store = createStore<GlobalState>(rootReducer, applyMiddleware(thunk));

export const getStore = (): Store<GlobalState> => {
  return store;
};
