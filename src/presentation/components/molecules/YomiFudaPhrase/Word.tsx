import React from 'react';
import FadeInFrame from '@src/presentation/components/atoms/FadeInFrame';
import { SPACE } from '.';

export type Props = {
  text: string;
  duration: number;
  className?: string;
  onAnimationEnd: () => void;
};

const Word = ({ text, duration, className = '', onAnimationEnd }: Props) =>
  text === SPACE ? (
    <span style={{ display: 'inline-block' }}>{SPACE}</span>
  ) : (
    <FadeInFrame duration={duration} onAnimationEnd={onAnimationEnd} className={className}>
      {text}
    </FadeInFrame>
  );

export default React.memo(Word, (prevProps, nextProps) => prevProps.text === nextProps.text);
