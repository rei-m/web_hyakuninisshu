import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { startExam } from '../../actions/questions';
import Progress, { ProgressDispatchProps } from '../../components/Progress';

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): ProgressDispatchProps => {
  return {
    onStart: () => {
      dispatch(startExam());
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Progress);
