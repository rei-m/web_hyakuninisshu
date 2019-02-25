import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { Provider } from 'react-redux';
import Training from '@src/pages/training';
import { DefaultSEOQueryData } from '@src/components/atoms/SEO';
import { createStore } from '@src/state';
import { setUpQueryOnce } from '@test/helpers';

describe('/training', () => {
  beforeEach(() => {
    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'training title',
          description: 'training description',
          author: '@rei-m',
        },
      },
      ogpImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(
      <Provider store={createStore()}>
        <Training />
      </Provider>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
