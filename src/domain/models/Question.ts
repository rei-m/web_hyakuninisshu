import { QuestionId, Answer, KarutaNo } from '.';
import { IllegalStateError, IllegalArgumentError } from '../errors';
import { randomizeArray } from '../utils/array';

/**
 * 問題
 */
export type Question = Readonly<{
  id: QuestionId; // ID
  correctAnswerKarutaNo: KarutaNo; // 問題の正解の歌番号
  choiceKarutaNoList: [KarutaNo, KarutaNo, KarutaNo, KarutaNo]; // 問題の選択肢の歌番号
  startTime?: number; // 問題の回答の開始時間（epoc秒）
  answer?: Answer; // 問題の回答
}>;

export const Question = {
  create: (
    id: number,
    correctAnswerKarutaNo: KarutaNo,
    wrongKarutaNoList: [KarutaNo, KarutaNo, KarutaNo]
  ): Question => {
    if (wrongKarutaNoList.includes(correctAnswerKarutaNo)) {
      throw new IllegalArgumentError(`wrongKarutaNoList includes correctAnswerKarutaNo`);
    }

    const choiceKarutaNoList = randomizeArray(wrongKarutaNoList.concat(correctAnswerKarutaNo)) as [
      KarutaNo,
      KarutaNo,
      KarutaNo,
      KarutaNo
    ];
    return {
      id,
      correctAnswerKarutaNo,
      choiceKarutaNoList,
    };
  },
  start: (question: Question, startDate: Date): Question => {
    return {
      ...question,
      startTime: startDate.getTime(),
    };
  },
  answer: (question: Question, selectedKarutaNo: KarutaNo, answerDate: Date): Question => {
    if (!question.startTime) {
      throw new IllegalStateError(`not started`);
    }
    const answer: Answer = {
      isCorrect: question.correctAnswerKarutaNo === selectedKarutaNo,
      answerMilliSec: answerDate.getTime() - question.startTime,
    };
    return {
      ...question,
      answer,
    };
  },
};
