import * as ReactTestRenderer from 'react-test-renderer';
import * as React from 'react';
import { Provider } from 'react-redux';
import TrainingResult, { QueryData as PageQueryData } from '@src/pages/training/result';
import { DefaultSEOQueryData } from '@src/components/atoms/SEO';
import { createStore } from '@src/state';
import { setUpQueryOnce } from '@test/helpers';
import { QuestionState } from '@src/enums';

describe('/training/result', () => {
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
      trainingResultBGImage: {
        publicURL: 'http://localhost:8000/app.png',
      },
    });
  });

  it('should render component', () => {
    const store = createStore();
    const questions = store.getState().questions;
    store.getState().questions = { ...questions, questionState: QuestionState.Finished };

    const renderer = ReactTestRenderer.create(
      <Provider store={store}>
        <TrainingResult />
      </Provider>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
