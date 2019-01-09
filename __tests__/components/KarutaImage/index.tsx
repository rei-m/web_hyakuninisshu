import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { mockStaticQuery } from '@test/helpers';
import KarutaImage from '@src/components/KarutaImage';

describe('<KarutaImage />', () => {
  beforeEach(() => {
    mockStaticQuery.mockImplementationOnce(({ render }) =>
      render({
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
      })
    );
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<KarutaImage karutaNo={1} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
