import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './containers/Root';
import TrainingIndex from './containers/Training';
import ExamIndex from './containers/Exam';
import KarutasIndex from './containers/Karutas';
import KarutasShow from './containers/Karutas/Show';
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
      <Route exact path={'/exam/question'} component={ExamIndex} />
      <Route exact path={'/karutas'} component={KarutasIndex} />
      <Route exact path={'/karutas/:id'} component={KarutasShow} />
    </Switch>
  </Root>
);

export default Application;
