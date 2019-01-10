import * as React from 'react';
import { MockStore } from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { mapDispatchToProps, mapStateToProps, ExamQuestions, OwnProps, Props } from '@src/containers/ExamQuestions';
import ExamInitializer from '@src/containers/ExamInitializer';
import QuestionView from '@src/components/QuestionView';
import QuestionCorrect from '@src/components/QuestionCorrect';
import ExamResult from '@src/components/ExamResult';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions';
import { QuestionState } from '@src/enums';
import { Answer, Karuta, Question, ToriFuda, YomiFuda } from '@src/types';
import {
  ANSWER_QUESTION_NAME,
  CONFIRM_CORRECT_NAME,
  FINISH_QUESTIONS_NAME,
  OPEN_NEXT_QUESTION_NAME,
  RESTART_QUESTIONS_NAME,
} from '@src/actions/questions';
import { create } from '@test/factories';
import { mockAppStoreCreateor } from '@test/helpers';

const createQuestion = (id: number) => {
  const yomiFuda = create<YomiFuda>('yomiFuda', {
    questionId: id,
  });

  const toriFudas = [...Array(4).keys()].map(_ =>
    create<ToriFuda>('toriFuda', {
      questionId: id,
    })
  );

  return create<Question>('question', {
    id,
    toriFudas,
    yomiFuda,
  });
};

describe('<ExamQuestions />', () => {
  describe('components', () => {
    let wrapper: ShallowWrapper;
    let baseProps: Props;

    beforeEach(() => {
      const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
        create<Karuta>('karuta', {
          color: i < 20 ? 'blue' : 'pink',
          id: (i + 1).toString(),
          no: i + 1,
          kimariji: (i % 5) + 1,
        })
      );

      const submitTime = 1000;

      baseProps = {
        karutas,
        submitTime,
        questions: [],
        answers: [],
        totalCount: 0,
        currentPosition: 0,
        onClickToriFuda: jest.fn(),
        onClickResult: jest.fn(),
        onClickGoToNext: jest.fn(),
        onClickGoToResult: jest.fn(),
        onClickRestart: jest.fn(),
      };
    });

    describe('when question is not started', () => {
      it('should render ExamInitializer', () => {
        wrapper = shallow(<ExamQuestions {...baseProps} />);
        expect(wrapper.find(ExamInitializer).length).toBe(1);
      });
    });

    describe('when in answer', () => {
      it('should render QuestionView', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.InAnswer,
          question: createQuestion(1),
        };
        wrapper = shallow(<ExamQuestions {...props} />);
        expect(wrapper.find(QuestionView).length).toBe(1);
      });
    });

    describe('when after answered', () => {
      it('should render QuestionCorrect', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.ConfirmCorrect,
          question: createQuestion(1),
        };
        wrapper = shallow(<ExamQuestions {...props} />);
        expect(wrapper.find(QuestionCorrect).length).toBe(1);
      });
    });

    describe('when finished', () => {
      it('should render ExamResult', () => {
        const props = {
          ...baseProps,
          lastStartedTime: 11000,
          questionState: QuestionState.Finished,
          question: createQuestion(1),
        };
        wrapper = shallow(<ExamQuestions {...props} />);
        expect(wrapper.find(ExamResult).length).toBe(1);
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should convert state to props', () => {
      const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
        create<Karuta>('karuta', {
          color: i < 20 ? 'blue' : 'pink',
          id: (i + 1).toString(),
          no: i + 1,
          kimariji: (i % 5) + 1,
        })
      );

      const submitTime = 1000;
      const props: OwnProps = {
        karutas,
        submitTime,
      };

      const state: GlobalState = {
        questions: {
          ...questionsState,
          answers: [create<Answer>('answer')],
          lastStartedTime: 11000,
          questionState: QuestionState.Finished,
          questions: [createQuestion(1)],
        },
      };

      expect(mapStateToProps(state, props)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    let mockStore: MockStore<GlobalState>;

    beforeEach(() => {
      mockStore = mockAppStoreCreateor()({
        questions: { ...questionsState, questions: [createQuestion(1)] },
      });
    });

    it('should dispatch openNextQuestion action when onClickGoToNext fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickGoToNext();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(OPEN_NEXT_QUESTION_NAME);
    });

    it('should dispatch finishQuestions action when onClickGoToResult fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickGoToResult();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(FINISH_QUESTIONS_NAME);
    });

    it('should dispatch restartQuestions action when onClickRestart fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickRestart();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(RESTART_QUESTIONS_NAME);
    });

    it('should dispatch confirmCorrect action when onClickResult fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickResult();
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(CONFIRM_CORRECT_NAME);
    });

    it('should dispatch answerQuestion action when onClickToriFuda fired', () => {
      mapDispatchToProps(mockStore.dispatch).onClickToriFuda(mockStore.getState().questions.questions[0].toriFudas[0]);
      const mockActions = mockStore.getActions();
      expect(mockActions[0].type).toEqual(ANSWER_QUESTION_NAME);
    });
  });
});
