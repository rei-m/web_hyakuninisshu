import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { startExam } from '../../actions/questions';
import Progress, { ProgressProps } from '../../components/Progress';

export type ExamInitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): ExamInitializerDispatchProps => {
  return {
    onStart: () => {
      dispatch(startExam());
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Progress);
