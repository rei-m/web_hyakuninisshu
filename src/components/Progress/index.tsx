import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

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

const Progress: React.FC<Props> = ({ onStart }) => {
  React.useEffect(onStart);

  return (
    <Container>
      <CircularProgress style={{ color: appTheme.colorPrimaryDark, width: 64, height: 64 }} />
      <Message>　　　百人一首 準備中。。。</Message>
    </Container>
  );
};

export default Progress;
