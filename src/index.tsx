import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getStore } from './appStore';
import Application from './Application';

ReactDOM.render(
  <Provider store={getStore()}>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </Provider>,
  document.querySelector('main'),
);
