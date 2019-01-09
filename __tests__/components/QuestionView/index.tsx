import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { mockStaticQuery, sel } from '@test/helpers';
import QuestionView, { Props } from '@src/components/QuestionView';
import { Answer, Question } from '@src/types';

describe('<QuestionView />', () => {
  let baseProps: Props;

  beforeEach(() => {
    mockStaticQuery.mockImplementation(({ render }) =>
      render({
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
        questionBGImage: {
          publicURL: '/tatami.png',
        },
      })
    );
    baseProps = {
      currentPosition: 1,
      onClickResult: jest.fn(),
      onClickToriFuda: jest.fn(),
      question: create<Question>('question'),
      totalCount: 10,
    };
  });

  it('should render component when not answered', () => {
    const renderer = ReactTestRenderer.create(<QuestionView {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when answered', () => {
    const props = {
      ...baseProps,
      answer: create<Answer>('answer', { questionId: baseProps.question.id }),
    };
    const renderer = ReactTestRenderer.create(<QuestionView {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickToriFuda when torifuda clicked', () => {
    const wrapper = shallow(<QuestionView {...baseProps} />).dive();
    wrapper
      .find(sel('torifuda-0'))
      .dive()
      .simulate('click');
    expect(baseProps.onClickToriFuda).toHaveBeenCalledWith(baseProps.question.toriFudas[0]);
  });

  it('should fire onClickResult when result clicked', () => {
    const props = {
      ...baseProps,
      answer: create<Answer>('answer', { questionId: baseProps.question.id }),
    };
    const wrapper = shallow(<QuestionView {...props} />).dive();
    wrapper.find(sel('result')).simulate('click');
    expect(baseProps.onClickResult).toHaveBeenCalled();
  });
});
