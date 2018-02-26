import * as React from 'react';
import styled from 'styled-components';

export interface PageTitleProps {
  title: string;
}

const H2 = styled.h1`
  padding: 16px;
  font-size: 2rem;
`;

const PageTitle = ({ title }: PageTitleProps) => <H2>{title}</H2>;

export default PageTitle;
