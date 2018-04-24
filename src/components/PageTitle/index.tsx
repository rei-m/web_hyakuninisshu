import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';

export interface PageTitleProps {
  readonly title: string;
}

const H2 = withAppTheme(styled.h1)`
  padding: ${({ theme }) => theme.spacing2x};
  font-size: 2rem;
  margin: 0;
  line-height: 2rem;
`;

const PageTitle: React.SFC<PageTitleProps> = ({ title }) => <H2>{title}</H2>;

export default PageTitle;
