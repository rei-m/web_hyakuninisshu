import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Progress from '../../../src/components/Progress';

describe('<Progress />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Progress onStart={jest.fn()} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
