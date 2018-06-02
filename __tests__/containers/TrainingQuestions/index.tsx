import { MockStore } from 'redux-mock-store';
import TrainingQuestions from '@src/containers/TrainingQuestions';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockAppStoreCreateor } from '../../helpers';
import { create } from '../../factories';
import {
  ANSWER_QUESTION_NAME,
  CONFIRM_CORRECT_NAME,
  FINISH_QUESTIONS_NAME,
  OPEN_NEXT_QUESTION_NAME,
  RESTART_QUESTIONS_NAME
} from '@src/actions/questions';
import { GlobalState } from '@src/reducers';
import { initialState as karutasState } from '@src/reducers/karutas';
import { initialState as questionsState } from '@src/reducers/questions';
import * as React from 'react';
import TrainingInitializer from '@src/containers/TrainingInitializer';
import QuestionSection from '@src/components/QuestionSection';
import QuestionCorrect from '@src/components/QuestionCorrect';
import QuestionsResult from '@src/components/QuestionsResult';
import { QuestionState } from '@src/enums';
import { Answer, Question, ToriFuda, YomiFuda } from '@src/types';

const createMockRouter = (submitTime: number) => {
  return {
    history: {
      push: jest.fn()
    },
    route: {
      location: {
        pathname: '/exam/questions',
        state: { submitTime }
      },
      match: { params: {} }
    }
  };
};

const createWrapper = (mockStore: MockStore<GlobalState>, mockRouter: any) => {
  return shallow(<TrainingQuestions />)
    .dive({
      context: {
        router: mockRouter
      }
    })
    .dive({
      context: {
        store: mockStore
      }
    })
    .dive()
    .dive();
};

const createQuestion = (id: number) => {
  const yomiFuda = create<YomiFuda>('yomiFuda', {
    questionId: id
  });

  const toriFudas = [...Array(4).keys()].map(_ =>
    create<ToriFuda>('toriFuda', {
      questionId: id
    })
  );

  return create<Question>('question', {
    id,
    toriFudas,
    yomiFuda
  });
};

describe('<TrainingQuestions />', () => {
  describe('when question is not started', () => {
    it('should render ExamInitializer', () => {
      const mockRouter = createMockRouter(10000);
      const mockStore = mockAppStoreCreateor()({
        karutasState,
        questionsState
      });
      const wrapper = createWrapper(mockStore, mockRouter);
      expect(wrapper.find(TrainingInitializer).length).toBe(1);
    });
  });

  describe('when after answered', () => {
    let wrapper: ShallowWrapper;
    let mockStore: MockStore<GlobalState>;
    beforeEach(() => {
      const mockRouter = createMockRouter(10000);
      mockStore = mockAppStoreCreateor()({
        karutasState,
        questionsState: {
          ...questionsState,
          lastStartedTime: 11000,
          questionState: QuestionState.ConfirmCorrect,
          questions: [createQuestion(1)]
        }
      });
      wrapper = createWrapper(mockStore, mockRouter)
        .dive()
        .dive()
        .dive();
    });

    it('should render QuestionCorrect', () => {
      expect(wrapper.find(QuestionCorrect).length).toBe(1);
    });

    it('should dispatch openNextQuestion action when components onClickGoToNext fired', () => {
      wrapper
        .find(QuestionCorrect)
        .props()
        .onClickGoToNext();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(OPEN_NEXT_QUESTION_NAME);
    });

    it('should dispatch finishQuestions action when components onClickGoToResult fired', () => {
      wrapper
        .find(QuestionCorrect)
        .props()
        .onClickGoToResult();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(FINISH_QUESTIONS_NAME);
    });
  });

  describe('when finished', () => {
    let wrapper: ShallowWrapper;
    let mockStore: MockStore<GlobalState>;

    beforeEach(() => {
      const mockRouter = createMockRouter(10000);
      mockStore = mockAppStoreCreateor()({
        karutasState,
        questionsState: {
          ...questionsState,
          answers: [create<Answer>('answer')],
          lastStartedTime: 11000,
          questionState: QuestionState.Finished,
          questions: [createQuestion(1)]
        }
      });
      wrapper = createWrapper(mockStore, mockRouter)
        .dive()
        .dive()
        .dive()
        .dive();
    });

    it('should render ExamResult', () => {
      expect(wrapper.find(QuestionsResult).length).toBe(1);
    });

    it('should dispatch restartQuestions action when components onClickRestart fired', () => {
      wrapper
        .find(QuestionsResult)
        .props()
        .onClickRestart();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(RESTART_QUESTIONS_NAME);
    });
  });

  describe('when in answer', () => {
    let wrapper: ShallowWrapper;
    let mockStore: MockStore<GlobalState>;

    beforeEach(() => {
      const mockRouter = createMockRouter(10000);
      mockStore = mockAppStoreCreateor()({
        karutasState,
        questionsState: {
          ...questionsState,
          lastStartedTime: 11000,
          questionState: QuestionState.InAnswer,
          questions: [createQuestion(1)]
        }
      });
      wrapper = createWrapper(mockStore, mockRouter)
        .dive()
        .dive();
    });

    it('should render QuestionSection', () => {
      expect(wrapper.find(QuestionSection).length).toBe(1);
    });

    it('should dispatch answerQuestion action when components onClickToriFuda fired', () => {
      wrapper
        .find(QuestionSection)
        .props()
        .onClickToriFuda(
          mockStore.getState().questionsState.questions[0].toriFudas[0]
        );
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(ANSWER_QUESTION_NAME);
    });

    it('should dispatch confirmCorrect action when components onClickResult fired', () => {
      wrapper
        .find(QuestionSection)
        .props()
        .onClickResult();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(CONFIRM_CORRECT_NAME);
    });
  });
});
