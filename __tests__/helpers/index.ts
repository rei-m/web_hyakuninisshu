import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GlobalState } from '../../src/reducers';

const middlewares = [thunk];

export const mockAppStoreCreateor = configureStore<GlobalState>(middlewares);

export const sel = (id: string) => `[data-test="${id}"]`;
