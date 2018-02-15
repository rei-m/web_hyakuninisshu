import * as React from 'react';
import styled from 'styled-components';

export interface QuestionResultsSummaryProps {
  readonly title: string;
  readonly value: string;
  readonly style?: React.CSSProperties;
}

const Title = styled.div`
  text-align: left;
  font-size: 1.2rem;
`;

const Value = styled.div`
  font-size: 2.8rem;
`;

const QuestionResultsSummary = ({
  title,
  value,
  style
}: QuestionResultsSummaryProps) => (
  <div style={style}>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </div>
);

export default QuestionResultsSummary;
