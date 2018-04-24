import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '../../factories';
import { sel } from '../../helpers';
import QuestionSection, {
  QuestionSectionProps
} from '@src/components/QuestionSection';
import { ToriFudaViewProps } from '@src/components/ToriFudaView';
import { Answer, Question } from '@src/types';

describe('<QuestionSection />', () => {
  let baseProps: QuestionSectionProps;

  beforeEach(() => {
    baseProps = {
      currentPosition: 1,
      onClickResult: jest.fn(),
      onClickToriFuda: jest.fn(),
      question: create<Question>('question'),
      totalCount: 10
    };
  });

  it('should render component when not answered', () => {
    const renderer = ReactTestRenderer.create(
      <QuestionSection {...baseProps} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when answered', () => {
    const props = {
      ...baseProps,
      answer: create<Answer>('answer', { questionId: baseProps.question.id })
    };
    const renderer = ReactTestRenderer.create(<QuestionSection {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickToriFuda when torifuda clicked', () => {
    const wrapper = shallow(<QuestionSection {...baseProps} />);
    const props: ToriFudaViewProps = wrapper
      .find(sel('torifuda-0'))
      .props() as any;
    props.onClick(baseProps.question.toriFudas[0]);
    expect(baseProps.onClickToriFuda).toHaveBeenCalledWith(
      baseProps.question.toriFudas[0]
    );
  });

  it('should fire onClickResult when result clicked', () => {
    const props = {
      ...baseProps,
      answer: create<Answer>('answer', { questionId: baseProps.question.id })
    };
    const wrapper = shallow(<QuestionSection {...props} />);
    wrapper.find(sel('result')).simulate('click');
    expect(baseProps.onClickResult).toHaveBeenCalled();
  });
});
