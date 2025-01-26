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

import { KARUTA_LIST } from '@/assets/karuta';

export interface QuestionSliceState {
  state: 'waiting' | 'ready' | 'playing' | 'confirm' | 'finished';
  karutaData: Readonly<{
    byNo: Readonly<{ [no: KarutaNo]: Karuta }>;
    allNoList: ReadonlyArray<KarutaNo>;
  }>;
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
  karutaData: {
    byNo: KARUTA_LIST.reduce((prev, current) => ({ ...prev, [current.no]: current }), {}),
    allNoList: KARUTA_LIST.map((karuta) => karuta.no),
  },
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
      const { condition } = action.payload;
      state.trainingCondition = condition;
      state.trainingCondition.emptyError = undefined;

      const kimarijiSet = condition.kimariji === null ? new Set(KIMARIJI_LIST) : new Set([condition.kimariji]);
      const colorSet = condition.color === null ? new Set(COLOR_LIST) : new Set([condition.color]);

      const targetKarutaNoList = state.karutaData.allNoList
        .slice(condition.rangeFrom - 1, condition.rangeTo)
        .filter((karutaNo) => {
          const karuta = state.karutaData.byNo[karutaNo];
          return kimarijiSet.has(karuta.kimariji) && colorSet.has(karuta.color);
        });

      if (targetKarutaNoList.length === 0) {
        state.trainingCondition.emptyError = '指定した条件の歌がありませんでした';
        return;
      }

      const createQuestionListService = new CreateQuestionListService(state.karutaData.allNoList);
      const questionList = createQuestionListService.execute(targetKarutaNoList);

      state.questionData = {
        allIdList: questionList.map((q) => q.id),
        byId: questionList.reduce((prev, current) => ({ ...prev, [current.id]: current }), {}),
      };
      state.currentPosition = 1;
      state.currentQuestion = {
        questionId: questionList[0].id,
      };
      state.state = 'ready';
    }),
    startExam: create.reducer((state) => {
      const createQuestionListService = new CreateQuestionListService(state.karutaData.allNoList);
      const questionList = createQuestionListService.execute(state.karutaData.allNoList);

      state.questionData = {
        allIdList: questionList.map((q) => q.id),
        byId: questionList.reduce((prev, current) => ({ ...prev, [current.id]: current }), {}),
      };
      state.currentPosition = 1;
      state.currentQuestion = {
        questionId: questionList[0].id,
      };
      state.state = 'ready';
    }),
    startQuestion: create.preparedReducer(
      (args: {
        questionId: QuestionId;
        kamiNoKuStyle: TrainingConditionDisplayStyle;
        shimoNoKuStyle: TrainingConditionDisplayStyle;
        startDate: Date;
      }) => ({
        payload: {
          questionId: args.questionId,
          kamiNoKuStyle: args.kamiNoKuStyle,
          shimoNoKuStyle: args.shimoNoKuStyle,
          startTime: args.startDate.getTime(),
        },
      }),
      (state, action) => {
        if (
          !state.questionData ||
          !state.currentQuestion ||
          action.payload.questionId !== state.currentQuestion.questionId
        ) {
          return;
        }

        const question = state.questionData.byId[action.payload.questionId];
        question.startTime = action.payload.startTime;

        const correctKaruta = state.karutaData.byNo[question.correctAnswerKarutaNo];

        const yomiFuda: YomiFuda = {
          karutaNo: correctKaruta.no,
          shoku: correctKaruta.shoku[action.payload.kamiNoKuStyle],
          niku: correctKaruta.niku[action.payload.kamiNoKuStyle],
          sanku: correctKaruta.sanku[action.payload.kamiNoKuStyle],
        };

        const toriFudaList = question.choiceKarutaNoList.map((no) => ({
          karutaNo: no,
          shiku: state.karutaData.byNo[no].shiku[action.payload.shimoNoKuStyle],
          kekku: state.karutaData.byNo[no].kekku[action.payload.shimoNoKuStyle],
        })) as [ToriFuda, ToriFuda, ToriFuda, ToriFuda];

        state.currentQuestion.content = {
          yomiFuda,
          toriFudaList,
        };

        state.state = 'playing';
      }
    ),
    answerQuestion: create.preparedReducer(
      (args: { questionId: QuestionId; toriFuda: ToriFuda; answerDate: Date }) => ({
        payload: {
          questionId: args.questionId,
          toriFuda: args.toriFuda,
          answerTime: args.answerDate.getTime(),
        },
      }),
      (state, action) => {
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

        const answerMilliSec = action.payload.answerTime - question.startTime!;

        question.answer = {
          isCorrect,
          answerMilliSec,
        };

        state.currentQuestion.answer = {
          isCorrect,
          selectedKarutaNo: action.payload.toriFuda.karutaNo,
          correctKaruta: state.karutaData.byNo[question.correctAnswerKarutaNo],
        };
      }
    ),
    confirmCorrect: create.reducer((state) => {
      if (!state.questionData || !state.currentQuestion || state.state !== 'playing') {
        return;
      }
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
      if (
        !state.questionData ||
        state.currentPosition !== state.questionData.allIdList.length ||
        state.state !== 'confirm'
      ) {
        return;
      }
      state.state = 'finished';
    }),
    restartTraining: create.reducer((state) => {
      if (!state.questionData || state.state !== 'finished') {
        return;
      }

      const incorrectKarutaNoList = state.questionData.allIdList
        .filter((id) => !state.questionData!.byId[id].answer?.isCorrect)
        .map((id) => state.questionData!.byId[id].correctAnswerKarutaNo);

      const createQuestionListService = new CreateQuestionListService(state.karutaData.allNoList);
      const questionList = createQuestionListService.execute(incorrectKarutaNoList);

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
      [
        (state: QuestionSliceState) => state.state,
        (state: QuestionSliceState) => state.questionData,
        (state: QuestionSliceState) => state.karutaData,
      ],
      (state, questionData, karutaData) => {
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
            correctKaruta: karutaData.byNo[question.correctAnswerKarutaNo],
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
