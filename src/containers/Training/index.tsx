import * as React from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Question } from '../../types';
import { GlobalState } from '../../reducers/index';
import TrainingSection from '../../components/TrainingSection';
import TrainingInitializer from '../TrainingInitializer';

export interface TrainingProps {
  started: boolean;
  question?: Question;
}

const mapStateToProps = (
  state: GlobalState,
  props: RouteComponentProps<{}>
): TrainingProps => {
  const { submitTime } = props.location.state;
  const { lastStartedTime, questions } = state.trainings;
  return {
    question: questions[0],
    started: !!lastStartedTime && lastStartedTime > submitTime
  };
};

const isStarted = ({ started }: TrainingProps) => started;

const withStartedCheck = branch<TrainingProps>(
  isStarted,
  component => component,
  _ => TrainingInitializer
);

const hasQuestion = ({ question }: TrainingProps) => !!question;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

export default withRouter(
  connect(mapStateToProps)(
    withStartedCheck(withHasQuestionCheck(TrainingSection))
  )
);
