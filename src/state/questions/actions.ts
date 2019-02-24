import { Answer, Karuta, Question } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { randomizeArray } from '@src/utils';
import { fetchTorifudas, questionsFilter, toDulation } from '@src/utils/questions';
import * as types from './types';
import * as constants from './constants';

export const startTraining = (
  karutas: Karuta[],
  rangeFrom: RangeFromCondition,
  rangeTo: RangeToCondition,
  kimariji: KimarijiCondition,
  color: ColorCondition,
  kamiNoKuStyle: KarutaStyleCondition,
  shimoNoKuStyle: KarutaStyleCondition,
  questionAnim: QuestionAnimCondition
): types.StartTrainingAction => {
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
    type: constants.START_TRAINING_NAME,
  };
};

export const startExam = (karutas: Karuta[]): types.StartExamAction => {
  const questions = new QuestionsFactory(karutas)
    .setRange(RangeFromCondition.One, RangeToCondition.OneHundred)
    .setKimariji(KimarijiCondition.None)
    .setColor(ColorCondition.None)
    .setKamiNoKuStyle(KarutaStyleCondition.KanjiAndKana)
    .setShimoNoKuStyle(KarutaStyleCondition.KanaOnly)
    .create();

  return {
    payload: {
      karutas,
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(questions),
      startedTime: new Date().getTime(),
    },
    type: constants.START_EXAM_NAME,
  };
};

export const restartQuestions = (questions: Question[], answers: Answer[]): types.RestartQuestionsAction => {
  // TODO: 全て回答済みでなかったらエラー
  const finder: { [questionId: number]: Question } = questions.reduce((previous, current) => {
    return { ...previous, [current.id]: current };
  }, {});
  const targets = answers
    .filter(a => !a.correct)
    .map(a => finder[a.questionId])
    .map(q => ({ ...q, toriFudas: randomizeArray(q.toriFudas) }));

  return {
    payload: {
      nextState: QuestionState.InAnswer,
      questions: randomizeArray(targets),
      startedTime: new Date().getTime(),
    },
    type: constants.RESTART_QUESTIONS_NAME,
  };
};

export const answerQuestion = (
  questionId: number,
  karutaNo: number,
  questions: Question[],
  lastStartedTime?: number
): types.AnswerQuestionAction => {
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

  return {
    payload: {
      answer,
      nextState: QuestionState.Answered,
    },
    type: constants.ANSWER_QUESTION_NAME,
  };
};

export const confirmCorrect = (questions: Question[], answers: Answer[]): types.ConfirmCorrectAction => ({
  payload: {
    nextState: questions.length === answers.length ? QuestionState.Finished : QuestionState.ConfirmCorrect,
  },
  type: constants.CONFIRM_CORRECT_NAME,
});

export const openNextQuestion = (currentIndex: number): types.OpenNextQuestionAction => ({
  payload: {
    nextIndex: currentIndex + 1,
    nextState: QuestionState.InAnswer,
    startedTime: new Date().getTime(),
  },
  type: constants.OPEN_NEXT_QUESTION_NAME,
});

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
