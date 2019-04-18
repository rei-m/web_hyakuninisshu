import * as React from 'react';
import styled, { keyframes } from '@src/styles/styled-components';

export interface Props {
  tag?: React.ElementType;
  duration: number;
  className?: string;
  onAnimationEnd?: () => void;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const FadeInFrame: React.FC<Props> = ({ children, tag = 'span', duration, className, onAnimationEnd }) => {
  const Tag = styled(tag)`
    animation: ${fadeIn} ${duration}s linear 1;
  `;
  return (
    <Tag duration={duration} onAnimationEnd={onAnimationEnd} className={className}>
      {children}
    </Tag>
  );
};

export default FadeInFrame;
