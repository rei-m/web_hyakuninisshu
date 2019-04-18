import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { sel } from '@test/helpers';
import Header, { Props } from '@src/components/organisms/Header';

describe('<Header />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      title: 'This is title',
    };
  });

  it('should render component when can not back', () => {
    const renderer = ReactTestRenderer.create(<Header {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when can back', () => {
    const props = { ...baseProps, onClickBack: jest.fn() };
    const renderer = ReactTestRenderer.create(<Header {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when can search', () => {
    const props = { ...baseProps, onClickSearch: jest.fn() };
    const renderer = ReactTestRenderer.create(<Header {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClickBack when back clicked', () => {
    const props = { ...baseProps, onClickBack: jest.fn() };
    const wrapper = shallow(<Header {...props} />);
    wrapper.find(sel('back')).simulate('click');
    expect(props.onClickBack).toHaveBeenCalled();
  });

  it('should fire onClickSearch when back clicked', () => {
    const props = { ...baseProps, onClickSearch: jest.fn() };
    const wrapper = shallow(<Header {...props} />);
    wrapper.find(sel('search')).simulate('click');
    expect(props.onClickSearch).toHaveBeenCalled();
  });
});
