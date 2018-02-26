import * as React from 'react';
import styled from 'styled-components';
import { Classes, Spinner } from '@blueprintjs/core';
import { lifecycle } from 'recompose';

export interface ProgressProps {
  onStart: () => void;
}

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffff0;
  flex-direction: column;
`;

const Message = styled.div`
  margin-top: 16px;
  font-size: 2rem;
`;

const Progress = (_props: ProgressProps) => (
  <Root>
    <Spinner className={Classes.LARGE} />
    <Message>　　　百人一首 準備中。。。</Message>
  </Root>
);

export default lifecycle<ProgressProps, {}>({
  componentDidMount() {
    this.props.onStart();
  }
})(Progress);
