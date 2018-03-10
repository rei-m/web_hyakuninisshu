import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import NotFound from '../../../src/components/NotFound';

describe('<NotFound />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<NotFound />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
