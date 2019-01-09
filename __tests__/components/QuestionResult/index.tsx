import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { mockStaticQuery } from '@test/helpers';
import QuestionResult, { Props } from '@src/components/QuestionResult';
import { Answer } from '@src/types';

describe('<QuestionResult />', () => {
  let baseProps: Props;

  beforeEach(() => {
    mockStaticQuery.mockImplementationOnce(({ render }) =>
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
      })
    );
    baseProps = {
      answer: create<Answer>('answer'),
      onClick: jest.fn(),
    };
  });

  it('should render component when answer is correct', () => {
    const props = {
      ...baseProps,
      answer: { ...baseProps.answer, correct: true },
    };
    const renderer = ReactTestRenderer.create(<QuestionResult {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when answer is wrong', () => {
    const props = {
      ...baseProps,
      answer: { ...baseProps.answer, correct: false },
    };
    const renderer = ReactTestRenderer.create(<QuestionResult {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClick when component clicked', () => {
    const wrapper = shallow(<QuestionResult {...baseProps} />).dive();
    wrapper.simulate('click');
    expect(baseProps.onClick).toHaveBeenCalled();
  });
});
