/**
 * 問題の回答
 */
export type Answer = Readonly<{
  isCorrect: boolean; // 正解かどうか
  answerMilliSec: number; // 回答にかかった時間(millisec)
}>;
