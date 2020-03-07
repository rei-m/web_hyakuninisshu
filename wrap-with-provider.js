import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from '@src/state';

import AppThemeProvider from '@src/presentation/contexts/AppThemeProvider';
import DiContainerProvider from '@src/presentation/contexts/DiContainerProvider';

import ErrorBoundary from '@src/presentation/components/pages/ErrorBoundary';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => 
  <DiContainerProvider>
    <Provider store={createStore()}>
      <AppThemeProvider>
        <ErrorBoundary>
          {element}
        </ErrorBoundary>
      </AppThemeProvider>
    </Provider>
  </DiContainerProvider>
