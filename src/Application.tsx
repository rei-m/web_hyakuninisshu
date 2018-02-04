import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExamMenuSection from './components/ExamMenuSection';
import Root from './containers/Root';
import MenuSection from './components/MenuSection';
import TrainingMenuSection from './components/TrainingMenuSection';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={'/'} component={MenuSection} />
      <Route exact path={'/training'} component={TrainingMenuSection} />
      <Route exact path={'/exam'} component={ExamMenuSection} />
    </Switch>
  </Root>
);

export default Application;
