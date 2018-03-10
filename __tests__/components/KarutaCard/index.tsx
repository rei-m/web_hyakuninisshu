import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import KarutaCard from '../../../src/components/KarutaCard';
import { Karuta } from '../../../src/types';
import { create } from '../../factories';

describe('<KarutaCard />', () => {
  it('should render component when kimariji is short', () => {
    const karuta = create<Karuta>('karuta', { id: 1, kimariji: 2 });
    const renderer = ReactTestRenderer.create(<KarutaCard karuta={karuta} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render component when kimariji is long', () => {
    const karuta = create<Karuta>('karuta', { id: 1, kimariji: 6 });
    const renderer = ReactTestRenderer.create(<KarutaCard karuta={karuta} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
