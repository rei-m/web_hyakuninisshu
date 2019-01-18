import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import Exam from '@src/pages/exam';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { setUpQueryOnce } from '@test/helpers';

describe('/exam', () => {
  beforeEach(() => {
    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'exam title',
          description: 'exam description',
          author: '@rei-m',
        },
      },
      ogpImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
  });

  it('should render component', () => {
    const renderer = ReactTestRenderer.create(<Exam />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
