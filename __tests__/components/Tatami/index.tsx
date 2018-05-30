import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Tatami from '@src/components/Tatami';

describe('<Tatami />', () => {
  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Tatami>test</Tatami>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
