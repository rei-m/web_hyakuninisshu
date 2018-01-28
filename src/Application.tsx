import * as React from 'react';
import { Route, Switch } from 'react-router';
import Root from './containers/Root';
import MenuSection from './components//MenuSection';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={'/'} component={MenuSection} />
    </Switch>
  </Root>
);

export default Application;
