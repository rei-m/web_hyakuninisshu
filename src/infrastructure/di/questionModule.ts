import { QuestionRepository } from '@src/domain/repositories';
import { QuestionRepositoryImpl } from '../repositories/QuestionRepositoryImpl';

export type Module = {
  questionRepository: QuestionRepository;
};

export const inject = (): Module => {
  return {
    questionRepository: new QuestionRepositoryImpl(),
  };
};
