import { Action } from 'redux';
import { getStore } from '../store';
import { Answer, Karuta, Question } from '../types';
import { randomizeArray } from '../utils';
import { fetchTorifudas, questionsFilter } from '../utils/questions';

export const START_TRAINING_NAME = 'START_TRAINING_NAME';
export type START_TRAINING_TYPE = typeof START_TRAINING_NAME;

export const START_EXAM_NAME = 'START_EXAM_NAME';
export type START_EXAM_TYPE = typeof START_EXAM_NAME;

export const RESTART_NAME = 'RESTART_NAME';
export type RESTART_TYPE = typeof RESTART_NAME;

export const ANSWER_QUESTION_NAME = 'ANSWER_QUESTION_NAME';
export type ANSWER_QUESTION_TYPE = typeof ANSWER_QUESTION_NAME;

export const GO_TO_CORRECT_NAME = 'GO_TO_CORRECT_NAME';
export type GO_TO_CORRECT_TYPE = typeof GO_TO_CORRECT_NAME;

export const GO_TO_NEXT_QUESTION_NAME = 'GO_TO_NEXT_QUESTION_NAME';
export type GO_TO_NEXT_QUESTION_TYPE = typeof GO_TO_NEXT_QUESTION_NAME;

export interface StartTrainingAction extends Action {
  readonly type: START_TRAINING_TYPE;
  readonly payload: {
    readonly questions: Question[];
    readonly startedTime: number;
  };
  meta: {
    readonly rangeFrom: number;
    readonly rangeTo: number;
    readonly kimariji: number;
    readonly color: string;
    readonly kamiNoKuStyle: number;
    readonly shimoNoKuStyle: number;
  };
}

export interface StartExamAction extends Action {
  readonly type: START_EXAM_TYPE;
  readonly payload: {
    readonly questions: Question[];
    readonly startedTime: number;
  };
}

export interface StartExamAction extends Action {
  readonly type: START_EXAM_TYPE;
  readonly payload: {
    readonly questions: Question[];
    readonly startedTime: number;
  };
}

export interface RestartAction extends Action {
  readonly type: RESTART_TYPE;
  readonly payload: {
    readonly questions: Question[];
    readonly startedTime: number;
  };
}

export interface AnswerQuestionAction extends Action {
  readonly type: ANSWER_QUESTION_TYPE;
  readonly payload: {
    readonly answer: Answer;
  };
}

export interface GoToCorrectAction extends Action {
  readonly type: GO_TO_CORRECT_TYPE;
  readonly payload: {
    readonly nextPage: number;
  };
}

export interface GoToNextQuestionAction extends Action {
  readonly type: GO_TO_NEXT_QUESTION_TYPE;
  readonly payload: {
    readonly nextIndex: number;
    readonly nextPage: number;
    readonly startedTime: number;
  };
}

export type QuestionsActions =
  | StartTrainingAction
  | StartExamAction
  | RestartAction
  | AnswerQuestionAction
  | GoToCorrectAction
  | GoToNextQuestionAction;

/*
 * action creators
 */
export const startTraining = (
  rangeFrom: number,
  rangeTo: number,
  kimariji: number,
  color: string,
  kamiNoKuStyle: number,
  shimoNoKuStyle: number
): StartTrainingAction => {
  const { karutas } = getStore().getState().karutasState;

  const questions = new QuestionsFactory(karutas)
    .setRange(rangeFrom, rangeTo)
    .setKimariji(kimariji)
    .setColor(color)
    .setKamiNoKuStyle(kamiNoKuStyle)
    .setShimoNoKuStyle(shimoNoKuStyle)
    .create();

  return {
    meta: {
      color,
      kamiNoKuStyle,
      kimariji,
      rangeFrom,
      rangeTo,
      shimoNoKuStyle
    },
    payload: {
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_TRAINING_NAME
  };
};

export const startExam = (): StartExamAction => {
  const { karutas } = getStore().getState().karutasState;
  const questions = new QuestionsFactory(karutas)
    .setRange(1, 100)
    .setKimariji(0)
    .setColor('')
    .setKamiNoKuStyle(0)
    .setShimoNoKuStyle(1)
    .create();

  return {
    payload: {
      questions: randomizeArray(questions),
      startedTime: new Date().getTime()
    },
    type: START_EXAM_NAME
  };
};

export const answerQuestion = (
  questionId: number,
  karutaId: number
): AnswerQuestionAction => {
  const { questions, lastStartedTime } = getStore().getState().questionsState;
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
  return {
    payload: {
      answer
    },
    type: ANSWER_QUESTION_NAME
  };
};

export const goToCorrect = (): GoToCorrectAction => {
  return {
    payload: {
      nextPage: 1
    },
    type: GO_TO_CORRECT_NAME
  };
};

export const goToNextQuestion = (): GoToNextQuestionAction => {
  const { currentIndex } = getStore().getState().questionsState;
  const nextIndex = currentIndex + 1;
  return {
    payload: {
      nextIndex,
      nextPage: 0,
      startedTime: new Date().getTime()
    },
    type: GO_TO_NEXT_QUESTION_NAME
  };
};

export const restart = (): RestartAction => {
  const { questions, answers } = getStore().getState().questionsState;
  // TODO: 全て回答済みでなかったらエラー
  const finder: { [questionId: number]: Question } = questions.reduce(
    (previous, current) => {
      return { ...previous, [current.id]: current };
    },
    {}
  );
  const targets = answers
    .filter(a => !a.correct)
    .map(a => finder[a.questionId]);
  return {
    payload: {
      questions: randomizeArray(targets),
      startedTime: new Date().getTime()
    },
    type: RESTART_NAME
  };
};

export class QuestionsFactory {
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
