import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { create } from '../../factories';
import { sel } from '../../helpers';
import ExamResult, { ExamResultProps } from '@src/components/ExamResult';
import QuestionResultsMap from '@src/components/QuestionResultsMap';
import { Answer, Question } from '@src/types';

describe('<ExamResult />', () => {
  const questions = [
    create<Question>('question'),
    create<Question>('question'),
    create<Question>('question')
  ];

  const answers = [
    create<Answer>('answer'),
    create<Answer>('answer'),
    create<Answer>('answer')
  ];

  let baseProps: ExamResultProps;

  beforeEach(() => {
    baseProps = {
      answers,
      averageAnswerSecond: 3.5,
      correctCount: 2,
      onClickRestart: jest.fn(),
      questions,
      totalCount: 3
    };
  });

  it('should render component when correct all', () => {
    const props = { ...baseProps, correctCount: 3 };
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <ExamResult {...props} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when wrong', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <ExamResult {...baseProps} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRestart when restart clicked', () => {
    const wrapper = shallow(<ExamResult {...baseProps} />).dive();
    wrapper.find(sel('restart-training')).simulate('click');
    expect(baseProps.onClickRestart).toHaveBeenCalled();
  });

  it('should set state when QuestionResult clicked', () => {
    const wrapper = shallow(<ExamResult {...baseProps} />);
    wrapper
      .dive()
      .find(QuestionResultsMap)
      .props()
      .onClickResult(questions[0].correctKaruta);
    expect(wrapper.state().stateValue).toEqual(questions[0].correctKaruta);
  });
});
