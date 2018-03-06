import { create } from '../factories';
import { mockAppStoreCreateor } from '../helpers';
import {
  startTraining,
  START_TRAINING_NAME
} from '../../src/actions/questions';
import { initialState as questionsInitialState } from '../../src/reducers/questions';
import { Karuta } from '../../src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition
} from '../../src/enums';

const setUpKarutas = () =>
  [...Array(100).keys()].map(i =>
    create<Karuta>('karuta', {
      color: i < 20 ? 'blue' : 'pink',
      id: i + 1,
      kimariji: i % 5 + 1
    })
  );

const setUpStore = () => {
  const karutas = setUpKarutas();
  return mockAppStoreCreateor({
    karutasState: { karutas },
    questionsState: questionsInitialState
  });
};

describe('QuestionsActionCreator', () => {
  it('should create StartTrainingAction', () => {
    const actionCreator = startTraining(
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStore();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { type, payload } = action;
    const { questions, startedTime } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(questions).toHaveLength(100);
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
    expect(toriFudas.map(f => f.fourthText)).toContain(
      correctKaruta.fourthKana
    );
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKana);
    expect(type).toEqual(START_TRAINING_NAME);
    expect(startedTime).not.toBeUndefined();
  });

  it('should return payload filtered by range', () => {
    const actionCreator = startTraining(
      RangeFromCondition.TwentyOne,
      RangeToCondition.Forty,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStore();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { payload } = action;
    const { questions, startedTime } = payload;
    const karutaIds = questions.map(q => q.correctKaruta.id);
    expect(questions).toHaveLength(20);
    expect(karutaIds).toContain(21);
    expect(karutaIds).toContain(40);
    expect(startedTime).not.toBeUndefined();
  });

  it('should return payload filtered by kimariji', () => {
    const actionCreator = startTraining(
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.One,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStore();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { payload } = action;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.kimariji === 1)).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return payload filtered by color', () => {
    const actionCreator = startTraining(
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.Blue,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStore();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { payload } = action;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.color === 'blue')).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return payload switched by karuta style', () => {
    const actionCreator = startTraining(
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanaOnly,
      KarutaStyleCondition.KanjiAndKana
    );

    const store = setUpStore();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { payload } = action;
    const { questions } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKana);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKana);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKana);
    expect(toriFudas.map(f => f.fourthText)).toContain(
      correctKaruta.fourthKanji
    );
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKanji);
  });
});
