import * as React from 'react';
import styled, { keyframes } from '@src/styles/styled-components';

export const SPACE = '　';

export interface Props {
  word: string;
  dulation: number;
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

const Word = styled.span<{ dulation: number }>`
  animation: ${fadeIn} ${({ dulation }) => dulation}s linear 1;
`;

const YomiFudaWord: React.FC<Props> = ({ word, dulation, onAnimationEnd }) =>
  word === SPACE ? (
    <span>{word}</span>
  ) : (
    <Word dulation={dulation} onAnimationEnd={onAnimationEnd}>
      {word}
    </Word>
  );

export default ({ word, dulation, onAnimationEnd }: Props) =>
  React.useMemo(() => <YomiFudaWord word={word} dulation={dulation} onAnimationEnd={onAnimationEnd} />, [word]);
