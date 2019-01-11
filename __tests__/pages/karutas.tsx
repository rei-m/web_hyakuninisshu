import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Karutas, { Props } from '@src/pages/karutas';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { QueryData } from '@src/components/KarutaImage';
import { Karuta } from '@src/types';
import { setUpQueryOnce } from '@test/helpers';
import { create } from '@test/factories';

describe('/karutas', () => {
  let baseProps: Props;

  beforeEach(() => {
    const karuta = create<Karuta>('karuta', {
      no: 1,
    });

    baseProps = {
      data: {
        allKaruta: {
          edges: [
            {
              node: {
                internal: {
                  content: JSON.stringify(karuta),
                },
              },
            },
          ],
        },
      },
    };

    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'karutas title',
          description: 'karutas description',
          author: '@rei-m',
        },
      },
    });

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
    const renderer = ReactTestRenderer.create(<Karutas {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
