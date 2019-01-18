import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Karutas, { Props } from '@src/templates/karutas';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { QueryData } from '@src/components/KarutaImage';
import { Karuta } from '@src/types';
import { setUpQueryOnce } from '@test/helpers';
import { create } from '@test/factories';

describe('/karutas/:no', () => {
  let baseProps: Props;

  beforeEach(() => {
    const karuta = create<Karuta>('karuta', {
      no: 1,
    });

    baseProps = {
      pageContext: {
        karuta,
      },
    };

    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'karutas no title',
          description: 'karutas no description',
          author: '@rei-m',
        },
      },
      ogpImage: {
        publicURL: 'http://localhost:8000/app.png',
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
