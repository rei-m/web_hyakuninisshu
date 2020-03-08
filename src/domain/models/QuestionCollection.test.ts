import { QuestionCollection } from './QuestionCollection';
import {
  MOCK_QUESTION_1_ANSWERED_CORRECT,
  MOCK_QUESTION_2_ANSWERED_WRONG,
  MOCK_QUESTION_1_STARTED,
} from '@helper/mocks/domain/questions';

describe('domain/models/QuestionCollection', () => {
  describe('aggregate', () => {
    it('should aggregate result', () => {
      const actual = QuestionCollection.aggregate([MOCK_QUESTION_1_ANSWERED_CORRECT, MOCK_QUESTION_2_ANSWERED_WRONG]);
      expect(actual).toEqual({
        correctCount: 1,
        averageAnswerSecond: 1.5,
        answerList: [
          {
            correctAnswerKarutaNo: 1,
            isCorrect: true,
            questionId: 1,
          },
          {
            correctAnswerKarutaNo: 2,
            isCorrect: false,
            questionId: 2,
          },
        ],
      });
    });

    it('should throw error when questionList is empty', () => {
      expect(() => {
        QuestionCollection.aggregate([]);
      }).toThrow();
    });

    it('should throw error when questionList includes not answered', () => {
      expect(() => {
        QuestionCollection.aggregate([MOCK_QUESTION_1_ANSWERED_CORRECT, MOCK_QUESTION_1_STARTED]);
      }).toThrow();
    });
  });
});
