import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { setUpQueryOnce } from '@test/helpers';
import KarutaImage, { QueryData } from '@src/components/KarutaImage';

describe('<KarutaImage />', () => {
  beforeEach(() => {
    setUpQueryOnce<QueryData>({
      karutaImages: {
        edges: [
          {
            node: {
              childImageSharp: {
                fluid: {
                  aspectRatio: 1,
                  sizes: `100 200 300`,
                  src: `karuta_001.jpg`,
                  srcSet: `asdfasdf`,
                },
              },
            },
          },
        ],
      },
    });
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaImage karutaNo={1} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
