import * as React from 'react';
import styled from '@src/styles/styled-components';

export interface Props {
  text: string;
}

const Container = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  font-size: 1.6rem;
`;

const ErrorMessage: React.FC<Props> = ({ text }) => (
  <Container>
    <Message>{text}</Message>
  </Container>
);

export default ErrorMessage;
