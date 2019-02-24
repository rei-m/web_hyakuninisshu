import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { navigate } from 'gatsby';
import { mapStateToProps, ExamResult, Props } from '@src/containers/ExamResult';
import ExamResultView from '@src/components/ExamResultView';
import ErrorMessage from '@src/components/ErrorMessage';
import { GlobalState } from '@src/state';
import { initialState as questionsState } from '@src/state/questions/reducers';
import { initialState as uiState } from '@src/state/ui/reducers';
import { QuestionState } from '@src/enums';
import { Answer, Question, ToriFuda, YomiFuda } from '@src/types';
import { create } from '@test/factories';

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

describe('<ExamResult />', () => {
  describe('components', () => {
    let wrapper: ShallowWrapper;
    let baseProps: Props;

    beforeEach(() => {
      const quesiton1 = createQuestion(1);
      const quesiton2 = createQuestion(2);
      baseProps = {
        questions: [quesiton1, quesiton2],
        answers: [
          create<Answer>('answer', {
            questionId: quesiton1.id,
          }),
          create<Answer>('answer', {
            questionId: quesiton2.id,
          }),
        ],
        totalCount: 2,
        questionState: QuestionState.Finished,
      };
    });

    describe('when question is not finished', () => {
      it('should render ErrorMessage', () => {
        const props = { ...baseProps, questionState: QuestionState.Answered };
        wrapper = shallow(<ExamResult {...props} />);
        expect(wrapper.find(ErrorMessage).length).toBe(1);
      });
    });

    describe('when question is finished', () => {
      it('should render ExamResultView', () => {
        wrapper = shallow(<ExamResult {...baseProps} />);
        expect(wrapper.find(ExamResultView).length).toBe(1);
      });

      it('should navigate to result when onClickRestart fired', () => {
        wrapper = shallow(<ExamResult {...baseProps} />);
        wrapper
          .find(ExamResultView)
          .props()
          .onClickRestart();
        expect(navigate).toHaveBeenCalled();
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should convert state to props', () => {
      const state: GlobalState = {
        questions: {
          ...questionsState,
          answers: [create<Answer>('answer')],
          questionState: QuestionState.Finished,
          questions: [createQuestion(1)],
        },
        ui: uiState,
      };

      expect(mapStateToProps(state)).toMatchSnapshot();
    });
  });
});
