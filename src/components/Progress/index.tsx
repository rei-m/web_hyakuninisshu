import * as React from 'react';
import { lifecycle } from 'recompose';

export interface ProgressProps {
  onStart: () => void;
}

const Progress = (_props: ProgressProps) => <div>ろーでぃんぐ</div>;

export default lifecycle<ProgressProps, {}>({
  componentDidMount() {
    this.props.onStart();
  }
})(Progress);
