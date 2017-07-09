import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './appStore';
import App from './containers/App';

ReactDOM.render(
  <Provider store={getStore()}>
    <App />
  </Provider>,
  document.querySelector('main'),
);
