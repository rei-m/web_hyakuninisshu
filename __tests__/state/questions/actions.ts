import { create } from '@test/factories';
import * as questionsAction from '@src/state/questions/actions';
import {
  ANSWER_QUESTION_NAME,
  CONFIRM_CORRECT_NAME,
  OPEN_NEXT_QUESTION_NAME,
  RESTART_QUESTIONS_NAME,
  START_EXAM_NAME,
  START_TRAINING_NAME,
} from '@src/state/questions/constants';
import { Answer, Color, Karuta, Kimariji, Question } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

const setUpKarutas = () =>
  Array.from(Array(100).keys()).map(i =>
    create<Karuta>('karuta', {
      color: (i < 20 ? 'blue' : 'pink') as Color,
      id: (i + 1).toString(),
      no: i + 1,
      kimariji: ((i % 5) + 1) as Kimariji,
    })
  );

const setUpQuestions = () => [...Array(10).keys()].map(_ => create<Question>('question'));

describe('QuestionsActionCreator', () => {
  it('should create StartTrainingAction', () => {
    const karutas = setUpKarutas();
    const actualAction = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly,
      QuestionAnimCondition.Normal
    );

    const { type, payload } = actualAction;
    const { nextState, questions, startedTime, dulation } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(questions).toHaveLength(100);
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
    expect(toriFudas.map(f => f.fourthText)).toContain(correctKaruta.fourthKana);
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKana);
    expect(type).toEqual(START_TRAINING_NAME);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
    expect(dulation).toEqual(0.6);
  });

  it('should return StartTrainingAction payload filtered by range', () => {
    const karutas = setUpKarutas();
    const actualAction = questionsAction.startTraining(
      karutas,
      RangeFromCondition.TwentyOne,
      RangeToCondition.Forty,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly,
      QuestionAnimCondition.Normal
    );

    const { payload } = actualAction;
    const { questions, startedTime } = payload;
    const karutaNos = questions.map(q => q.correctKaruta.no);
    expect(questions).toHaveLength(20);
    expect(karutaNos).toContain(21);
    expect(karutaNos).toContain(40);
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload filtered by kimariji', () => {
    const karutas = setUpKarutas();
    const actualAction = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.One,
      ColorCondition.None,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly,
      QuestionAnimCondition.Normal
    );

    const { payload } = actualAction;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.kimariji === 1)).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload filtered by color', () => {
    const karutas = setUpKarutas();
    const actualAction = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.Blue,
      KarutaStyleCondition.KanjiAndKana,
      KarutaStyleCondition.KanaOnly,
      QuestionAnimCondition.Normal
    );

    const { payload } = actualAction;
    const { questions, startedTime } = payload;
    expect(questions).toHaveLength(20);
    expect(questions.every(q => q.correctKaruta.color === 'blue')).toBeTruthy();
    expect(startedTime).not.toBeUndefined();
  });

  it('should return StartTrainingAction payload switched by karuta style', () => {
    const karutas = setUpKarutas();
    const actualAction = questionsAction.startTraining(
      karutas,
      RangeFromCondition.One,
      RangeToCondition.OneHundred,
      KimarijiCondition.None,
      ColorCondition.None,
      KarutaStyleCondition.KanaOnly,
      KarutaStyleCondition.KanjiAndKana,
      QuestionAnimCondition.Normal
    );

    const { payload } = actualAction;
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
    const actualAction = questionsAction.startExam(karutas);

    const { type, payload } = actualAction;
    const { nextState, questions, startedTime } = payload;
    const { correctKaruta, yomiFuda, toriFudas } = questions[0];
    expect(questions).toHaveLength(100);
    expect(yomiFuda.firstText).toEqual(correctKaruta.firstKanji);
    expect(yomiFuda.secondText).toEqual(correctKaruta.secondKanji);
    expect(yomiFuda.thirdText).toEqual(correctKaruta.thirdKanji);
    expect(toriFudas.map(f => f.fourthText)).toContain(correctKaruta.fourthKana);
    expect(toriFudas.map(f => f.fifthText)).toContain(correctKaruta.fifthKana);
    expect(type).toEqual(START_EXAM_NAME);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
  });

  it('should create RestartQuestionsAction', () => {
    const answeredQuestions = setUpQuestions();
    const answers = answeredQuestions.map(q => {
      return create<Answer>('answer', {
        correct: q.id % 2 === 0,
        questionId: q.id,
      });
    });
    const actualAction = questionsAction.restartQuestions(answeredQuestions, answers);

    const { type, payload } = actualAction;
    const { nextState, questions, startedTime } = payload;
    expect(type).toEqual(RESTART_QUESTIONS_NAME);
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

    beforeEach(() => {
      question = create<Question>('question', {
        correctKaruta: create<Karuta>('karuta', {
          id: '1',
          no: 1,
        }),
        id: 1,
      });
    });

    it('should create correct', () => {
      const actualAction = questionsAction.answerQuestion(1, 1, [question]);
      const { type, payload } = actualAction;
      const { answer, nextState } = payload;

      expect(answer.correct).toBeTruthy();
      expect(answer.questionId).toEqual(1);
      expect(answer.karutaNo).toEqual(1);
      expect(answer.time).not.toBeUndefined();
      expect(type).toEqual(ANSWER_QUESTION_NAME);
      expect(nextState).toEqual(QuestionState.Answered);
    });

    it('should create wrong', () => {
      const actualAction = questionsAction.answerQuestion(1, 2, [question]);
      const { type, payload } = actualAction;
      const { answer, nextState } = payload;

      expect(answer.correct).toBeFalsy();
      expect(answer.questionId).toEqual(1);
      expect(answer.karutaNo).toEqual(2);
      expect(answer.time).not.toBeUndefined();
      expect(type).toEqual(ANSWER_QUESTION_NAME);
      expect(nextState).toEqual(QuestionState.Answered);
    });
  });

  it('should create ConfirmCorrectAction', () => {
    const question1 = create<Question>('question', {
      correctKaruta: create<Karuta>('karuta', {
        id: '1',
        no: 1,
      }),
      id: 1,
    });
    const question2 = create<Question>('question', {
      correctKaruta: create<Karuta>('karuta', {
        id: '2',
        no: 2,
      }),
      id: 2,
    });

    const answer = create<Answer>('answer', {
      correct: true,
      karutaNo: 1,
      questionId: 1,
    });

    const actualAction = questionsAction.confirmCorrect([question1, question2], [answer]);
    const { type, payload } = actualAction;
    const { nextState } = payload;
    expect(type).toEqual(CONFIRM_CORRECT_NAME);
    expect(nextState).toEqual(QuestionState.ConfirmCorrect);
  });

  it('should create OpenNextQuestionAction', () => {
    const actualAction = questionsAction.openNextQuestion(0);

    const { type, payload } = actualAction;
    const { nextIndex, nextState, startedTime } = payload;
    expect(type).toEqual(OPEN_NEXT_QUESTION_NAME);
    expect(nextIndex).toEqual(1);
    expect(nextState).toEqual(QuestionState.InAnswer);
    expect(startedTime).not.toBeUndefined();
  });
});
