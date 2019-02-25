import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Index, { Props } from '@src/pages';
import { DefaultSEOQueryData } from '@src/components/atoms/SEO';
import { Karuta } from '@src/types';
import { setUpQueryOnce } from '@test/helpers';
import { create } from '@test/factories';

describe('/', () => {
  let baseProps: Props;

  beforeEach(() => {
    const karuta = create<Karuta>('karuta', {
      no: 1,
    });

    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'index title',
          description: 'index description',
          author: '@rei-m',
        },
      },
      ogpImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
    baseProps = {
      data: {
        site: {
          siteMetadata: {
            title: 'index title',
            description: 'index description',
          },
        },
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
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Index {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
