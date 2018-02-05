import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const TrainingSection = (props: RouteComponentProps<{}>) => {
  console.dir(props);
  // props.location.stateにパラメータが渡ってくる
  return <div>hoge</div>;
};

export default withRouter(TrainingSection);
