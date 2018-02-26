import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import { startTraining } from '../../actions/questions';
import Progress, { ProgressProps } from '../../components/Progress';

export type TrainingInitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>,
  props: RouteComponentProps<{}>
): TrainingInitializerDispatchProps => {
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
