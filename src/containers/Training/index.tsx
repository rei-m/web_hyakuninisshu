import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '../../reducers/index';
import TrainingSection, {
  TrainingSectionDispatchProps,
  TrainingSectionOwnProps,
  TrainingSectionProps
} from '../../components/TrainingSection';
import TrainingInitializer from '../TrainingInitializer';

export interface TrainingProps {
  started: boolean;
  hasQuestion: boolean;
}

const mapStateToProps = (
  state: GlobalState,
  props: RouteComponentProps<{}>
): TrainingSectionOwnProps & TrainingProps => {
  const { submitTime } = props.location.state;
  const { lastStartedTime, questions } = state.trainings;
  return {
    hasQuestion: questions.length > 0,
    question: questions[0],
    started: !!lastStartedTime && lastStartedTime > submitTime
  };
};

const mapDispatchToProps = (
  _dispatch: Dispatch<GlobalState>
): TrainingSectionDispatchProps => {
  return {
    onClickToriFuda: (karutaId: number) => {
      console.dir(karutaId);
    }
  };
};

const isStarted = ({ started }: TrainingProps) => started;

const withStartedCheck = branch<TrainingSectionProps & TrainingProps>(
  isStarted,
  component => component,
  _ => TrainingInitializer
);

const hasQuestion = (props: TrainingProps) => props.hasQuestion;

const EmptyMessage = () => <h3>指定した条件の歌はありませんでした</h3>;

const withHasQuestionCheck = branch<TrainingSectionProps & TrainingProps>(
  hasQuestion,
  component => component,
  renderComponent(EmptyMessage)
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStartedCheck(withHasQuestionCheck(TrainingSection))
  )
);
