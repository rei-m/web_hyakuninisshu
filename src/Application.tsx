import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuSection from './components/MenuSection';
import Root from './containers/Root';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={'/'} component={MenuSection} />
    </Switch>
  </Root>
);

export default Application;
