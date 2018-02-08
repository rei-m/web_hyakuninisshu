import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import { startTraining } from '../../actions/trainings';
import TrainingSection, {
  TrainingSectionDispatchProps,
  TrainingSectionOwnProps
} from '../../components/TrainingSection';

const mapStateToProps = (
  state: GlobalState,
  props: RouteComponentProps<{}>
): TrainingSectionOwnProps => {
  console.dir('start: mapStateToProps');
  console.dir(state);
  console.dir(props);
  console.dir('end: mapStateToProps');
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>,
  props: RouteComponentProps<{}>
): TrainingSectionDispatchProps => {
  return {
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainingSection)
);
