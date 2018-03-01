import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../css/style.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Application from './Application';
import { getStore } from './store';
import { theme } from './styles';

ReactDOM.render(
  <Provider store={getStore()}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('main')
);
