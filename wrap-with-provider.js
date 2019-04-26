import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from '@src/state';

import { ThemeProvider } from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

import ErrorBoundary from '@src/errors/ErrorBoundary';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <ThemeProvider theme={appTheme}>
  <Provider store={createStore()}>
    <ErrorBoundary>
      {element}
    </ErrorBoundary>
  </Provider>
</ThemeProvider>
