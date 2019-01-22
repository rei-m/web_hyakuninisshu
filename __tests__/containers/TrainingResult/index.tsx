import { GlobalState } from '@src/state';
import * as React from 'react';
import { navigate } from 'gatsby';
import { mapStateToProps, Props, TrainingResult } from '@src/containers/TrainingResult';
import TrainingResultView from '@src/components/TrainingResultView';
import ErrorMessage from '@src/components/ErrorMessage';
import { shallow, ShallowWrapper } from 'enzyme';
import { initialState as questionsState } from '@src/state/questions';
import { initialState as uiState } from '@src/state/ui';
import { QuestionState } from '@src/enums';
import { Answer } from '@src/types';
import { create } from '@test/factories';

describe('<TrainingResult />', () => {
  describe('components', () => {
    let wrapper: ShallowWrapper;
    let baseProps: Props;

    beforeEach(() => {
      baseProps = {
        answers: [create<Answer>('answer'), create<Answer>('answer')],
        totalCount: 2,
        questionState: QuestionState.Finished,
      };
    });

    describe('when question is not finished', () => {
      it('should render ErrorMessage', () => {
        const props = { ...baseProps, questionState: QuestionState.Answered };
        wrapper = shallow(<TrainingResult {...props} />);
        expect(wrapper.find(ErrorMessage).length).toBe(1);
      });
    });

    describe('when question is finished', () => {
      it('should render TrainingResultView', () => {
        wrapper = shallow(<TrainingResult {...baseProps} />);
        expect(wrapper.find(TrainingResultView).length).toBe(1);
      });

      it('should navigate to result when onClickRestart fired', () => {
        wrapper = shallow(<TrainingResult {...baseProps} />);
        wrapper
          .find(TrainingResultView)
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
        },
        ui: uiState,
      };

      expect(mapStateToProps(state)).toMatchSnapshot();
    });
  });
});
