import * as React from 'react';
import {
  withRouter,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import * as ReactGA from 'react-ga';
import { lifecycle } from 'recompose';
import Root from './containers/Root';
import TrainignsIndex from './containers/Trainings';
import ExamIndex from './containers/Exam';
import ExamQuestionsIndex from './containers/ExamQuestions';
import KarutasIndex from './containers/Karutas';
import KarutasShow from './containers/Karutas/Show';
import TrainingQuestionsIndex from './containers/TrainingQuestions';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ROUTE_PATHS } from './constants';

const Application = (_props: RouteComponentProps<{}>) => (
  <ErrorBoundary>
    <Root>
      <Switch>
        <Route exact path={ROUTE_PATHS.ROOT} component={MenuSection} />
        <Route exact path={ROUTE_PATHS.TRAINING} component={TrainignsIndex} />
        <Route
          exact
          path={ROUTE_PATHS.TRAINING_QUESTION}
          component={TrainingQuestionsIndex}
        />
        <Route exact path={ROUTE_PATHS.EXAM} component={ExamIndex} />
        <Route
          exact
          path={ROUTE_PATHS.EXAM_QUESTION}
          component={ExamQuestionsIndex}
        />
        <Route exact path={ROUTE_PATHS.KARUTAS} component={KarutasIndex} />
        <Route exact path={ROUTE_PATHS.KARUTAS_ID} component={KarutasShow} />
        <Route exact path={ROUTE_PATHS.ABOUT} component={AboutSection} />
        <Route component={NotFound} />
      </Switch>
    </Root>
  </ErrorBoundary>
);
const Enhanced = lifecycle<RouteComponentProps<{}>, {}>({
  componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }
})(Application);

export default withRouter(Enhanced);
