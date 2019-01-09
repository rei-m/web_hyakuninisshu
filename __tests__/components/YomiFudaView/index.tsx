import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { create } from '@test/factories';
import YomiFudaView, { Props } from '@src/components/YomiFudaView';
import { YomiFuda } from '@src/types';

describe('<YomiFudaView />', () => {
  it('should render component', () => {
    const props: Props = {
      yomiFuda: create<YomiFuda>('yomiFuda'),
    };
    const renderer = ReactTestRenderer.create(<YomiFudaView {...props} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
