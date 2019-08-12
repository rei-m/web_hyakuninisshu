import React from 'react';
import styled from '@src/styles/styled-components';
import { Props as HeadingProps } from '@src/components/atoms/Heading';

export interface Props {
  heading: React.ReactElement<HeadingProps>;
  className?: string;
  onClick?: () => void;
}

const Container = styled.article(({ onClick }) => ({
  cursor: onClick ? 'pointer' : '',
}));

const Article: React.FC<Props> = ({ children, heading, className = '', onClick }) => (
  <Container className={className} onClick={onClick}>
    {heading}
    {children}
  </Container>
);

export default Article;
