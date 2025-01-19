import { createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Karuta,
  KarutaNo,
  Question,
  QuestionId,
  ToriFuda,
  TrainingCondition,
  TrainingConditionDisplayStyle,
  YomiFuda,
} from '@/domains/models';

import { createAppSlice } from 'lib/createAppSlice';
import { COLOR_LIST } from '@/domains/models/Color';
import { KIMARIJI_LIST } from '@/domains/models/Kimariji';
import { CreateQuestionListService } from '@/domains/services';
import { karutaRepository } from '@/domains/repositories';

export interface QuestionSliceState {
  state: 'waiting' | 'ready' | 'playing' | 'confirm' | 'finished';
  questionData?: {
    byId: { [id: QuestionId]: Question };
    allIdList: ReadonlyArray<QuestionId>;
  };
  currentPosition: number;
  currentQuestion?: {
    questionId: QuestionId;
    content?: {
      yomiFuda: YomiFuda;
      toriFudaList: [ToriFuda, ToriFuda, ToriFuda, ToriFuda];
      startTime: number; // 回答を開始した時間(millisec)
    };
    answer?: {
      isCorrect: boolean;
      selectedKarutaNo: KarutaNo;
      correctKaruta: Karuta;
    };
  };
  trainingCondition: TrainingCondition;
}

const initialState: QuestionSliceState = {
  state: 'waiting',
  currentPosition: 0,
  trainingCondition: {
    rangeFrom: 1,
    rangeTo: 100,
    kimariji: null,
    color: null,
    kamiNoKuStyle: 'kanji',
    shimoNoKuStyle: 'kana',
    questionAnim: 'normal',
  },
};

export const questionSlice = createAppSlice({
  name: 'question',
  initialState,
  reducers: (create) => ({
    startTraining: create.reducer((state, action: PayloadAction<{ condition: TrainingCondition }>) => {
      const condition = action.payload.condition;
      state.trainingCondition = condition;
      state.trainingCondition.emptyError = undefined;

      const range = { from: condition.rangeFrom as KarutaNo, to: condition.rangeTo as KarutaNo };
      const kimarijiList = condition.kimariji === null ? KIMARIJI_LIST : [condition.kimariji];
      const colorList = condition.color === null ? COLOR_LIST : [condition.color];
      const targetKarutaList = karutaRepository.where({
        range,
        kimarijiList,
        colorList,
      });

      if (targetKarutaList.length === 0) {
        state.trainingCondition.emptyError = '指定した条件の歌がありませんでした';
        return;
      }

      const createQuestionListService = new CreateQuestionListService(karutaRepository);
      const questionList = createQuestionListService.execute(targetKarutaList);

      const allIdList = questionList.map((q) => q.id);
      state.questionData = {
        allIdList,
        byId: questionList.reduce((prev, current) => ({ ...prev, [current.id]: current }), {}),
      };
      state.currentPosition = 1;
      state.currentQuestion = {
        questionId: allIdList[0],
      };
      state.state = 'ready';
    }),
    startExam: create.reducer((state) => {
      const allKarutaList = karutaRepository.all();
      const createQuestionListService = new CreateQuestionListService(karutaRepository);
      const questionList = createQuestionListService.execute(allKarutaList);

      const allIdList = questionList.map((q) => q.id);
      state.questionData = {
        allIdList,
        byId: questionList.reduce((prev, current) => ({ ...prev, [current.id]: current }), {}),
      };
      state.currentPosition = 1;
      state.currentQuestion = {
        questionId: allIdList[0],
      };
      state.state = 'ready';
    }),
    startQuestion: create.reducer(
      (
        state,
        action: PayloadAction<{
          questionId: QuestionId;
          kamiNoKuStyle: TrainingConditionDisplayStyle;
          shimoNoKuStyle: TrainingConditionDisplayStyle;
          startTime: number;
        }>
      ) => {
        if (
          !state.questionData ||
          !state.currentQuestion ||
          action.payload.questionId !== state.currentQuestion.questionId
        ) {
          return;
        }

        const question = state.questionData.byId[action.payload.questionId];

        const choiceKarutaList = karutaRepository.findByNoList({ karataNoList: question.choiceKarutaNoList });
        const correctKaruta = choiceKarutaList.find((karuta) => karuta.no === question.correctAnswerKarutaNo)!;

        const yomiFuda: YomiFuda = {
          karutaNo: correctKaruta.no,
          shoku: correctKaruta.shoku[action.payload.kamiNoKuStyle],
          niku: correctKaruta.niku[action.payload.kamiNoKuStyle],
          sanku: correctKaruta.sanku[action.payload.kamiNoKuStyle],
        };

        const toriFudaList = choiceKarutaList.map((karuta) => ({
          karutaNo: karuta.no,
          shiku: karuta.shiku[action.payload.shimoNoKuStyle],
          kekku: karuta.kekku[action.payload.shimoNoKuStyle],
        })) as [ToriFuda, ToriFuda, ToriFuda, ToriFuda];

        state.currentQuestion.content = {
          startTime: action.payload.startTime,
          yomiFuda,
          toriFudaList,
        };
        state.state = 'playing';
      }
    ),
    answerQuestion: create.reducer(
      (
        state,
        action: PayloadAction<{
          questionId: QuestionId;
          toriFuda: ToriFuda;
          answerTime: number;
        }>
      ) => {
        if (
          !state.questionData ||
          !state.currentQuestion ||
          !state.currentQuestion.content ||
          state.state !== 'playing' ||
          action.payload.questionId !== state.currentQuestion.questionId
        ) {
          return;
        }

        const question = state.questionData.byId[action.payload.questionId];

        const isCorrect = question.correctAnswerKarutaNo === action.payload.toriFuda.karutaNo;

        const answerMilliSec = action.payload.answerTime - state.currentQuestion.content.startTime;

        question.answer = {
          isCorrect,
          answerMilliSec,
        };

        state.currentQuestion.answer = {
          isCorrect,
          selectedKarutaNo: action.payload.toriFuda.karutaNo,
          correctKaruta: karutaRepository.findByNo({ karutaNo: question.correctAnswerKarutaNo }),
        };
      }
    ),
    confirmCorrect: create.reducer((state) => {
      state.state = 'confirm';
    }),
    openNextQuestion: create.reducer((state) => {
      if (!state.questionData || !state.currentQuestion || state.state !== 'confirm') {
        return;
      }
      state.currentPosition += 1;
      state.currentQuestion = {
        questionId: state.questionData.allIdList[state.currentPosition - 1],
      };
      state.state = 'ready';
    }),
    finishQuestion: create.reducer((state) => {
      state.state = 'finished';
    }),
    restartTraining: create.reducer((state) => {
      if (!state.questionData || state.state !== 'finished') {
        return;
      }
      const incorrectKarutaList: Array<Karuta> = [];
      state.questionData.allIdList.forEach((questionId) => {
        const question = state.questionData!.byId[questionId];
        if (!question.answer?.isCorrect) {
          incorrectKarutaList.push(karutaRepository.findByNo({ karutaNo: question.correctAnswerKarutaNo }));
        }
      });

      const createQuestionListService = new CreateQuestionListService(karutaRepository);
      const questionList = createQuestionListService.execute(incorrectKarutaList);

      const allIdList = questionList.map((q) => q.id);
      state.questionData = {
        allIdList,
        byId: questionList.reduce((prev, current) => ({ ...prev, [current.id]: current }), {}),
      };
      state.currentPosition = 1;
      state.currentQuestion = {
        questionId: allIdList[0],
      };
      state.state = 'ready';
    }),
  }),
  selectors: {
    selectCondition: (state) => state.trainingCondition,
    selectQuestionState: createSelector(
      [
        (state: QuestionSliceState) => state.state,
        (state: QuestionSliceState) => state.currentQuestion,
        (state: QuestionSliceState) => (state.questionData ? state.questionData.allIdList.length : 0),
        (state: QuestionSliceState) => state.currentPosition,
      ],
      (state, currentQuestion, totalCount, currentPosition) => ({
        state,
        currentQuestion,
        totalCount,
        currentPosition,
      })
    ),
    selectQuestionResult: createSelector(
      [(state: QuestionSliceState) => state.state, (state: QuestionSliceState) => state.questionData],
      (state, questionData) => {
        if (!questionData) {
          return { state };
        }

        let correctCount = 0;
        let totalAnswerMilliSec = 0;
        const answerList: Array<{ correctKaruta: Karuta; isCorrect: boolean }> = [];
        questionData.allIdList.forEach((questionId) => {
          const question = questionData.byId[questionId];
          if (!question.answer) {
            return;
          }
          if (question.answer.isCorrect) {
            correctCount += 1;
          }
          totalAnswerMilliSec += question.answer.answerMilliSec;
          answerList.push({
            correctKaruta: karutaRepository.findByNo({ karutaNo: question.correctAnswerKarutaNo }),
            isCorrect: question.answer.isCorrect,
          });
        });

        answerList.sort((a, b) => (a.correctKaruta.no < b.correctKaruta.no ? -1 : 1));

        const averageAnswerSecond = totalAnswerMilliSec / 1000 / questionData.allIdList.length;

        return {
          state,
          result: {
            correctCount,
            totalCount: questionData.allIdList.length,
            answerList,
            averageAnswerSecond: Math.round(averageAnswerSecond * 100) / 100,
          },
        };
      }
    ),
  },
});

export const {
  startTraining,
  startExam,
  startQuestion,
  answerQuestion,
  confirmCorrect,
  openNextQuestion,
  finishQuestion,
  restartTraining,
} = questionSlice.actions;

export const { selectCondition, selectQuestionState, selectQuestionResult } = questionSlice.selectors;
