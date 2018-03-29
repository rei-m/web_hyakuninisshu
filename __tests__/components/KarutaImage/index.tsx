import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import KarutaImage from '../../../src/components/KarutaImage';

describe('<KarutaImage />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaImage karutaId={1} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
