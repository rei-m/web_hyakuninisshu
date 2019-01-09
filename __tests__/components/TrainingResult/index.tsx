import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import TrainingResult, { Props } from '@src/components/TrainingResult';
import { mockStaticQuery, sel } from '@test/helpers';

describe('<TrainingResult />', () => {
  let baseProps: Props;

  beforeEach(() => {
    mockStaticQuery.mockImplementationOnce(({ render }) =>
      render({
        trainingResultBGImage: {
          publicURL: '/tatami.jpg',
        },
      })
    );
    baseProps = {
      averageAnswerSecond: 2.5,
      correctCount: 8,
      onClickRestart: jest.fn(),
      totalCount: 10,
    };
  });

  it('should render component when has wrong', () => {
    const renderer = ReactTestRenderer.create(<TrainingResult {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when has not wrong', () => {
    const props = { ...baseProps, correctCount: 10 };
    const renderer = ReactTestRenderer.create(<TrainingResult {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRestart when restart clicked', () => {
    const wrapper = shallow(<TrainingResult {...baseProps} />).dive();
    wrapper.find(sel('restart')).simulate('click');
    expect(baseProps.onClickRestart).toHaveBeenCalled();
  });
});
