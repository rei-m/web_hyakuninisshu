import * as React from 'react';
import styled from '@src/styles/styled-components';
import { Props as HeadingProps } from '@src/components/atoms/Heading';

export interface Props {
  heading: React.ReactElement<HeadingProps>;
  className?: string;
  onClick?: () => void;
}

const Container = styled.section`
  ${({ onClick }) => (onClick ? 'cursor: pointer;' : '')}
`;

const Section: React.FC<Props> = ({ children, heading, className, onClick }) => (
  <Container className={className} onClick={onClick}>
    {heading}
    {children}
  </Container>
);

export default Section;
