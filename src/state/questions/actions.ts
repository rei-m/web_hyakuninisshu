import * as types from './types';
import * as constants from './constants';
import { QuestionListService } from '@src/domain/services';
import { Kimariji, Color, QuestionId, Question, KarutaCollection, Karuta, KarutaNo } from '@src/domain/models';
import { KarutaRepository, QuestionRepository } from '@src/domain/repositories';
import { IllegalStateError } from '@src/domain/errors';

export class ActionCreatorImpl implements types.ActionCreator {
  constructor(
    private _karutaRepository: KarutaRepository,
    private _questionRepository: QuestionRepository,
    private _questionListService: QuestionListService
  ) {}

  startTraining(
    rangeFrom: types.RangeFromCondition,
    rangeTo: types.RangeToCondition,
    kimariji: types.KimarijiCondition,
    color: types.ColorCondition,
    kamiNoKuStyle: types.KarutaStyleCondition,
    shimoNoKuStyle: types.KarutaStyleCondition,
    questionAnim: types.QuestionAnimCondition
  ): types.StartTrainingAction {
    const range = { from: rangeFrom, to: rangeTo };
    const kimarijiList = kimariji === null ? Kimariji.values : [kimariji];
    const colorList = color === null ? Color.values : [color];

    const allKarutaList = this._karutaRepository.findAll();
    const targetKarutaList = KarutaCollection.select(allKarutaList, {
      range,
      kimarijiList,
      colorList,
    });

    const questionList = this._questionListService.initialize(targetKarutaList);

    return {
      type: constants.START_TRAINING_NAME,
      payload: {
        currentQuestionId: questionList[0].id,
        totalCount: questionList.length,
      },
      meta: {
        rangeFrom,
        rangeTo,
        kimariji,
        color,
        kamiNoKuStyle,
        shimoNoKuStyle,
        questionAnim,
      },
    };
  }

  restartTraining(): types.RestartTrainingAction {
    const allQuestionList = this._questionRepository.findAll();
    const wrongKarutaNoList = allQuestionList
      .filter(q => q.answer?.isCorrect === false)
      .map(q => q.correctAnswerKarutaNo);
    const targetKarutaList = this._karutaRepository.findByNoList(wrongKarutaNoList);

    const questionList = this._questionListService.initialize(targetKarutaList);

    return {
      type: constants.RESTART_TRAINING_NAME,
      payload: {
        currentQuestionId: questionList[0].id,
        totalCount: questionList.length,
      },
    };
  }

  startExam(): types.StartExamAction {
    const targetKarutaList = this._karutaRepository.findAll();
    const questionList = this._questionListService.initialize(targetKarutaList);

    return {
      type: constants.START_EXAM_NAME,
      payload: {
        currentQuestionId: questionList[0].id,
        totalCount: questionList.length,
      },
    };
  }

  startQuestion(
    currentQuestionId: QuestionId,
    kamiNoKuStyle: types.KarutaStyleCondition,
    shimoNoKuStyle: types.KarutaStyleCondition,
    startDate: Date
  ): types.StartQuestionAction {
    const question = this._questionRepository.findById(currentQuestionId);
    const started = Question.start(question, startDate);
    this._questionRepository.update(started);

    const choiceKarutaList = this._karutaRepository.findByNoList(question.choiceKarutaNoList);
    const correctKaruta = choiceKarutaList.find(karuta => karuta.no === question.correctAnswerKarutaNo)!;

    const yomiFuda: types.YomiFuda = {
      karutaNo: correctKaruta.no,
      shoku: correctKaruta.shoku[kamiNoKuStyle],
      niku: correctKaruta.niku[kamiNoKuStyle],
      sanku: correctKaruta.sanku[kamiNoKuStyle],
    };

    const toriFudaList = choiceKarutaList.map(karuta => ({
      karutaNo: karuta.no,
      shiku: karuta.shiku[shimoNoKuStyle],
      kekku: karuta.kekku[shimoNoKuStyle],
    })) as [types.ToriFuda, types.ToriFuda, types.ToriFuda, types.ToriFuda];

    return {
      type: constants.START_QUESTION_NAME,
      payload: {
        questionId: currentQuestionId,
        content: {
          yomiFuda,
          toriFudaList,
        },
      },
    };
  }

  answerQuestion(
    currentQuestionId: QuestionId,
    toriFuda: types.ToriFuda,
    answerDate: Date
  ): types.AnswerQuestionAction {
    const question = this._questionRepository.findById(currentQuestionId);
    const answered = Question.answer(question, toriFuda.karutaNo, answerDate);
    this._questionRepository.update(answered);

    const correctKaruta = this._karutaRepository.findByNo(answered.correctAnswerKarutaNo);

    return {
      type: constants.ANSWER_QUESTION_NAME,
      payload: {
        isCorrect: answered.answer!.isCorrect,
        selectedKarutaNo: toriFuda.karutaNo,
        correctKaruta,
      },
    };
  }

  confirmCorrect(): types.ConfirmCorrectAction {
    return {
      type: constants.CONFIRM_CORRECT_NAME,
    };
  }

  openNextQuestionAction(currentQuestionId: QuestionId): types.OpenNextQuestionAction {
    const next = this._questionRepository.findNextById(currentQuestionId);
    return {
      type: constants.OPEN_NEXT_QUESTION_NAME,
      payload: {
        currentQuestionId: next.id,
      },
    };
  }

  resetQuestion(): types.ResetQuestionAction {
    return {
      type: constants.RESET_QUESTION_NAME,
    };
  }

  finishQuestion(): types.FinishQuestionAction {
    const questionList = this._questionRepository.findAll();
    const allKarutaList = this._karutaRepository.findAll();

    const totalCount = questionList.length;

    let correctCount = 0;
    let totalAnswerTime = 0;
    const answerList: Array<{
      questionId: QuestionId;
      isCorrect: boolean;
      correctKaruta: Karuta;
    }> = [];

    const finder: Map<KarutaNo, Karuta> = new Map();
    allKarutaList.forEach(karuta => {
      finder.set(karuta.no, karuta);
    });

    questionList.forEach(question => {
      const answer = question.answer;
      if (!answer) {
        throw new IllegalStateError(`not answered`);
      }
      correctCount += answer.isCorrect ? 1 : 0;
      totalAnswerTime += answer.answerTime;
      answerList.push({
        questionId: question.id,
        isCorrect: answer.isCorrect,
        correctKaruta: finder.get(question.correctAnswerKarutaNo)!,
      });
    });

    const averageAnswerSecond = totalAnswerTime / 1000 / totalCount;
    return {
      type: constants.FINISH_QUESTION_NAME,
      payload: {
        correctCount,
        averageAnswerSecond: Math.round(averageAnswerSecond * 100) / 100,
        answerList,
      },
    };
  }
}
