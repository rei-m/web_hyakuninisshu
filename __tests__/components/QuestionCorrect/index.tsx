import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import { sel, setUpQueryOnce } from '@test/helpers';
import QuestionCorrect, { Props, QueryData as QuestionCorrectQueryData } from '@src/components/QuestionCorrect';
import { Karuta } from '@src/types';

describe('<QuestionCorrect />', () => {
  let baseProps: Props;

  beforeEach(() => {
    setUpQueryOnce<QuestionCorrectQueryData>({
      questionCorrectBGImage: {
        publicURL: '/tatami.png',
      },
    });

    baseProps = {
      isAllAnswered: false,
      karuta: create<Karuta>('karuta', {
        no: 1,
      }),
      onClickGoToNext: jest.fn(),
      onClickGoToResult: jest.fn(),
    };
  });

  it('should render component when not finished', () => {
    const renderer = ReactTestRenderer.create(<QuestionCorrect {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when finished', () => {
    const props = { ...baseProps, isAllAnswered: true };
    const renderer = ReactTestRenderer.create(<QuestionCorrect {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickGoToNext when next clicked', () => {
    const wrapper = shallow(<QuestionCorrect {...baseProps} />)
      .dive()
      .dive();
    wrapper.find(sel('go-to-next')).simulate('click');
    expect(baseProps.onClickGoToNext).toHaveBeenCalled();
  });

  it('should fire onClickGoToResult when next clicked', () => {
    const props = { ...baseProps, isAllAnswered: true };
    const wrapper = shallow(<QuestionCorrect {...props} />)
      .dive()
      .dive();
    wrapper.find(sel('go-to-result')).simulate('click');
    expect(baseProps.onClickGoToResult).toHaveBeenCalled();
  });

  it('should set state when OpenDetail clicked', () => {
    const wrapper = shallow(<QuestionCorrect {...baseProps} />);
    expect(wrapper.state()).toEqual({ stateValue: false });
    wrapper
      .dive()
      .dive()
      .find(sel('open-detail'))
      .simulate('click');
    expect(wrapper.state()).toEqual({ stateValue: true });
  });
});
