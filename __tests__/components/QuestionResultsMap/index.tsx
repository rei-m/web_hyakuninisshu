import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { mockStaticQuery, sel } from '@test/helpers';
import QuestionResultsMap, { Props } from '@src/components/QuestionResultsMap';
import { Answer, Question } from '@src/types';

describe('<QuestionResultsMap />', () => {
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
      })
    );

    const questions = [create<Question>('question'), create<Question>('question')];

    const answers = [
      create<Answer>('answer', {
        questionId: questions[0].id,
      }),
      create<Answer>('answer', {
        questionId: questions[1].id,
      }),
    ];

    baseProps = {
      answers,
      onClickResult: jest.fn(),
      questions,
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<QuestionResultsMap {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickResult when result clicked', () => {
    const wrapper = shallow(<QuestionResultsMap {...baseProps} />).dive();
    wrapper.find(sel(`question-${baseProps.questions[0].id}`)).simulate('click');
    expect(baseProps.onClickResult).toHaveBeenCalledWith(baseProps.questions[0].correctKaruta);
  });
});
