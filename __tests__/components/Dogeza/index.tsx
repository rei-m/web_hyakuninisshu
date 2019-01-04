import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { StaticQuery } from 'gatsby';
import Dogeza from '@src/components/Dogeza';

describe('<Dogeza />', () => {
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

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Dogeza alt="test" />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
