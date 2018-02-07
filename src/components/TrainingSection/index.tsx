import * as React from 'react';
import { lifecycle } from 'recompose';

export interface TrainingSectionOwnProps {
  test?: string;
}

export interface TrainingSectionDispatchProps {
  onStart: () => void;
}

export type TrainingSectionProps = TrainingSectionOwnProps &
  TrainingSectionDispatchProps;

const TrainingSection = (props: TrainingSectionProps) => {
  console.dir(props);
  // props.location.stateにパラメータが渡ってくる
  return <div>hoge</div>;
};

export default lifecycle<TrainingSectionProps, {}>({
  componentDidMount() {
    this.props.onStart();
  }
})(TrainingSection);
