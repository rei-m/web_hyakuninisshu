import { Question } from './Question';
import { MOCK_QUESTION_1, MOCK_QUESTION_1_STARTED } from '@helper/mocks/domain/questions';

describe('domain/models/Question', () => {
  describe('factory', () => {
    it('should create Question', () => {
      const actual = Question.create(1, 1, [2, 3, 4]);
      expect(actual.id).toEqual(1);
      expect(actual.correctAnswerKarutaNo).toEqual(1);
      expect(actual.choiceKarutaNoList).toContain(1);
      expect(actual.choiceKarutaNoList).toContain(2);
      expect(actual.choiceKarutaNoList).toContain(3);
      expect(actual.choiceKarutaNoList).toContain(4);
      expect(actual.startTime).toBeUndefined();
      expect(actual.answer).toBeUndefined();
    });

    it('should throw error when wrongKarutaNoList inclueds correctKarutaNo', () => {
      expect(() => {
        Question.create(1, 1, [1, 3, 4]);
      }).toThrow();
    });
  });

  describe('start', () => {
    it('should start answer Question', () => {
      const actual = Question.start(MOCK_QUESTION_1, new Date(2020, 2, 6));
      expect(actual.startTime).toEqual(new Date(2020, 2, 6).getTime());
    });
  });

  describe('answer', () => {
    it('should answer Question when correct', () => {
      const startTime = new Date(2020, 2, 6, 23, 20, 30).getTime();
      const answerDate = new Date(2020, 2, 6, 23, 20, 40);
      const actual = Question.answer({ ...MOCK_QUESTION_1_STARTED, startTime }, 1, answerDate);
      expect(actual.answer).toEqual({ isCorrect: true, answerMilliSec: 10000 });
    });

    it('should answer Question when wrong', () => {
      const startTime = new Date(2020, 2, 6, 23, 20, 30).getTime();
      const answerDate = new Date(2020, 2, 6, 23, 20, 40);
      const actual = Question.answer({ ...MOCK_QUESTION_1_STARTED, startTime }, 2, answerDate);
      expect(actual.answer).toEqual({ isCorrect: false, answerMilliSec: 10000 });
    });

    it('should throw error when question is not started', () => {
      expect(() => {
        Question.answer(MOCK_QUESTION_1, 2, new Date(2020, 2, 6, 23, 20, 40));
      }).toThrow();
    });
  });
});
