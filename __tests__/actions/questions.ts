import { create } from '../factories';
import {
  startTraining,
  START_TRAINING_NAME
} from '../../src/actions/questions';
import { getStore } from '../../src/store';
import { Karuta } from '../../src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  RangeFromCondition,
  RangeToCondition
} from '../../src/enums';

describe('QuestionsActionCreator', () => {
  describe('startTraining', () => {
    let karutas: Karuta[];

    beforeEach(() => {
      karutas = [...Array(100).keys()].map(i =>
        create<Karuta>('karuta', {
          color: i < 20 ? 'blue' : 'pink',
          id: i + 1,
          kimariji: i % 5 + 1
        })
      );
      getStore().getState().karutasState = { karutas };
    });

    it('should create Action', () => {
      const actual = startTraining(
        RangeFromCondition.One,
        RangeToCondition.OneHundred,
        KimarijiCondition.None,
        ColorCondition.None,
        KarutaStyleCondition.KanjiAndKana,
        KarutaStyleCondition.KanaOnly
      );
      const { type, payload } = actual;
      const { questions, startedTime } = payload;

      const { correctKaruta, yomiFuda, toriFudas } = questions[0];
      expect(questions).toHaveLength(100);
      expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
      expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
      expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
      expect(toriFudas.map(f => f.fourthText)).toContain(
        correctKaruta.fourthKana
      );
      expect(toriFudas.map(f => f.fifthText)).toContain(
        correctKaruta.fifthKana
      );
      expect(type).toEqual(START_TRAINING_NAME);
      expect(startedTime).not.toBeUndefined();
    });

    describe('when filter by range', () => {
      it('should payload has filtered Karuta', () => {
        const actual = startTraining(
          RangeFromCondition.TwentyOne,
          RangeToCondition.Forty,
          KimarijiCondition.None,
          ColorCondition.None,
          KarutaStyleCondition.KanjiAndKana,
          KarutaStyleCondition.KanaOnly
        );
        const { questions, startedTime } = actual.payload;
        const karutaIds = questions.map(q => q.correctKaruta.id);
        expect(questions).toHaveLength(20);
        expect(karutaIds).toContain(21);
        expect(karutaIds).toContain(40);
        expect(startedTime).not.toBeUndefined();
      });
    });

    describe('when filter by kimariji', () => {
      it('should payload has filtered Karuta', () => {
        const actual = startTraining(
          RangeFromCondition.One,
          RangeToCondition.OneHundred,
          KimarijiCondition.One,
          ColorCondition.None,
          KarutaStyleCondition.KanjiAndKana,
          KarutaStyleCondition.KanaOnly
        );
        const { questions, startedTime } = actual.payload;
        expect(questions).toHaveLength(20);
        expect(
          questions.every(q => q.correctKaruta.kimariji === 1)
        ).toBeTruthy();
        expect(startedTime).not.toBeUndefined();
      });
    });

    describe('when filter by color', () => {
      it('should payload has filtered Karuta', () => {
        const actual = startTraining(
          RangeFromCondition.One,
          RangeToCondition.OneHundred,
          KimarijiCondition.None,
          ColorCondition.Blue,
          KarutaStyleCondition.KanjiAndKana,
          KarutaStyleCondition.KanaOnly
        );
        const { questions, startedTime } = actual.payload;
        expect(questions).toHaveLength(20);
        expect(
          questions.every(q => q.correctKaruta.color === 'blue')
        ).toBeTruthy();
        expect(startedTime).not.toBeUndefined();
      });
    });

    describe('when switch karuta style', () => {
      it('should yomiFuda style is kana and toriFuda style is kanji', () => {
        const actual = startTraining(
          RangeFromCondition.One,
          RangeToCondition.OneHundred,
          KimarijiCondition.None,
          ColorCondition.None,
          KarutaStyleCondition.KanaOnly,
          KarutaStyleCondition.KanjiAndKana
        );
        const { questions } = actual.payload;
        const { correctKaruta, yomiFuda, toriFudas } = questions[0];
        expect(yomiFuda.firstText).toEqual(correctKaruta.firstKana);
        expect(yomiFuda.secondText).toEqual(correctKaruta.secondKana);
        expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKana);
        expect(toriFudas.map(f => f.fourthText)).toContain(
          correctKaruta.fourthKanji
        );
        expect(toriFudas.map(f => f.fifthText)).toContain(
          correctKaruta.fifthKanji
        );
      });
    });
  });
});
