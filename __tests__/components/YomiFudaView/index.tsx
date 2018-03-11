import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import YomiFudaView, {
  YomiFudaViewProps
} from '../../../src/components/YomiFudaView';
import { YomiFuda } from '../../../src/types';
import { create } from '../../factories';

describe('<YomiFudaView />', () => {
  it('should render component', () => {
    const props: YomiFudaViewProps = {
      yomiFuda: create<YomiFuda>('yomiFuda')
    };
    const renderer = ReactTestRenderer.create(<YomiFudaView {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
