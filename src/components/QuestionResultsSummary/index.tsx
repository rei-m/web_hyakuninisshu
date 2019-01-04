import * as React from 'react';
import styled from '@src/styles/styled-components';

export interface Props {
  title: string;
  value: string;
  style?: React.CSSProperties;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colorThin};
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing1x};
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  border-radius: 4px;
`;

const Title = styled.div`
  text-align: left;
  font-size: 1.2rem;
`;

const Value = styled.div`
  font-size: 2.8rem;
`;

const QuestionResultsSummary: React.FC<Props> = ({ title, value, style }) => (
  <Container style={style}>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </Container>
);

export default QuestionResultsSummary;
