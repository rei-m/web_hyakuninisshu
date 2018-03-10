import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import QuestionResult, {
  QuestionResultProps
} from '../../../src/components/QuestionResult';
import { Answer } from '../../../src/types';
import { create } from '../../factories';

describe('<QuestionResult />', () => {
  let baseProps: QuestionResultProps;

  beforeEach(() => {
    baseProps = {
      answer: create<Answer>('answer'),
      onClick: jest.fn()
    };
  });

  it('should render component when answer is correct', () => {
    const props = {
      ...baseProps,
      answer: { ...baseProps.answer, correct: true }
    };
    const renderer = ReactTestRenderer.create(<QuestionResult {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when answer is wrong', () => {
    const props = {
      ...baseProps,
      answer: { ...baseProps.answer, correct: false }
    };
    const renderer = ReactTestRenderer.create(<QuestionResult {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClick when component clicked', () => {
    const wrapper = shallow(<QuestionResult {...baseProps} />);
    wrapper.simulate('click');
    expect(baseProps.onClick).toHaveBeenCalled();
  });
});
