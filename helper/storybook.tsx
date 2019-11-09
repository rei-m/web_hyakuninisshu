import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@src/state';

export const reduxStoreDecorator = (story: any, store = createStore()) => <Provider store={store}>{story()}</Provider>;
