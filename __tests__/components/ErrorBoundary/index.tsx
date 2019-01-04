import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { StaticQuery } from 'gatsby';
import ErrorBoundary from '@src/components/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  beforeEach(() => {
    const mockStaticQuery: jest.Mock<StaticQuery> = StaticQuery as jest.Mock<StaticQuery>;
    mockStaticQuery.mockImplementationOnce(({ render }) =>
      render({
        dogezaImage: {
          childImageSharp: {
            fluid: {
              aspectRatio: 1,
              sizes: `100 200 300`,
              src: `dogeza-base64-encoded-image`,
              srcSet: `asdfasdf`,
            },
          },
        },
      })
    );
  });

  it('should render children', () => {
    const renderer = ReactTestRenderer.create(<ErrorBoundary>test</ErrorBoundary>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render error', () => {
    const renderer = ReactTestRenderer.create(<ErrorBoundary>test</ErrorBoundary>);
    renderer.root.instance.setState({ error: new Error('hoge') });
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
