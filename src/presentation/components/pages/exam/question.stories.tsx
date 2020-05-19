import React from 'react';
import createMockStore from 'redux-mock-store';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator, questionDiContainerContextDecorator } from '@helper/storybook';
import ExamQuestionPage from './question';
import { Value } from '@src/presentation/contexts/QuestionDiContainerProvider';
import { GlobalState, createStore } from '@src/state';
import { questionsTypes } from '@src/state/questions';
import { QuestionId } from '@src/domain/models';
import {
  MOCK_YOMIFUDA_1,
  MOCK_TORIFUDA_1,
  MOCK_TORIFUDA_2,
  MOCK_TORIFUDA_3,
  MOCK_TORIFUDA_4,
} from '@helper/mocks/state/questions';

const orgState = createStore().getState();

const store = createMockStore<GlobalState>()({
  ...orgState,
  questions: {
    ...orgState.questions,
    state: 'playing',
    totalCount: 100,
    currentPosition: 1,
    currentQuestion: {
      questionId: 1,
      content: {
        yomiFuda: MOCK_YOMIFUDA_1,
        toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
      },
    },
  },
});

const questionsActionCreator: questionsTypes.ActionCreator = {
  startQuestion: (
    _currentQuestionId: QuestionId,
    _kamiNoKuStyle: questionsTypes.KarutaStyleCondition,
    _shimoNoKuStyle: questionsTypes.KarutaStyleCondition,
    _startDate: Date
  ) => {
    return {
      type: 'START_QUESTION_NAME',
      payload: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
      },
    };
  },
} as questionsTypes.ActionCreator;

const value: Value = {
  questionsActionCreator,
};

storiesOf('pages/exam/question', module)
  .addDecorator((story) => reduxStoreDecorator(story, store))
  .addDecorator((story) => questionDiContainerContextDecorator(story, value))
  .add('default', () => <ExamQuestionPage />);
