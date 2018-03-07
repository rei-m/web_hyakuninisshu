import { Action, Dispatch } from 'redux';
import { GlobalState } from '../reducers';
import { Answer, Karuta, Question } from '../types';
import { randomizeArray } from '../utils';
import { fetchTorifudas, questionsFilter } from '../utils/questions';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition
} from '../enums';

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
    readonly questions: Question[];
    readonly startedTime: number;
    readonly nextState: QuestionState;
  };
  readonly meta: {
    readonly rangeFrom: RangeFromCondition;
    readonly rangeTo: RangeToCondition;
    readonly kimariji: KimarijiCondition;
    readonly color: ColorCondition;
    readonly kamiNoKuStyle: KarutaStyleCondition;
    readonly shimoNoKuStyle: KarutaStyleCondition;
  };
}

export interface StartExamAction extends Action {
  readonly type: START_EXAM_TYPE;
  readonly payload: {
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
  rangeFrom: RangeFromCondition,
  rangeTo: RangeToCondition,
  kimariji: KimarijiCondition,
  color: ColorCondition,
  kamiNoKuStyle: KarutaStyleCondition,
  shimoNoKuStyle: KarutaStyleCondition
) => (dispatch: Dispatch<GlobalState>, getState: () => GlobalState) => {
  const { karutas } = getState().karutasState;

  const questions = new QuestionsFactory(karutas)
    .setRange(rangeFrom, rangeTo)
    .setKimariji(kimariji)
    .setColor(color)
    .setKamiNoKuStyle(kamiNoKuStyle)
    .setShimoNoKuStyle(shimoNoKuStyle)
    .create();

  const action = {
    meta: {
      color,
      kamiNoKuStyle,
      kimariji,
      rangeFrom,
      rangeTo,
      shimoNoKuStyle
    },
    payload: {
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_TRAINING_NAME
  };

  dispatch(action);
};

export const startExam = () => (
  dispatch: Dispatch<GlobalState>,
  getState: () => GlobalState
) => {
  const { karutas } = getState().karutasState;
  const questions = new QuestionsFactory(karutas)
    .setRange(1, 100)
    .setKimariji(0)
    .setColor('')
    .setKamiNoKuStyle(0)
    .setShimoNoKuStyle(1)
    .create();

  const action = {
    payload: {
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_EXAM_NAME
  };

  dispatch(action);
};

export const restartQuestions = () => (
  dispatch: Dispatch<GlobalState>,
  getState: () => GlobalState
) => {
  const { questions, answers } = getState().questionsState;
  // TODO: 全て回答済みでなかったらエラー
  const finder: { [questionId: number]: Question } = questions.reduce(
    (previous, current) => {
      return { ...previous, [current.id]: current };
    },
    {}
  );
  const targets = answers
    .filter(a => !a.correct)
    .map(a => finder[a.questionId])
    .map(q => ({ ...q, toriFudas: randomizeArray(q.toriFudas) }));

  const action = {
    payload: {
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(targets),
      startedTime: new Date().getTime()
    },
    type: RESTART_QUESTIONS_NAME
  };

  dispatch(action);
};

export const answerQuestion = (questionId: number, karutaId: number) => (
  dispatch: Dispatch<GlobalState>,
  getState: () => GlobalState
) => {
  const { questions, lastStartedTime } = getState().questionsState;
  const question = questions.find(q => q.id === questionId)!;
  // TODO: QuestionとlastStartedTimeがundefinedの場合
  const correct = question.correctKaruta.id === karutaId;
  const time = new Date().getTime() - lastStartedTime!;
  const answer = {
    correct,
    karutaId,
    questionId,
    time
  };
  const action = {
    payload: {
      answer,
      nextState: QuestionState.Answered
    },
    type: ANSWER_QUESTION_NAME
  };

  dispatch(action);
};

export const confirmCorrect = (): ConfirmCorrectAction => {
  return {
    payload: {
      nextState: QuestionState.ConfirmCorrect
    },
    type: CONFIRM_CORRECT_NAME
  };
};

export const openNextQuestion = () => (
  dispatch: Dispatch<GlobalState>,
  getState: () => GlobalState
) => {
  const { currentIndex } = getState().questionsState;
  const nextIndex = currentIndex + 1;
  const action = {
    payload: {
      nextIndex,
      nextState: QuestionState.InAnswer,
      startedTime: new Date().getTime()
    },
    type: OPEN_NEXT_QUESTION_NAME
  };
  dispatch(action);
};

export const finishQuestions = (): FinishQuestionsAction => {
  return {
    payload: {
      nextState: QuestionState.Finished
    },
    type: FINISH_QUESTIONS_NAME
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
    this.rangeFrom = 1;
    this.rangeTo = 100;
    this.kimariji = 0;
    this.color = '';
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
    const targetKarutas = questionsFilter(this.karutas)(
      this.rangeFrom,
      this.rangeTo
    )(this.kimariji)(this.color);

    return targetKarutas.map((k, i) => {
      const id = i + 1;
      const correctKaruta = k;
      const yomiFuda =
        this.kamiNoKuStyle === 0
          ? {
              firstText: k.firstKanji,
              karutaId: k.id,
              questionId: id,
              secondText: k.secondKanji,
              thirdText: k.thirdKanji
            }
          : {
              firstText: k.firstKana,
              karutaId: k.id,
              questionId: id,
              secondText: k.secondKana,
              thirdText: k.thirdKana
            };
      const toriFudas = fetchTorifudas(this.karutas, correctKaruta).map(
        toriFuda => {
          return this.shimoNoKuStyle === 0
            ? {
                fifthText: toriFuda.fifthKanji,
                fourthText: toriFuda.fourthKanji,
                karutaId: toriFuda.id,
                questionId: id
              }
            : {
                fifthText: toriFuda.fifthKana,
                fourthText: toriFuda.fourthKana,
                karutaId: toriFuda.id,
                questionId: id
              };
        }
      );
      return { id, correctKaruta, yomiFuda, toriFudas };
    });
  }
}
