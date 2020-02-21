import React from 'react';
import { QuestionRepository } from '@src/domain/repositories';
import { inject as injectInfrastructureQuestions } from '@src/infrastructure/di/questionModule';
import { uiTypes } from '@src/state/ui';
import { inject as injectStateUi } from '@src/state/di/uiModule';

const infrastructureKarutaModule = injectInfrastructureQuestions();
const stateUiModule = injectStateUi();

type Value = {
  questionRepository: QuestionRepository;
  uiActionCreator: uiTypes.ActionCreator;
};

export const defalutValue: Value = {
  ...infrastructureKarutaModule,
  ...stateUiModule,
};

export const DiContainerContext = React.createContext<Value>(defalutValue);

const DiContainerProvider: React.FC<{ value: Value }> = ({ children, value = defalutValue }) => (
  <DiContainerContext.Provider value={value}>{children}</DiContainerContext.Provider>
);

export default DiContainerProvider;
