import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios, { AxiosInstance } from 'axios';
import { GlobalState } from '../../src/reducers';

export const mockAppStoreCreateor = (axiosInstance: AxiosInstance = axios) => {
  return configureStore<GlobalState>([
    thunk.withExtraArgument({ axios: axiosInstance })
  ]);
};

export const sel = (id: string) => `[data-test="${id}"]`;
