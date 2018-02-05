import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './containers/Root';
import ExamMenuSection from './components/ExamMenuSection';
import MenuSection from './components/MenuSection';
import TrainingMenuSection from './components/TrainingMenuSection';
import TrainingSection from './components/TrainingSection';

const Application = () => (
  <Root>
    <Switch>
      <Route exact path={'/'} component={MenuSection} />
      <Route exact path={'/training'} component={TrainingMenuSection} />
      <Route exact path={'/training/question'} component={TrainingSection} />
      <Route exact path={'/exam'} component={ExamMenuSection} />
    </Switch>
  </Root>
);

export default Application;
