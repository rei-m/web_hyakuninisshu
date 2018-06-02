import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  it('should render children', () => {
    const renderer = ReactTestRenderer.create(
      <ErrorBoundary>test</ErrorBoundary>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render error', () => {
    const renderer = ReactTestRenderer.create(
      <ErrorBoundary>test</ErrorBoundary>
    );
    renderer.root.instance.setState({ error: new Error('hoge') });
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
