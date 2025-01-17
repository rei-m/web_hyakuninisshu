import type { QuestionId, Answer, KarutaNo } from '.';

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
