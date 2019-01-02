import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Progress, { Props as ProgressProps } from '@src/components/Progress';
import { startExam, QuestionsActions } from '@src/actions/questions';
import { Karuta } from '@src/types';
import { GlobalState } from '@src/state';

export interface OwnProps {
  karutas: Karuta[];
}

export type DispatchProps = Pick<ProgressProps, 'onStart'>;

export type Props = OwnProps & DispatchProps;

const ExamInitializer = ({ onStart }: Props) => <Progress onStart={onStart} />;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<GlobalState, {}, QuestionsActions>,
  { karutas }: OwnProps
): DispatchProps => ({
  onStart: () => {
    dispatch(startExam(karutas));
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(ExamInitializer);
