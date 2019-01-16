import * as React from 'react';
import styled, { keyframes } from '@src/styles/styled-components';

export const SPACE = '　';

export interface Props {
  word: string;
  onAnimationEnd: () => void;
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

const Word = styled.span`
  animation: ${fadeIn} 0.6s linear 1;
`;

const YomiFudaWord: React.FC<Props> = ({ word, onAnimationEnd }) =>
  word === SPACE ? <span>{word}</span> : <Word onAnimationEnd={onAnimationEnd}>{word}</Word>;

export default YomiFudaWord;
