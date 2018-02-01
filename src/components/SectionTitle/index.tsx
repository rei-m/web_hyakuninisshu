import * as React from 'react';
import styled from 'styled-components';

export interface SectionTitleProps {
  title: string;
}

const H2 = styled.h2`
  margin: 16px;
  font-size: 2rem;
`;

const SectionTitle = (props: SectionTitleProps) => <H2>{props.title}</H2>;

export default SectionTitle;
