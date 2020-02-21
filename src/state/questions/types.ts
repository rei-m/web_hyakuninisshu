import { Action } from 'redux';
import { Kimariji, Color, QuestionId, KarutaNo, Karuta } from '@src/domain/models';
import * as constants from './constants';
import { Meta, Payload } from '..';

type Condition<T> = {
  values: Array<T>;
};

export type RangeFromCondition = 1 | 11 | 21 | 31 | 41 | 51 | 61 | 71 | 81 | 91;
export const RangeFromCondition: Condition<RangeFromCondition> = {
  values: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
};

export type RangeToCondition = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export const RangeToCondition: Condition<RangeToCondition> = {
  values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

export type KimarijiCondition = null | Kimariji;
export const KimarijiCondition: Condition<KimarijiCondition> = {
  values: [null, 1, 2, 3, 4, 5, 6],
};

export type ColorCondition = null | Color;
export const ColorCondition: Condition<ColorCondition> = {
  values: [null, 'blue', 'pink', 'yellow', 'green', 'orange'],
};

export type KarutaStyleCondition = 'kanji' | 'kana';
export const KarutaStyleCondition: Condition<KarutaStyleCondition> = {
  values: ['kanji', 'kana'],
};

export type QuestionAnimCondition = 'none' | 'slow' | 'normal' | 'fast';
export const QuestionAnimCondition: Condition<QuestionAnimCondition> & {
  toDulation: (value: QuestionAnimCondition) => number;
} = {
  values: ['none', 'slow', 'normal', 'fast'],
  toDulation: (value: QuestionAnimCondition) => {
    switch (value) {
      case 'normal':
        return 0.6;
      case 'fast':
        return 0.3;
      case 'slow':
        return 1.0;
      default:
        return 0;
    }
  },
};

export type YomiFuda = Readonly<{
  karutaNo: KarutaNo;
  shoku: string;
  niku: string;
  sanku: string;
}>;

export type ToriFuda = Readonly<{
  karutaNo: KarutaNo;
  shiku: string;
  kekku: string;
}>;

export type StartTrainingAction = Action<typeof constants.START_TRAINING_NAME> &
  Payload<{
    currentQuestionId: QuestionId;
    totalCount: number;
  }> &
  Meta<{
    rangeFrom: RangeFromCondition;
    rangeTo: RangeToCondition;
    kimariji: KimarijiCondition;
    color: ColorCondition;
    kamiNoKuStyle: KarutaStyleCondition;
    shimoNoKuStyle: KarutaStyleCondition;
    questionAnim: QuestionAnimCondition;
  }>;

export type RestartTrainingAction = Action<typeof constants.RESTART_TRAINING_NAME> &
  Payload<{
    currentQuestionId: QuestionId;
    totalCount: number;
  }>;

export type StartExamAction = Action<typeof constants.START_EXAM_NAME> &
  Payload<{
    currentQuestionId: QuestionId;
    totalCount: number;
  }>;

export type StartQuestionAction = Action<typeof constants.START_QUESTION_NAME> &
  Payload<{
    questionId: QuestionId;
    content: {
      yomiFuda: YomiFuda;
      toriFudaList: [ToriFuda, ToriFuda, ToriFuda, ToriFuda];
    };
  }>;

export type ResetQuestionAction = Action<typeof constants.RESET_QUESTION_NAME>;

export type FinishQuestionAction = Action<typeof constants.FINISH_QUESTION_NAME> &
  Payload<{
    correctCount: number;
    averageAnswerSecond: number;
    answerList: Array<{
      questionId: QuestionId;
      isCorrect: boolean;
      correctKaruta: Karuta;
    }>;
  }>;

export type AnswerQuestionAction = Action<typeof constants.ANSWER_QUESTION_NAME> &
  Payload<{
    isCorrect: boolean;
    selectedKarutaNo: KarutaNo;
    correctKaruta: Karuta;
  }>;

export type ConfirmCorrectAction = Action<typeof constants.CONFIRM_CORRECT_NAME>;

export type OpenNextQuestionAction = Action<typeof constants.OPEN_NEXT_QUESTION_NAME> &
  Payload<{
    currentQuestionId: QuestionId;
  }>;

export type Actions =
  | StartTrainingAction
  | RestartTrainingAction
  | StartExamAction
  | StartQuestionAction
  | ResetQuestionAction
  | FinishQuestionAction
  | AnswerQuestionAction
  | ConfirmCorrectAction
  | OpenNextQuestionAction;

export type ActionCreator = {
  /**
   * 指定した条件から問題を作成/保存してStartTrainingActionを返す
   *
   * @param rangeFrom 出題範囲From
   * @param rangeTo 出題範囲To
   * @param kimariji 決まり字条件
   * @param color 色条件
   * @param kamiNoKuStyle 上の句表示形式
   * @param shimoNoKuStyle 下の句表示形式
   * @param questionAnim 問題の表示速度
   *
   * @returns {StartTrainingAction}
   * @throws {Error} 指定した条件に当てはまる歌が無い場合
   */
  startTraining: (
    rangeFrom: RangeFromCondition,
    rangeTo: RangeToCondition,
    kimariji: KimarijiCondition,
    color: ColorCondition,
    kamiNoKuStyle: KarutaStyleCondition,
    shimoNoKuStyle: KarutaStyleCondition,
    questionAnim: QuestionAnimCondition
  ) => StartTrainingAction;

  /**
   * 回答済の問題の中から間違えた問題をもとに問題を作成/保存してRestartTrainingActionを返す
   *
   * @returns {RestartTrainingAction}
   * @throws {Error} 指定した条件に当てはまる歌が無い場合
   */
  restartTraining: () => RestartTrainingAction;

  /**
   * 全ての歌を対象に問題を作成/保存してStartExamActionを返す
   *
   * @returns {StartExamAction}
   * @throws {Error} 指定した条件に当てはまる歌が無い場合
   */
  startExam: () => StartExamAction;

  /**
   * 問題の回答を開始してStartQuestionActionを返す
   *
   * @returns {StartQuestionAction}
   * @throws {Error} 指定した問題がない場合
   */
  startQuestion: (
    currentQuestionId: QuestionId,
    kamiNoKuStyle: KarutaStyleCondition,
    shimoNoKuStyle: KarutaStyleCondition,
    startDate: Date
  ) => StartQuestionAction;

  /**
   * 問題の回答を判定してAnswerQuestionActionを返す
   *
   * @returns {AnswerQuestionAction}
   * @throws {Error} 指定した問題がない場合
   * @throws {Error} 問題の回答が開始されていない場合
   */
  answerQuestion: (currentQuestionId: QuestionId, toriFuda: ToriFuda, answerDate: Date) => AnswerQuestionAction;

  /**
   * ConfirmCorrectActionを返す
   *
   * @returns {ConfirmCorrectAction}
   */
  confirmCorrect: () => ConfirmCorrectAction;

  /**
   * 次の問題を取得してOpenNextQuestionActionを返す
   *
   * @returns {OpenNextQuestionAction}
   * @throws {Error} 次の問題がない場合
   */
  openNextQuestionAction: (currentQuestionId: QuestionId) => OpenNextQuestionAction;

  /**
   * 問題を初期状態に戻してResetQuestionActionを返す
   *
   * @returns {ResetQuestionAction}
   */
  resetQuestion: () => ResetQuestionAction;

  /**
   * 問題を終了して結果を見る
   *
   * @returns {FinishQuestionAction}
   */
  finishQuestion: () => FinishQuestionAction;
};

export type State = Readonly<{
  state: 'waiting' | 'ready' | 'playing' | 'confirm' | 'finished';
  totalCount: number;
  currentPosition: number;
  currentQuestion?: {
    questionId: QuestionId;
    content?: {
      yomiFuda: YomiFuda;
      toriFudaList: [ToriFuda, ToriFuda, ToriFuda, ToriFuda];
    };
    answer?: {
      isCorrect: boolean;
      selectedKarutaNo: KarutaNo;
      correctKaruta: Karuta;
    };
  };
  result?: {
    correctCount: number;
    averageAnswerSecond: number;
    answerList: Array<{
      questionId: QuestionId;
      isCorrect: boolean;
      correctKaruta: Karuta;
    }>;
  };
  trainingCondition: {
    rangeFrom: RangeFromCondition;
    rangeTo: RangeToCondition;
    kimariji: KimarijiCondition;
    color: ColorCondition;
    kamiNoKuStyle: KarutaStyleCondition;
    shimoNoKuStyle: KarutaStyleCondition;
    questionAnim: QuestionAnimCondition;
  };
}>;
