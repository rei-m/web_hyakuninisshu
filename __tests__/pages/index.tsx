import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Index, { Props } from '@src/pages';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { setUpQueryOnce } from '@test/helpers';

describe('/', () => {
  let baseProps: Props;

  beforeEach(() => {
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
      },
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Index {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
