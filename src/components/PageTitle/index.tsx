import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';

export interface PageTitleProps {
  readonly title: string;
}

const H2 = withAppTheme(styled.h1)`
  padding: ${({ theme }) => theme.spacing2x};
  font-size: 2rem;
`;

const PageTitle = ({ title }: PageTitleProps) => <H2>{title}</H2>;

export default PageTitle;
