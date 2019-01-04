import * as React from 'react';
import styled from '@src/styles/styled-components';

export interface Props {
  title: string;
}

const Title = styled.h1`
  padding: ${({ theme }) => theme.spacing2x};
  font-size: 2rem;
  margin: 0;
  line-height: 2rem;
`;

const PageTitle: React.FC<Props> = ({ title }) => <Title>{title}</Title>;

export default PageTitle;
