import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Application from '@src/Application';
import { getStore } from '@src/store';
import { appTheme } from '@src/styles';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-46787228-6');
} else {
  console.dir('Looks like we are in development mode!');
}

ReactDOM.render(
  <Provider store={getStore()}>
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <Application />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('main')
);
