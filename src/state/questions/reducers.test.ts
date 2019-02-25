import { questionsReducer, questionsTypes } from '@src/state/questions';
import { initialState } from '@src/state/questions/reducers';
import * as constants from '@src/state/questions/constants';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { Color, Karuta, Kimariji, Question } from '@src/types';
import { create } from '@helper/factory';

const setUpKarutas = () =>
  Array.from(Array(100).keys()).map(i =>
    create<Karuta>('karuta', {
      color: (i < 20 ? 'blue' : 'pink') as Color,
      id: (i + 1).toString(),
      no: i + 1,
      kimariji: ((i % 5) + 1) as Kimariji,
    })
  );

const setUpQuestions = () => [...Array(10).keys()].map(_ => create<Question>('question'));

describe('QuestionsReducer', () => {
  it('should be transition state that is Start Training', () => {
    const karutas = setUpKarutas();
    const questions = setUpQuestions();
    const action: questionsTypes.StartTrainingAction = {
      type: constants.START_TRAINING_NAME,
      payload: {
        karutas,
        nextState: QuestionState.InAnswer,
        questions,
        startedTime: 10000,
        dulation: 200,
      },
      meta: {
        color: ColorCondition.Blue,
        kamiNoKuStyle: KarutaStyleCondition.KanaOnly,
        kimariji: KimarijiCondition.One,
        rangeFrom: RangeFromCondition.FiftyOne,
        rangeTo: RangeToCondition.Sixty,
        shimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
        questionAnim: QuestionAnimCondition.Fast,
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState = {
      karutas,
      answers: [],
      currentIndex: 0,
      questions,
      dulation: 200,
      lastStartedTime: 10000,
      questionState: QuestionState.InAnswer,
      trainingCondition: {
        color: ColorCondition.Blue,
        kamiNoKuStyle: KarutaStyleCondition.KanaOnly,
        kimariji: KimarijiCondition.One,
        rangeFrom: RangeFromCondition.FiftyOne,
        rangeTo: RangeToCondition.Sixty,
        shimoNoKuStyle: KarutaStyleCondition.KanjiAndKana,
        questionAnim: QuestionAnimCondition.Fast,
      },
    };
    expect(actualState).toEqual(expectedState);
  });
});
