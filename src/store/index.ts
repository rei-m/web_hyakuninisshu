import { applyMiddleware, createStore, Action, Store } from 'redux';
import thunk from 'redux-thunk';
import axios, { AxiosInstance } from 'axios';
import { rootReducer, GlobalState } from '@src/reducers';
import { KarutaActions } from '@src/actions/karutas';
import { QuestionsActions } from '@src/actions/questions';

type Actions = KarutaActions & QuestionsActions;

const store = createStore<GlobalState, Action<Actions>, {}, {}>(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ axios }))
);

export const getStore = (): Store<GlobalState> => {
  return store;
};

export interface ThunkExtra {
  axios: AxiosInstance;
}
