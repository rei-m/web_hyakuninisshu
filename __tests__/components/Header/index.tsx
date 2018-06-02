import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { sel } from '../../helpers';
import Header, { HeaderProps } from '@src/components/Header';

describe('<Header />', () => {
  let baseProps: HeaderProps;

  beforeEach(() => {
    baseProps = {
      canBack: false,
      onClickBack: jest.fn(),
      subTitle: 'This is subtitle'
    };
  });

  it('should render component when can not back', () => {
    const renderer = ReactTestRenderer.create(<Header {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when can back', () => {
    const props = { ...baseProps, canBack: true };
    const renderer = ReactTestRenderer.create(<Header {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickBack when back clicked', () => {
    const props = { ...baseProps, canBack: true };
    const wrapper = shallow(<Header {...props} />);
    wrapper.find(sel('back')).simulate('click');
    expect(baseProps.onClickBack).toHaveBeenCalled();
  });
});
