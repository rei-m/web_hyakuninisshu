import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Progress, { Props as ProgressProps } from '@src/components/Progress';
import { restartQuestions, QuestionsActions } from '@src/actions/questions';
import { GlobalState } from '@src/state';

export type DispatchProps = Pick<ProgressProps, 'onStart'>;

export type Props = DispatchProps;

const ReviewInitializer = ({ onStart }: Props) => <Progress onStart={onStart} />;

export const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalState, {}, QuestionsActions>): DispatchProps => ({
  onStart: () => {
    dispatch(restartQuestions());
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(ReviewInitializer);
