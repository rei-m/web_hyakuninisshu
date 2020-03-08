import { InitializeQuestionListService } from '@src/domain/services';
import { questionsTypes } from '../questions';
import { KarutaRepository, QuestionRepository } from '@src/domain/repositories';
import { ActionCreatorImpl } from '../questions/actions';

export type Module = {
  questionsActionCreator: questionsTypes.ActionCreator;
};

export const inject = (karutaRepository: KarutaRepository, questionRepository: QuestionRepository): Module => {
  const initializeQuestionListService: InitializeQuestionListService = new InitializeQuestionListService(
    karutaRepository,
    questionRepository
  );
  return {
    questionsActionCreator: new ActionCreatorImpl(karutaRepository, questionRepository, initializeQuestionListService),
  };
};
