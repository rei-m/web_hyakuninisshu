import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@src/state';
import { QuestionDiContainerContext, defalutValue } from '@src/presentation/contexts/QuestionDiContainerProvider';

export const questionDiContainerContextDecorator = (story: any, value = defalutValue) => (
  <QuestionDiContainerContext.Provider value={value}>{story()}</QuestionDiContainerContext.Provider>
);

export const reduxStoreDecorator = (story: any, store = createStore()) => <Provider store={store}>{story()}</Provider>;
