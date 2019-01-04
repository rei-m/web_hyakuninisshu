import { create } from '../factories';
import {
  AnswerQuestionAction,
  ANSWER_QUESTION_NAME,
  ConfirmCorrectAction,
  CONFIRM_CORRECT_NAME,
  FinishQuestionsAction,
  FINISH_QUESTIONS_NAME,
  OpenNextQuestionAction,
  OPEN_NEXT_QUESTION_NAME,
  RestartQuestionsAction,
  RESTART_QUESTIONS_NAME,
  StartExamAction,
  StartTrainingAction,
  START_EXAM_NAME,
  START_TRAINING_NAME,
} from '@src/actions/questions';
import { initialState, questions } from '@src/state/questions';
import { Answer, Karuta, Question } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

const setUpKarutas = () =>
  Array.from(Array(100).keys()).map(i =>
    create<Karuta>('karuta', {
      color: i < 20 ? 'blue' : 'pink',
      id: (i + 1).toString(),
      no: i + 1,
      kimariji: (i % 5) + 1,
    })
  );

describe('Questions Logic', () => {
  it('should be transition state that is started training', () => {
    const karutas = setUpKarutas();
    const action: StartTrainingAction = {
      meta: {
        color: ColorCondition.None,
        kamiNoKuStyle: KarutaStyleCondition.KanjiAndKana,
        kimariji: KimarijiCondition.None,
        rangeFrom: RangeFromCondition.One,
        rangeTo: RangeToCondition.OneHundred,
        shimoNoKuStyle: KarutaStyleCondition.KanaOnly,
      },
      payload: {
        karutas,
        nextState: QuestionState.InAnswer,
        questions: [create<Question>('question'), create<Question>('question')],
        startedTime: 1234567890,
      },
      type: START_TRAINING_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questions).toHaveLength(2);
    expect(state.currentIndex).toBe(0);
    expect(state.lastStartedTime).toBe(action.payload.startedTime);
    expect(state.questionState).toBe(action.payload.nextState);
    expect(state.trainingCondition).toEqual(action.meta);
  });

  it('should be transition state that is started exam', () => {
    const karutas = setUpKarutas();
    const action: StartExamAction = {
      payload: {
        karutas,
        nextState: QuestionState.InAnswer,
        questions: [create<Question>('question'), create<Question>('question')],
        startedTime: 1234567890,
      },
      type: START_EXAM_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questions).toHaveLength(2);
    expect(state.currentIndex).toBe(0);
    expect(state.lastStartedTime).toBe(action.payload.startedTime);
    expect(state.questionState).toBe(action.payload.nextState);
  });

  it('should be transition state that is restarted', () => {
    const action: RestartQuestionsAction = {
      payload: {
        nextState: QuestionState.InAnswer,
        questions: [create<Question>('question'), create<Question>('question')],
        startedTime: 1234567890,
      },
      type: RESTART_QUESTIONS_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questions).toHaveLength(2);
    expect(state.currentIndex).toBe(0);
    expect(state.lastStartedTime).toBe(action.payload.startedTime);
    expect(state.questionState).toBe(action.payload.nextState);
  });

  it('should be transition state that is answered', () => {
    const action: AnswerQuestionAction = {
      payload: {
        answer: create<Answer>('answer'),
        nextState: QuestionState.Answered,
      },
      type: ANSWER_QUESTION_NAME,
    };
    const state = questions(initialState, action);
    expect(state.answers).toHaveLength(1);
    expect(state.answers[0]).toEqual(action.payload.answer);
    expect(state.questionState).toBe(action.payload.nextState);
  });

  it('should be transition state that is confirmed correct', () => {
    const action: ConfirmCorrectAction = {
      payload: {
        nextState: QuestionState.ConfirmCorrect,
      },
      type: CONFIRM_CORRECT_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questionState).toBe(action.payload.nextState);
  });

  it('should be transition state that is opened new question', () => {
    const action: OpenNextQuestionAction = {
      payload: {
        nextIndex: 1,
        nextState: QuestionState.InAnswer,
        startedTime: 1234567890,
      },
      type: OPEN_NEXT_QUESTION_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questionState).toBe(action.payload.nextState);
    expect(state.currentIndex).toBe(1);
    expect(state.lastStartedTime).toBe(1234567890);
  });

  it('should be transition state that is opened new question', () => {
    const action: FinishQuestionsAction = {
      payload: {
        nextState: QuestionState.Finished,
      },
      type: FINISH_QUESTIONS_NAME,
    };
    const state = questions(initialState, action);
    expect(state.questionState).toBe(action.payload.nextState);
  });
});