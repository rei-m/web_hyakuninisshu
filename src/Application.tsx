import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './containers/Root';
import TrainingIndex from './containers/Training';
import ExamMenuSection from './components/ExamMenuSection';
import MenuSection from './components/MenuSection';
import TrainingMenuSection from './components/TrainingMenuSection';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={'/'} component={MenuSection} />
      <Route exact path={'/training'} component={TrainingMenuSection} />
      <Route exact path={'/training/question'} component={TrainingIndex} />
      <Route exact path={'/exam'} component={ExamMenuSection} />
    </Switch>
  </Root>
);

export default Application;
