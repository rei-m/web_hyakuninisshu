import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from '@src/state';

import { ThemeProvider } from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

import { AppContext } from '@src/contexts';
import staticQueries from '@src/hooks/staticQueries';

import ErrorBoundary from '@src/errors/ErrorBoundary';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <ThemeProvider theme={appTheme}>
  <Provider store={createStore()}>
    <AppContext.Provider value={staticQueries}>
      <ErrorBoundary>
        {element}
      </ErrorBoundary>
    </AppContext.Provider>
  </Provider>
</ThemeProvider>
