import * as React from 'react';
import { lifecycle } from 'recompose';
import { Classes, Spinner } from '@blueprintjs/core';
import styled from '@src/styles/styled-components';

export interface Props {
  onStart: () => void;
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffff050;
  flex-direction: column;
  height: 100vh;
  position: fiexd;
`;

const Message = styled.div`
  margin-top: 16px;
  font-size: 2rem;
`;

const Progress: React.FC<Props> = () => (
  <Container>
    <Spinner className={Classes.LARGE} />
    <Message>　　　百人一首 準備中。。。</Message>
  </Container>
);

export default lifecycle<Props, {}>({
  componentDidMount() {
    this.props.onStart();
  },
})(Progress);
