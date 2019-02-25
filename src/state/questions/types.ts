import { Action } from 'redux';
import { Answer, Karuta, Question } from '@src/types';
import * as constants from './constants';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

export type START_TRAINING_TYPE = typeof constants.START_TRAINING_NAME;

export type START_EXAM_TYPE = typeof constants.START_EXAM_NAME;

export type RESTART_QUESTIONS_TYPE = typeof constants.RESTART_QUESTIONS_NAME;

export type ANSWER_QUESTION_TYPE = typeof constants.ANSWER_QUESTION_NAME;

export type CONFIRM_CORRECT_TYPE = typeof constants.CONFIRM_CORRECT_NAME;

export type OPEN_NEXT_QUESTION_TYPE = typeof constants.OPEN_NEXT_QUESTION_NAME;

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

export type Actions =
  | StartTrainingAction
  | StartExamAction
  | RestartQuestionsAction
  | AnswerQuestionAction
  | ConfirmCorrectAction
  | OpenNextQuestionAction;

export interface State {
  readonly karutas: Karuta[];
  readonly currentIndex: number;
  readonly questions?: Question[];
  readonly dulation: number;
  readonly answers?: Answer[];
  readonly lastStartedTime?: number;
  readonly trainingCondition: {
    readonly rangeFrom: RangeFromCondition;
    readonly rangeTo: RangeToCondition;
    readonly kimariji: KimarijiCondition;
    readonly color: ColorCondition;
    readonly kamiNoKuStyle: KarutaStyleCondition;
    readonly shimoNoKuStyle: KarutaStyleCondition;
    readonly questionAnim: QuestionAnimCondition;
  };
  readonly questionState?: QuestionState;
}
