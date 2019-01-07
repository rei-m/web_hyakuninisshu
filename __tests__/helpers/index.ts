import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios, { AxiosInstance } from 'axios';
import { GlobalState } from '@src/state';
import { StaticQuery } from 'gatsby';

export const mockAppStoreCreateor = (axiosInstance: AxiosInstance = axios) => {
  return configureStore<GlobalState>([thunk.withExtraArgument({ axios: axiosInstance })]);
};

export const sel = (id: string) => `[data-test="${id}"]`;

export const mockStaticQuery: jest.Mock<StaticQuery> = StaticQuery as jest.Mock<StaticQuery>;
