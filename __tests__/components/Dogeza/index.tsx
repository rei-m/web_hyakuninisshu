import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Dogeza from '@src/components/Dogeza';

describe('<Dogeza />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Dogeza alt="test" />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
