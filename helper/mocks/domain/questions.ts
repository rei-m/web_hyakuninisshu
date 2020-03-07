import { Question } from '@src/domain/models';

export const MOCK_QUESTION_1: Question = {
  id: 1,
  correctAnswerKarutaNo: 1,
  choiceKarutaNoList: [1, 2, 3, 4],
};

export const MOCK_QUESTION_2: Question = {
  id: 2,
  correctAnswerKarutaNo: 2,
  choiceKarutaNoList: [1, 2, 3, 4],
};

export const MOCK_QUESTION_1_STARTED: Question = {
  id: 1,
  correctAnswerKarutaNo: 1,
  choiceKarutaNoList: [1, 2, 3, 4],
  startTime: 1583595557624,
};

export const MOCK_QUESTION_1_ANSWERED_CORRECT: Question = {
  id: 1,
  correctAnswerKarutaNo: 1,
  choiceKarutaNoList: [1, 2, 3, 4],
  startTime: 1583595557624,
  answer: {
    isCorrect: true,
    answerTime: 1583595559624,
  },
};

export const MOCK_QUESTION_2_ANSWERED_WRONG: Question = {
  id: 2,
  correctAnswerKarutaNo: 2,
  choiceKarutaNoList: [1, 2, 3, 4],
  startTime: 1583595689123,
  answer: {
    isCorrect: false,
    answerTime: 1583595690123,
  },
};
