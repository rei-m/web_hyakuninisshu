import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { Provider } from 'react-redux';
import ExamResult, { QueryData as PageQueryData } from '@src/pages/exam/result';
import { DefaultSEOQueryData } from '@src/components/SEO';
import { QueryData as QuestionResultsMapQueryData } from '@src/components/QuestionResultsMap';
import { createStore } from '@src/state';
import { setUpQuery, setUpQueryOnce } from '@test/helpers';
import { QuestionState } from '@src/enums';

describe('/exam/result', () => {
  beforeEach(() => {
    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'exam result title',
          description: 'exam resul description',
          author: '@rei-m',
        },
      },
      ogpImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
    setUpQueryOnce<PageQueryData>({
      examResultBGImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
    setUpQuery<QuestionResultsMapQueryData>({
      correctImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `correct-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
      incorrectImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `incorrect-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
    });
  });

  it('should render component', () => {
    const store = createStore();
    const questions = store.getState().questions;
    store.getState().questions = { ...questions, questionState: QuestionState.Finished };

    const renderer = ReactTestRenderer.create(
      <Provider store={store}>
        <ExamResult />
      </Provider>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
