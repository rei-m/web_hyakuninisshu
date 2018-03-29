import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import QuestionsResult, {
  QuestionsResultProps
} from '../../../src/components/QuestionsResult';
import { sel } from '../../helpers';

describe('<QuestionsResult />', () => {
  let baseProps: QuestionsResultProps;

  beforeEach(() => {
    baseProps = {
      averageAnswerSecond: 2.5,
      correctCount: 8,
      onClickRestart: jest.fn(),
      totalCount: 10
    };
  });

  it('should render component when has wrong', () => {
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <QuestionsResult {...baseProps} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when has not wrong', () => {
    const props = { ...baseProps, correctCount: 10 };
    const renderer = ReactTestRenderer.create(
      <MemoryRouter>
        <QuestionsResult {...props} />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickRestart when restart clicked', () => {
    const wrapper = shallow(<QuestionsResult {...baseProps} />);
    wrapper.find(sel('restart')).simulate('click');
    expect(baseProps.onClickRestart).toHaveBeenCalled();
  });
});
