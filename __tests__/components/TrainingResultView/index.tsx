import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import TrainingResultView, { Props } from '@src/components/TrainingResultView';
import { sel } from '@test/helpers';

describe('<TrainingResultView />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      averageAnswerSecond: 2.5,
      correctCount: 8,
      onClickRestart: jest.fn(),
      totalCount: 10,
    };
  });

  it('should render component when has wrong', () => {
    const renderer = ReactTestRenderer.create(<TrainingResultView {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when has not wrong', () => {
    const props = { ...baseProps, correctCount: 10 };
    const renderer = ReactTestRenderer.create(<TrainingResultView {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRestart when restart clicked', () => {
    const wrapper = shallow(<TrainingResultView {...baseProps} />).dive();
    wrapper.find(sel('restart')).simulate('click');
    expect(baseProps.onClickRestart).toHaveBeenCalled();
  });
});
