/**
 * 問題の回答
 */
export type Answer = Readonly<{
  isCorrect: boolean; // 正解かどうか
  answerTime: number; // 回答した時間（epoc秒）
}>;
