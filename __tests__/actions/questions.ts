import { MockStore } from 'redux-mock-store';
import { create } from '@test/factories';
import { mockAppStoreCreateor } from '@test/helpers';
import * as questionsAction from '@src/actions/questions';
import { initialState as questionsInitialState } from '@src/state/questions';
import { Answer, Karuta, Question } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';
import { GlobalState } from '@src/state';

const setUpKarutas = () =>
  Array.from(Array(100).keys()).map(i =>
    create<Karuta>('karuta', {
      color: i < 20 ? 'blue' : 'pink',
      id: (i + 1).toString(),
      no: i + 1,
      kimariji: (i % 5) + 1,
    })
  );

const setUpQuestions = () => [...Array(10).keys()].map(_ => create<Question>('question'));

const setUpStoreWithKarutas = () => {
  return mockAppStoreCreateor()({
    questions: questionsInitialState,
  });
};

describe('QuestionsActionCreator', () => {
  it('should create StartTrainingAction', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartTrainingAction;
    const { type, payload } = action;
    const { nextState, questions, startedTime } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(questions).toHaveLength(100);
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
    expect(toriFudas.map(f => f.fourthText)).toContain(correctKaruta.fourthKana);
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKana);
    expect(type).toEqual(questionsAction.START_TRAINING_NAME);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload filtered by range', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startTraining(
      karutas,
      RangeFromCondition.TwentyOne,
      RangeToCondition.Forty,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartTrainingAction;
    const { payload } = action;
    const { questions, startedTime } = payload;
    const karutaNos = questions.map(q => q.correctKaruta.no);
    expect(questions).toHaveLength(20);
    expect(karutaNos).toContain(21);
    expect(karutaNos).toContain(40);
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload filtered by kimariji', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.One,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartTrainingAction;
    const { payload } = action;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.kimariji === 1)).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload filtered by color', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.Blue,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly
    );

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartTrainingAction;
    const { payload } = action;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.color === 'blue')).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload switched by karuta style', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanaOnly,
      KarutaStyleCondition.KanjiAndKana
    );

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartTrainingAction;
    const { payload } = action;
    const { questions } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKana);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKana);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKana);
    expect(toriFudas.map(f => f.fourthText)).toContain(correctKaruta.fourthKanji);
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKanji);
  });

  it('should create StartExamAction', () => {
    const karutas = setUpKarutas();
    const actionCreator = questionsAction.startExam(karutas);

    const store = setUpStoreWithKarutas();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.StartExamAction;
    const { type, payload } = action;
    const { nextState, questions, startedTime } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(questions).toHaveLength(100);
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
    expect(toriFudas.map(f => f.fourthText)).toContain(correctKaruta.fourthKana);
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKana);
    expect(type).toEqual(questionsAction.START_EXAM_NAME);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
  });

  it('should create RestartQuestionsAction', () => {
    const actionCreator = questionsAction.restartQuestions();

    const answeredQuestions = setUpQuestions();
    const answers = answeredQuestions.map(q => {
      return create<Answer>('answer', {
        correct: q.id % 2 === 0,
        questionId: q.id,
      });
    });

    const store = mockAppStoreCreateor()({
      questions: {
        ...questionsInitialState,
        answers,
        questions: answeredQuestions,
      },
    });
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0] as questionsAction.RestartQuestionsAction;
    const { type, payload } = action;
    const { nextState, questions, startedTime } = payload;
    expect(type).toEqual(questionsAction.RESTART_QUESTIONS_NAME);
    expect(nextState).toEqual(QuestionState.InAnswer);
    const newQuestionIds = questions.map(q => q.id);
    expect(questions).toHaveLength(5);
    expect(newQuestionIds).toContain(1);
    expect(newQuestionIds).toContain(3);
    expect(newQuestionIds).toContain(5);
    expect(newQuestionIds).toContain(7);
    expect(newQuestionIds).toContain(9);
    expect(startedTime).not.toBeUndefined();
  });

  describe('AnswerQuestionAction', () => {
    let question: Question;
    let store: MockStore<GlobalState>;

    beforeEach(() => {
      question = create<Question>('question', {
        correctKaruta: create<Karuta>('karuta', {
          id: '1',
          no: 1,
        }),
        id: 1,
      });
      store = mockAppStoreCreateor()({
        questions: {
          ...questionsInitialState,
          questions: [question],
        },
      });
    });

    it('should create correct', () => {
      const actionCreator = questionsAction.answerQuestion(1, 1);
      store.dispatch(actionCreator as any);

      const action = store.getActions()[0];
      const { type, payload } = action;
      const { answer, nextState } = payload;

      expect(answer.correct).toBeTruthy();
      expect(answer.questionId).toEqual(1);
      expect(answer.karutaNo).toEqual(1);
      expect(answer.time).not.toBeUndefined();
      expect(type).toEqual(questionsAction.ANSWER_QUESTION_NAME);
      expect(nextState).toEqual(QuestionState.Answered);
    });

    it('should create wrong', () => {
      const actionCreator = questionsAction.answerQuestion(1, 2);
      store.dispatch(actionCreator as any);

      const action = store.getActions()[0];
      const { type, payload } = action;
      const { answer, nextState } = payload;

      expect(answer.correct).toBeFalsy();
      expect(answer.questionId).toEqual(1);
      expect(answer.karutaNo).toEqual(2);
      expect(answer.time).not.toBeUndefined();
      expect(type).toEqual(questionsAction.ANSWER_QUESTION_NAME);
      expect(nextState).toEqual(QuestionState.Answered);
    });
  });

  it('should create ConfirmCorrectAction', () => {
    const question = create<Question>('question', {
      correctKaruta: create<Karuta>('karuta', {
        id: '1',
        no: 1,
      }),
      id: 1,
    });
    const answer = create<Answer>('answer', {
      correct: true,
      karutaNo: 1,
      questionId: 1,
    });
    const store = mockAppStoreCreateor()({
      questions: {
        ...questionsInitialState,
        answers: [answer],
        questionState: QuestionState.Answered,
        questions: [question],
      },
    });

    const actionCreator = questionsAction.confirmCorrect();
    store.dispatch(actionCreator);

    const action = store.getActions()[0];
    const { type, payload } = action;
    const { nextState } = payload;
    expect(type).toEqual(questionsAction.CONFIRM_CORRECT_NAME);
    expect(nextState).toEqual(QuestionState.ConfirmCorrect);
  });

  it('should create OpenNextQuestionAction', () => {
    const question1 = create<Question>('question', {
      id: 1,
    });
    const question2 = create<Question>('question', {
      id: 2,
    });
    const answer = create<Answer>('answer', {
      correct: true,
      karutaNo: 1,
      questionId: 1,
    });
    const store = mockAppStoreCreateor()({
      questions: {
        ...questionsInitialState,
        answers: [answer],
        questionState: QuestionState.Answered,
        questions: [question1, question2],
      },
    });

    const actionCreator = questionsAction.openNextQuestion();
    store.dispatch(actionCreator as any);

    const action = store.getActions()[0];
    const { type, payload } = action;
    const { nextIndex, nextState, startedTime } = payload;
    expect(type).toEqual(questionsAction.OPEN_NEXT_QUESTION_NAME);
    expect(nextIndex).toEqual(1);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
  });
});
