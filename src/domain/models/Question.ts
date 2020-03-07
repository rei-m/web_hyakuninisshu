import { QuestionId, Answer, KarutaNo } from '.';
import { IllegalStateError } from '../errors';

/**
 * 問題
 */
export type Question = Readonly<{
  id: QuestionId;
  correctAnswerKarutaNo: KarutaNo;
  choiceKarutaNoList: [KarutaNo, KarutaNo, KarutaNo, KarutaNo];
  startTime?: number;
  answer?: Answer;
}>;

export const Question = {
  start: (question: Question, startDate: Date): Question => {
    return {
      ...question,
      startTime: startDate.getTime(),
    };
  },
  answer: (question: Question, selectedKarutaNo: KarutaNo, answerDate: Date): Question => {
    if (!question.startTime) {
      throw new IllegalStateError(` not started`);
    }
    const answer: Answer = {
      isCorrect: question.correctAnswerKarutaNo === selectedKarutaNo,
      answerTime: answerDate.getTime() - question.startTime,
    };
    return {
      ...question,
      answer,
    };
  },
};
