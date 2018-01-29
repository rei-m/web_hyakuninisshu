import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';
import { getStore } from './appStore';

ReactDOM.render(
  <Provider store={getStore()}>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </Provider>,
  document.querySelector('main'),
);
