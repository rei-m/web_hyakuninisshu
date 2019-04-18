import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from '@test/factories';
import ToriFudaView, { Props } from '@src/components/molecules/ToriFuda';
import { ToriFuda } from '@src/types';

describe('<ToriFudaView />', () => {
  let baseProps: Props;

  beforeEach(() => {
    baseProps = {
      onClick: jest.fn(),
      toriFuda: create<ToriFuda>('toriFuda'),
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<ToriFudaView {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should fire onClick when component clicked', () => {
    const wrapper = shallow(<ToriFudaView {...baseProps} />);
    wrapper.simulate('click');
    expect(baseProps.onClick).toHaveBeenCalledWith(baseProps.toriFuda);
  });
});
