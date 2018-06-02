import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '@src/reducers';
import { startExam } from '@src/actions/questions';
import Progress, { ProgressProps } from '@src/components/Progress';

export type ExamInitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalState>
): ExamInitializerDispatchProps => ({
  onStart: () => {
    dispatch(startExam());
  }
});

export default connect(undefined, mapDispatchToProps)(Progress);
