import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { create } from '../../factories';
import KarutaDetailSection from '@src/components/KarutaDetailSection';
import { Karuta } from '@src/types';

describe('<KarutaDetailSection />', () => {
  it('should render component', () => {
    const karuta = create<Karuta>('karuta', { id: 1 });
    const renderer = ReactTestRenderer.create(
      <KarutaDetailSection karuta={karuta} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
