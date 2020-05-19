import { Question } from './Question';
import { QuestionId } from './QuestionId';
import { KarutaNo } from './KarutaNo';
import { IllegalStateError, IllegalArgumentError } from '../errors';

export const QuestionCollection = {
  aggregate: (
    questionList: ReadonlyArray<Question>
  ): {
    correctCount: number;
    averageAnswerSecond: number;
    answerList: ReadonlyArray<{
      questionId: QuestionId;
      isCorrect: boolean;
      correctAnswerKarutaNo: KarutaNo;
    }>;
  } => {
    if (questionList.length === 0) {
      throw new IllegalArgumentError(`questionList is empty`);
    }
    const totalCount = questionList.length;

    let correctCount = 0;
    let totalAnswerMilliSec = 0;
    const answerList: Array<{
      questionId: QuestionId;
      isCorrect: boolean;
      correctAnswerKarutaNo: KarutaNo;
    }> = [];

    questionList.forEach((question) => {
      const answer = question.answer;
      if (!answer) {
        throw new IllegalStateError(`not answered`);
      }
      correctCount += answer.isCorrect ? 1 : 0;
      totalAnswerMilliSec += answer.answerMilliSec;
      answerList.push({
        questionId: question.id,
        isCorrect: answer.isCorrect,
        correctAnswerKarutaNo: question.correctAnswerKarutaNo,
      });
    });

    const averageAnswerSecond = totalAnswerMilliSec / 1000 / totalCount;

    return {
      correctCount,
      averageAnswerSecond: Math.round(averageAnswerSecond * 100) / 100,
      answerList,
    };
  },
};
