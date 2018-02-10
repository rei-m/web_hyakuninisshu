import { create } from '../factories';
import {
  startTraining,
  START_TRAINING_NAME
} from '../../src/actions/trainings';
import { getStore } from '../../src/appStore';
import { Karuta } from '../../src/types';

describe('TrainingActionCreator', () => {
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
      getStore().getState().karutas = { karutas };
    });

    it('should create Action', () => {
      const actual = startTraining(1, 100, 0, '', 0, 1);
      const { type, payload } = actual;
      const { questions, startedTime } = payload;

      const { correctKaruta, yomifuda, torifudas } = questions[0];
      expect(questions).toHaveLength(100);
      expect(yomifuda.firstText).toEqual(correctKaruta.firstKanji);
      expect(yomifuda.secondText).toEqual(correctKaruta.secondKanji);
      expect(yomifuda.thirdText).toEqual(correctKaruta.thirdKanji);
      expect(torifudas.map(f => f.fourthText)).toContain(
        correctKaruta.fourthKana
      );
      expect(torifudas.map(f => f.fifthText)).toContain(
        correctKaruta.fifthKana
      );
      expect(type).toEqual(START_TRAINING_NAME);
      expect(startedTime).not.toBeUndefined();
    });

    describe('when filter by range', () => {
      it('should payload has filtered Karuta', () => {
        const actual = startTraining(21, 40, 0, '', 0, 1);
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
        const actual = startTraining(1, 100, 1, '', 0, 1);
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
        const actual = startTraining(1, 100, 0, 'blue', 0, 1);
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
        const actual = startTraining(1, 100, 0, '', 1, 0);
        const { questions } = actual.payload;
        const { correctKaruta, yomifuda, torifudas } = questions[0];
        expect(yomifuda.firstText).toEqual(correctKaruta.firstKana);
        expect(yomifuda.secondText).toEqual(correctKaruta.secondKana);
        expect(yomifuda.thirdText).toEqual(correctKaruta.thirdKana);
        expect(torifudas.map(f => f.fourthText)).toContain(
          correctKaruta.fourthKanji
        );
        expect(torifudas.map(f => f.fifthText)).toContain(
          correctKaruta.fifthKanji
        );
      });
    });
  });
});
