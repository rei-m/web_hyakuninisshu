import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { rootReducer, GlobalState } from '../reducers';

const store = createStore<GlobalState>(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ axios }))
);

export const getStore = (): Store<GlobalState> => {
  return store;
};
