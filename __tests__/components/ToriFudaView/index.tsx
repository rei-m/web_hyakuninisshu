import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { shallow } from 'enzyme';
import ToriFudaView, {
  ToriFudaViewProps
} from '../../../src/components/ToriFudaView';
import { ToriFuda } from '../../../src/types';
import { create } from '../../factories';

describe('<ToriFudaView />', () => {
  let baseProps: ToriFudaViewProps;

  beforeEach(() => {
    baseProps = {
      onClick: jest.fn(),
      toriFuda: create<ToriFuda>('toriFuda')
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
