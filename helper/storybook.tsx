import React from 'react';
import { Provider } from 'react-redux';
import { RenderFunction } from '@storybook/react';
import { createStore } from '@src/state';

export const reduxStoreDecorator = (story: RenderFunction, store = createStore()) => (
  <Provider store={store}>{story()}</Provider>
);
