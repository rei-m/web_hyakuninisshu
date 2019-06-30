import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from '@src/state';

import AppThemeProvider from '@src/contexts/AppThemeProvider';

import ErrorBoundary from '@src/errors/ErrorBoundary';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <AppThemeProvider>
  <Provider store={createStore()}>
    <ErrorBoundary>
      {element}
    </ErrorBoundary>
  </Provider>
</AppThemeProvider>
