import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { sel, setUpQuery } from '@test/helpers';
import ExamResultView, { Props } from '@src/components/ExamResultView';
import { QueryData as QuestionResultQueryData } from '@src/components/QuestionResult';
import { Answer, Question } from '@src/types';

describe('<ExamResultView />', () => {
  beforeEach(() => {
    setUpQuery<QuestionResultQueryData>({
      correctImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `correct-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
      incorrectImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `incorrect-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
    });
  });

  const questions = [create<Question>('question'), create<Question>('question'), create<Question>('question')];

  const answers = [create<Answer>('answer'), create<Answer>('answer'), create<Answer>('answer')];

  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      answers,
      averageAnswerSecond: 3.5,
      correctCount: 2,
      onClickRestart: jest.fn(),
      questions,
      totalCount: 3,
    };
  });

  it('should render component when correct all', () => {
    const props = { ...baseProps, correctCount: 3 };
    const renderer = ReactTestRenderer.create(<ExamResultView {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when wrong', () => {
    const renderer = ReactTestRenderer.create(<ExamResultView {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRestart when restart clicked', () => {
    const wrapper = shallow(<ExamResultView {...baseProps} />)
      .dive()
      .dive();
    wrapper.find(sel('restart-training')).simulate('click');
    expect(baseProps.onClickRestart).toHaveBeenCalled();
  });
});
