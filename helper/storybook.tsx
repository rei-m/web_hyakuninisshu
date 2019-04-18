import * as React from 'react';
import { RenderFunction } from '@storybook/react';
import { AppContext, AppContextType } from '@src/contexts';
import * as karutaImage from '@src/images/karuta_001.jpg';
import * as tatamiImage from '@src/images/tatami_part.png';
import * as correctImage from '@src/images/check_correct.png';
import * as incorrectImage from '@src/images/check_incorrect.png';
import * as iconImage from '@src/images/app-icon.png';
import * as dogezaImage from '@src/images/dogeza_businessman.png';

export const dummyAppContext: AppContextType = {
  useKarutaImage: (_karutaNo: number) => ({
    aspectRatio: 0.7228915662650602,
    srcSet: '',
    sizes: '(max-width: 200px) 100vw, 200px',
    src: karutaImage,
  }),
  useTatamiImage: () => tatamiImage,
  useCorrectImage: () => [
    {
      aspectRatio: 0.7228915662650602,
      srcSet: '',
      sizes: '(max-width: 300px) 100vw, 200px',
      src: correctImage,
    },
    {
      aspectRatio: 0.7228915662650602,
      srcSet: '',
      sizes: '(max-width: 300px) 100vw, 200px',
      src: incorrectImage,
    },
  ],
  useSEO: () => ({
    site: {
      siteMetadata: {
        title: '百人一首 簡単に暗記',
        description: '説明',
        author: 'rei-m',
      },
    },
    ogpImage: {
      publicURL: iconImage,
    },
  }),
  useDogezaImage: () => ({
    aspectRatio: 0.7228915662650602,
    srcSet: '',
    sizes: '(max-width: 200px) 200px, 200px',
    src: dogezaImage,
  }),
};

export const appContextDecorator = (story: RenderFunction, context = dummyAppContext) => (
  <AppContext.Provider value={context}>{story()}</AppContext.Provider>
);
