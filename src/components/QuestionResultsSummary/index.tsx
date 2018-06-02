import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';

export interface QuestionResultsSummaryProps {
  readonly title: string;
  readonly value: string;
  readonly style?: React.CSSProperties;
}

const Root = withAppTheme(styled.div)`
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

const QuestionResultsSummary: React.SFC<QuestionResultsSummaryProps> = ({
  title,
  value,
  style
}) => (
  <Root style={style}>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </Root>
);

export default QuestionResultsSummary;
