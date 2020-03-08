import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { reduxStoreDecorator, questionDiContainerContextDecorator } from '@helper/storybook';
import { Presenter, PresenterProps } from './result';
import { Value } from '@src/presentation/contexts/QuestionDiContainerProvider';
import { questionsTypes } from '@src/state/questions';
import { QuestionId, Karuta } from '@src/domain/models';
import {
  MOCK_YOMIFUDA_1,
  MOCK_TORIFUDA_1,
  MOCK_TORIFUDA_2,
  MOCK_TORIFUDA_3,
  MOCK_TORIFUDA_4,
} from '@helper/mocks/state/questions';
import { MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';

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

const correctAnswerList: Array<{
  questionId: QuestionId;
  isCorrect: boolean;
  correctKaruta: Karuta;
}> = MOCK_ALL_KARUTA_LIST.slice(0, 75).map(k => ({
  questionId: k.no,
  isCorrect: true,
  correctKaruta: k,
}));

const wrongAnswerList: Array<{
  questionId: QuestionId;
  isCorrect: boolean;
  correctKaruta: Karuta;
}> = MOCK_ALL_KARUTA_LIST.slice(75, 100).map(k => ({
  questionId: k.no,
  isCorrect: true,
  correctKaruta: k,
}));

const props: PresenterProps = {
  state: 'finished',
  result: {
    correctCount: 75,
    averageAnswerSecond: 2.67,
    answerList: [...correctAnswerList, ...wrongAnswerList],
  },
  totalCount: 100,
  onClickRestart: action('onClickRestart'),
  onClickBack: action('onClickBack'),
  onClickJudgement: action('onClickJudgement'),
  onCloseMaterialDialog: action('onCloseMaterialDialog'),
};

storiesOf('pages/exam/result', module)
  .addDecorator(story => reduxStoreDecorator(story))
  .addDecorator(story => questionDiContainerContextDecorator(story, value))
  .add('default', () => <Presenter {...props} />);
