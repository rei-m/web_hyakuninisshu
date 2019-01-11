import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import NotFound from '@src/pages/404';
import { setUpQueryOnce } from '@test/helpers';
import { QueryData } from '@src/components/Dogeza';

describe('/404', () => {
  beforeEach(() => {
    setUpQueryOnce<QueryData>({
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
    });
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<NotFound />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
