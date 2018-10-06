import * as React from 'react';
import {
  withRouter,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import * as ReactGA from 'react-ga';
import { lifecycle } from 'recompose';
import Root from '@src/containers/Root';
import TrainignsIndex from '@src/containers/Trainings';
import ExamIndex from '@src/containers/Exam';
import ExamQuestionsIndex from '@src/containers/ExamQuestions';
import KarutasIndex from '@src/containers/Karutas';
import KarutasShow from '@src/containers/Karutas/Show';
import TrainingQuestionsIndex from '@src/containers/TrainingQuestions';
import MenuSection from '@src/components/MenuSection';
import AboutSection from '@src/components/AboutSection';
import NotFound from '@src/components/NotFound';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { ROUTE_PATHS } from '@src/constants';

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
      window.scrollTo(0, 0);
      if (process.env.NODE_ENV === 'production') {
        ReactGA.pageview(location.pathname + location.search);
      } else {
        console.dir(`page move to ${location.pathname + location.search}`);
      }
    }
  }
})(Application);

export default withRouter(Enhanced);
