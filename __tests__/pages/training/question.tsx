import { Color, Karuta, Kimariji } from '@src/types';
import * as ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import TrainingQuestion, { Props } from '@src/pages/training/question';
import { DefaultSEOQueryData } from '@src/components/SEO';
import * as React from 'react';
import { createStore } from '@src/state';
import { QueryData as QuestionViewQueryData } from '@src/components/QuestionView';
import { QueryData as QuestionResultQueryData } from '@src/components/QuestionResult';
import { setUpQuery, setUpQueryOnce } from '@test/helpers';
import { create } from '@test/factories';

describe('/training/question', () => {
  let baseProps: Props;

  beforeEach(() => {
    const karutas: Karuta[] = Array.from(Array(100).keys()).map(i =>
      create<Karuta>('karuta', {
        color: (i < 20 ? 'blue' : 'pink') as Color,
        id: (i + 1).toString(),
        no: i + 1,
        kimariji: ((i % 5) + 1) as Kimariji,
      })
    );

    baseProps = {
      data: {
        allKaruta: {
          edges: karutas.map(karuta => ({
            node: {
              internal: {
                content: JSON.stringify(karuta),
              },
            },
          })),
        },
      },
    };

    setUpQueryOnce<DefaultSEOQueryData>({
      site: {
        siteMetadata: {
          title: 'training question title',
          description: 'training question description',
          author: '@rei-m',
        },
      },
    });
  });

  describe('when invalid state', () => {
    it('should render component', () => {
      const renderer = ReactTestRenderer.create(
        <Provider store={createStore()}>
          <TrainingQuestion {...baseProps} />
        </Provider>
      );
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  describe('when valid state', () => {
    beforeEach(() => {
      setUpQuery<QuestionViewQueryData & QuestionResultQueryData>({
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
        questionBGImage: {
          publicURL: '/tatami.png',
        },
      });
    });

    it('should render component', () => {
      const location: any = {
        state: {
          submitTime: 1000,
        },
      };
      const props = { ...baseProps, location };
      const renderer = ReactTestRenderer.create(
        <Provider store={createStore()}>
          <TrainingQuestion {...props} />
        </Provider>
      );
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});
