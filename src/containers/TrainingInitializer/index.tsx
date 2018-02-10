import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import { startTraining } from '../../actions/trainings';
import Progress, { ProgressDispatchProps } from '../../components/Progress';

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>,
  props: RouteComponentProps<{}>
): ProgressDispatchProps => {
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

export default connect(undefined, mapDispatchToProps)(Progress);
