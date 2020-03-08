import React from 'react';
import { Karuta } from '@src/domain/models';
import { questionsTypes } from '@src/state/questions';
import { useDiContainer } from '@src/presentation/hooks/useDiContainer';

import { inject as injectInfrastructureKaruta } from '@src/infrastructure/di/karutaModule';
import { inject as injectInfrastructureQuestion } from '@src/infrastructure/di/questionModule';
import { inject as injectStateQuestions } from '@src/state/di/questionsModule';

const infraKarutaModule = injectInfrastructureKaruta([]);
const infraQuestionModule = injectInfrastructureQuestion();
const stateQuestionsModule = injectStateQuestions(
  infraKarutaModule.karutaRepository,
  infraQuestionModule.questionRepository
);

export type Value = {
  questionsActionCreator: questionsTypes.ActionCreator;
};

export const defalutValue: Value = {
  ...stateQuestionsModule,
};

export const QuestionDiContainerContext = React.createContext<Value>(defalutValue);

export type Props = {
  allKarutaList: Array<Karuta>;
};

const QuestionDiContainerProvider: React.FC<Props> = ({ allKarutaList, children }) => {
  const { questionRepository } = useDiContainer();
  const currentInfraKarutaModule = injectInfrastructureKaruta(allKarutaList);
  const currentStateModule = injectStateQuestions(currentInfraKarutaModule.karutaRepository, questionRepository);
  const value: Value = {
    questionsActionCreator: currentStateModule.questionsActionCreator,
  };

  return <QuestionDiContainerContext.Provider value={value}>{children}</QuestionDiContainerContext.Provider>;
};

export default QuestionDiContainerProvider;
