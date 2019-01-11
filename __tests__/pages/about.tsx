import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import About, { Props } from '@src/pages/about';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { setUpQueryOnce } from '@test/helpers';

describe('/about', () => {
  let baseProps: Props;

  beforeEach(() => {
    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'about title',
          description: 'about description',
          author: '@rei-m',
        },
      },
    });
    baseProps = {
      data: {
        site: {
          siteMetadata: {
            description: 'about description',
          },
        },
      },
    };
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<About {...baseProps} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
