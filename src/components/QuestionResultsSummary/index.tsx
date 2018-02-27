import * as React from 'react';
import styled from 'styled-components';

export interface QuestionResultsSummaryProps {
  readonly title: string;
  readonly value: string;
  readonly style?: React.CSSProperties;
}

const Root = styled.div`
  background-color: #fffff0;
  box-sizing: border-box;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  border-radius: 4px;
`;

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
  <Root style={style}>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </Root>
);

export default QuestionResultsSummary;
