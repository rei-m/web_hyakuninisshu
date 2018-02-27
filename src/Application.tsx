import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './containers/Root';
import TrainignsIndex from './containers/Trainings';
import ExamIndex from './containers/Exam';
import KarutasIndex from './containers/Karutas';
import KarutasShow from './containers/Karutas/Show';
import QuestionsIndex from './containers/Questions';
import ExamMenuSection from './components/ExamMenuSection';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import NotFound from './components/NotFound';
import { ROUTE_PATHS } from './constants';
import { Helmet } from 'react-helmet';

const Application = () => (
  <Root>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Title</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <Switch>
      <Route exact path={ROUTE_PATHS.ROOT} component={MenuSection} />
      <Route exact path={ROUTE_PATHS.TRAINING} component={TrainignsIndex} />
      <Route
        exact
        path={ROUTE_PATHS.TRAINING_QUESTION}
        component={QuestionsIndex}
      />
      <Route exact path={ROUTE_PATHS.EXAM} component={ExamMenuSection} />
      <Route exact path={ROUTE_PATHS.EXAM_QUESTION} component={ExamIndex} />
      <Route exact path={ROUTE_PATHS.KARUTAS} component={KarutasIndex} />
      <Route exact path={ROUTE_PATHS.KARUTAS_ID} component={KarutasShow} />
      <Route exact path={ROUTE_PATHS.ABOUT} component={AboutSection} />
      <Route component={NotFound} />
    </Switch>
  </Root>
);

export default Application;
