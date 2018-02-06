import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import { startTraining } from '../../actions/TrainingActionCreators';
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
      console.dir('start: mapDispatchToProps');
      console.dir(props);
      dispatch(startTraining());
      console.dir('end: mapDispatchToProps');
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainingSection)
);
