import { Action, Dispatch } from 'redux';
import { GlobalState } from '@src/state';
import { Answer, Karuta, Question } from '@src/types';
import { randomizeArray } from '@src/utils';
import { fetchTorifudas, questionsFilter, toDulation } from '@src/utils/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

export const START_TRAINING_NAME = 'START_TRAINING_NAME';
export type START_TRAINING_TYPE = typeof START_TRAINING_NAME;

export const START_EXAM_NAME = 'START_EXAM_NAME';
export type START_EXAM_TYPE = typeof START_EXAM_NAME;

export const RESTART_QUESTIONS_NAME = 'RESTART_QUESTIONS_NAME';
export type RESTART_QUESTIONS_TYPE = typeof RESTART_QUESTIONS_NAME;

export const ANSWER_QUESTION_NAME = 'ANSWER_QUESTION_NAME';
export type ANSWER_QUESTION_TYPE = typeof ANSWER_QUESTION_NAME;

export const CONFIRM_CORRECT_NAME = 'CONFIRM_CORRECT_NAME';
export type CONFIRM_CORRECT_TYPE = typeof CONFIRM_CORRECT_NAME;

export const OPEN_NEXT_QUESTION_NAME = 'OPEN_NEXT_QUESTION_NAME';
export type OPEN_NEXT_QUESTION_TYPE = typeof OPEN_NEXT_QUESTION_NAME;

export const FINISH_QUESTIONS_NAME = 'FINISH_QUESTIONS_NAME';
export type FINISH_QUESTIONS_TYPE = typeof FINISH_QUESTIONS_NAME;

export interface StartTrainingAction extends Action {
  readonly type: START_TRAINING_TYPE;
  readonly payload: {
    readonly karutas: Karuta[];
    readonly questions: Question[];
    readonly startedTime: number;
    readonly nextState: QuestionState;
    readonly dulation: number;
  };
  readonly meta: {
    readonly rangeFrom: RangeFromCondition;
    readonly rangeTo: RangeToCondition;
    readonly kimariji: KimarijiCondition;
    readonly color: ColorCondition;
    readonly kamiNoKuStyle: KarutaStyleCondition;
    readonly shimoNoKuStyle: KarutaStyleCondition;
    readonly questionAnim: QuestionAnimCondition;
  };
}

export interface StartExamAction extends Action {
  readonly type: START_EXAM_TYPE;
  readonly payload: {
    readonly karutas: Karuta[];
    readonly questions: Question[];
    readonly startedTime: number;
    readonly nextState: QuestionState;
  };
}

export interface RestartQuestionsAction extends Action {
  readonly type: RESTART_QUESTIONS_TYPE;
  readonly payload: {
    readonly questions: Question[];
    readonly startedTime: number;
    readonly nextState: QuestionState;
  };
}

export interface AnswerQuestionAction extends Action {
  readonly type: ANSWER_QUESTION_TYPE;
  readonly payload: {
    readonly answer: Answer;
    readonly nextState: QuestionState;
  };
}

export interface ConfirmCorrectAction extends Action {
  readonly type: CONFIRM_CORRECT_TYPE;
  readonly payload: {
    readonly nextState: QuestionState;
  };
}

export interface OpenNextQuestionAction extends Action {
  readonly type: OPEN_NEXT_QUESTION_TYPE;
  readonly payload: {
    readonly nextIndex: number;
    readonly nextState: QuestionState;
    readonly startedTime: number;
  };
}

export interface FinishQuestionsAction extends Action {
  readonly type: FINISH_QUESTIONS_TYPE;
  readonly payload: {
    readonly nextState: QuestionState;
  };
}

export type QuestionsActions =
  | StartTrainingAction
  | StartExamAction
  | RestartQuestionsAction
  | AnswerQuestionAction
  | ConfirmCorrectAction
  | OpenNextQuestionAction
  | FinishQuestionsAction;

/*
 * action creators
 */
export const startTraining = (
  karutas: Karuta[],
  rangeFrom: RangeFromCondition,
  rangeTo: RangeToCondition,
  kimariji: KimarijiCondition,
  color: ColorCondition,
  kamiNoKuStyle: KarutaStyleCondition,
  shimoNoKuStyle: KarutaStyleCondition,
  questionAnim: QuestionAnimCondition
) => (dispatch: Dispatch<QuestionsActions>) => {
  const questions = new QuestionsFactory(karutas)
    .setRange(rangeFrom, rangeTo)
    .setKimariji(kimariji)
    .setColor(color)
    .setKamiNoKuStyle(kamiNoKuStyle)
    .setShimoNoKuStyle(shimoNoKuStyle)
    .create();

  const action: StartTrainingAction = {
    meta: {
      color,
      kamiNoKuStyle,
      kimariji,
      rangeFrom,
      rangeTo,
      shimoNoKuStyle,
      questionAnim,
    },
    payload: {
      karutas,
      nextState: QuestionState.InAnswer,
      questions: randomizeArray<Question>(questions),
      startedTime: new Date().getTime(),
      dulation: toDulation(questionAnim),
    },
    type: START_TRAINING_NAME,
  };

  dispatch(action);
};

export const startExam = (karutas: Karuta[]) => (dispatch: Dispatch<QuestionsActions>) => {
  const questions = new QuestionsFactory(karutas)
    .setRange(RangeFromCondition.One, RangeToCondition.OneHundred)
    .setKimariji(KimarijiCondition.None)
    .setColor(ColorCondition.None)
    .setKamiNoKuStyle(KarutaStyleCondition.KanjiAndKana)
    .setShimoNoKuStyle(KarutaStyleCondition.KanaOnly)
    .create();

  const action: StartExamAction = {
    payload: {
      karutas,
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(questions),
      startedTime: new Date().getTime(),
    },
    type: START_EXAM_NAME,
  };

  dispatch(action);
};

export const restartQuestions = () => (dispatch: Dispatch<QuestionsActions>, getState: () => GlobalState) => {
  const { questions, answers } = getState().questions;
  // TODO: 全て回答済みでなかったらエラー
  const finder: { [questionId: number]: Question } = questions.reduce((previous, current) => {
    return { ...previous, [current.id]: current };
  }, {});
  const targets = answers
    .filter(a => !a.correct)
    .map(a => finder[a.questionId])
    .map(q => ({ ...q, toriFudas: randomizeArray(q.toriFudas) }));

  const action: RestartQuestionsAction = {
    payload: {
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(targets),
      startedTime: new Date().getTime(),
    },
    type: RESTART_QUESTIONS_NAME,
  };

  dispatch(action);
};

export const answerQuestion = (questionId: number, karutaNo: number) => (
  dispatch: Dispatch<QuestionsActions>,
  getState: () => GlobalState
) => {
  const { questions, lastStartedTime } = getState().questions;
  const question = questions.find(q => q.id === questionId)!;
  // TODO: QuestionとlastStartedTimeがundefinedの場合
  const correct = question.correctKaruta.no === karutaNo;
  const time = new Date().getTime() - lastStartedTime!;
  const answer = {
    correct,
    karutaNo,
    questionId,
    time,
  };
  const action: AnswerQuestionAction = {
    payload: {
      answer,
      nextState: QuestionState.Answered,
    },
    type: ANSWER_QUESTION_NAME,
  };

  dispatch(action);
};

export const confirmCorrect = (): ConfirmCorrectAction => {
  return {
    payload: {
      nextState: QuestionState.ConfirmCorrect,
    },
    type: CONFIRM_CORRECT_NAME,
  };
};

export const openNextQuestion = () => (dispatch: Dispatch<QuestionsActions>, getState: () => GlobalState) => {
  const { currentIndex } = getState().questions;
  const nextIndex = currentIndex + 1;
  const action: OpenNextQuestionAction = {
    payload: {
      nextIndex,
      nextState: QuestionState.InAnswer,
      startedTime: new Date().getTime(),
    },
    type: OPEN_NEXT_QUESTION_NAME,
  };
  dispatch(action);
};

export const finishQuestions = (): FinishQuestionsAction => {
  return {
    payload: {
      nextState: QuestionState.Finished,
    },
    type: FINISH_QUESTIONS_NAME,
  };
};

class QuestionsFactory {
  private karutas: Karuta[];
  private rangeFrom: number;
  private rangeTo: number;
  private kimariji: number;
  private color: string;
  private kamiNoKuStyle: number;
  private shimoNoKuStyle: number;

  constructor(karutas: Karuta[]) {
    this.karutas = karutas;
    this.rangeFrom = RangeFromCondition.One;
    this.rangeTo = RangeToCondition.OneHundred;
    this.kimariji = KimarijiCondition.None;
    this.color = ColorCondition.None;
    this.kamiNoKuStyle = KarutaStyleCondition.KanjiAndKana;
    this.shimoNoKuStyle = KarutaStyleCondition.KanaOnly;
  }

  public setRange(rangeFrom: number, rangeTo: number) {
    this.rangeFrom = rangeFrom;
    this.rangeTo = rangeTo;
    return this;
  }

  public setKimariji(kimariji: number) {
    this.kimariji = kimariji;
    return this;
  }

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setKamiNoKuStyle(kamiNoKuStyle: number) {
    this.kamiNoKuStyle = kamiNoKuStyle;
    return this;
  }

  public setShimoNoKuStyle(shimoNoKuStyle: number) {
    this.shimoNoKuStyle = shimoNoKuStyle;
    return this;
  }

  public create() {
    const targetKarutas = questionsFilter(this.karutas)(this.rangeFrom, this.rangeTo)(this.kimariji)(this.color);

    return targetKarutas.map((k, i) => {
      const id = i + 1;
      const correctKaruta = k;
      const yomiFuda =
        this.kamiNoKuStyle === 0
          ? {
              firstText: k.firstKanji,
              karutaNo: k.no,
              questionId: id,
              secondText: k.secondKanji,
              thirdText: k.thirdKanji,
            }
          : {
              firstText: k.firstKana,
              karutaNo: k.no,
              questionId: id,
              secondText: k.secondKana,
              thirdText: k.thirdKana,
            };
      const toriFudas = fetchTorifudas(this.karutas, correctKaruta).map(toriFuda => {
        return this.shimoNoKuStyle === 0
          ? {
              fifthText: toriFuda.fifthKanji,
              fourthText: toriFuda.fourthKanji,
              karutaNo: toriFuda.no,
              questionId: id,
            }
          : {
              fifthText: toriFuda.fifthKana,
              fourthText: toriFuda.fourthKana,
              karutaNo: toriFuda.no,
              questionId: id,
            };
      });
      return { id, correctKaruta, yomiFuda, toriFudas };
    });
  }
}
