import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '../../factories';
import { sel } from '../../helpers';
import QuestionResultsMap, {
  QuestionResultsMapProps
} from '@src/components/QuestionResultsMap';
import { Answer, Question } from '@src/types';

describe('<QuestionResultsMap />', () => {
  let baseProps: QuestionResultsMapProps;

  beforeEach(() => {
    const questions = [
      create<Question>('question'),
      create<Question>('question')
    ];

    const answers = [
      create<Answer>('answer', {
        questionId: questions[0].id
      }),
      create<Answer>('answer', {
        questionId: questions[1].id
      })
    ];

    baseProps = {
      answers,
      onClickResult: jest.fn(),
      questions
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <QuestionResultsMap {...baseProps} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickResult when result clicked', () => {
    const wrapper = shallow(<QuestionResultsMap {...baseProps} />);
    wrapper
      .find(sel(`question-${baseProps.questions[0].id}`))
      .simulate('click');
    expect(baseProps.onClickResult).toHaveBeenCalledWith(
      baseProps.questions[0].correctKaruta
    );
  });
});
