import { questionsReducer, questionsTypes } from '@src/state/questions';
import { initialState } from '@src/state/questions/reducers';
import * as constants from '@src/state/questions/constants';

describe('QuestionsReducer', () => {
  it('should return next state when StartTrainingAction received', () => {
    const action: questionsTypes.StartTrainingAction = {
      type: constants.START_TRAINING_NAME,
      payload: {
        currentQuestionId: 1,
        totalCount: 100,
      },
      meta: {
        color: 'blue',
        kamiNoKuStyle: 'kana',
        kimariji: 1,
        rangeFrom: 51,
        rangeTo: 60,
        shimoNoKuStyle: 'kanji',
        questionAnim: 'fast',
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState: questionsTypes.State = {
      state: 'ready',
      totalCount: 100,
      currentPosition: 1,
      currentQuestion: {
        questionId: 1,
      },
      trainingCondition: {
        color: 'blue',
        kamiNoKuStyle: 'kana',
        kimariji: 1,
        rangeFrom: 51,
        rangeTo: 60,
        shimoNoKuStyle: 'kanji',
        questionAnim: 'fast',
      },
      result: undefined,
    };
    expect(actualState).toEqual(expectedState);
  });
});
