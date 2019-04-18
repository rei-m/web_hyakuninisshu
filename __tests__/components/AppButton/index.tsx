import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import AppButton, { Props } from '@src/components/atoms/Button';

describe('<AppButton />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      label: 'Test',
      type: 'primary',
    };
  });

  it('should render component when primary', () => {
    const renderer = ReactTestRenderer.create(<AppButton {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when normal', () => {
    const props: Props = { ...baseProps, type: 'normal' };
    const renderer = ReactTestRenderer.create(<AppButton {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClick when clicked', () => {
    const props: Props = { ...baseProps, onClick: jest.fn() };
    shallow(<AppButton {...props} />).simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
