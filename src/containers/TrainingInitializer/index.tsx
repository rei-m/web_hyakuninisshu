import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '@src/reducers';
import { startTraining } from '@src/actions/questions';
import Progress, { ProgressProps } from '@src/components/Progress';

export type TrainingInitializerOwnProps = RouteComponentProps<{}>;

export type TrainingInitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

export type TrainingInitializerProps = TrainingInitializerOwnProps &
  TrainingInitializerDispatchProps;

const TrainingInitializer = (props: TrainingInitializerProps) => (
  <Progress onStart={props.onStart} />
);

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>,
  props: TrainingInitializerOwnProps
): TrainingInitializerDispatchProps => ({
  onStart: () => {
    const {
      rangeFrom,
      rangeTo,
      kimariji,
      color,
      kamiNoKuStyle,
      shimoNoKuStyle
    } = props.location.state;
    dispatch(
      startTraining(
        rangeFrom,
        rangeTo,
        kimariji,
        color,
        kamiNoKuStyle,
        shimoNoKuStyle
      )
    );
  }
});

export default withRouter(
  connect(undefined, mapDispatchToProps)(TrainingInitializer)
);
