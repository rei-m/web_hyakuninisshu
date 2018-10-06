import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ThunkExtra } from '@src/store';
import { GlobalState } from '@src/reducers';
import { startExam, QuestionsActions } from '@src/actions/questions';
import Progress, { ProgressProps } from '@src/components/Progress';

export type ExamInitializerDispatchProps = Pick<ProgressProps, 'onStart'>;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, ThunkExtra, QuestionsActions>
): ExamInitializerDispatchProps => ({
  onStart: () => {
    dispatch(startExam());
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(Progress);
