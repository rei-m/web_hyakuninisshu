import * as React from 'react';
import { lifecycle } from 'recompose';

export interface ProgressDispatchProps {
  onStart: () => void;
}

const Progress = (_props: ProgressDispatchProps) => <div>ろーでぃんぐ</div>;

export default lifecycle<ProgressDispatchProps, {}>({
  componentDidMount() {
    this.props.onStart();
  }
})(Progress);
