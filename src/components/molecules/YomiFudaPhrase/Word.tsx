import React from 'react';
import FadeInFrame from '@src/components/atoms/FadeInFrame';
import { SPACE } from './';

export interface Props {
  text: string;
  duration: number;
  className?: string;
  onAnimationEnd: () => void;
}

const Word = ({ text, duration, className = '', onAnimationEnd }: Props) =>
  text === SPACE ? (
    <span>{text}</span>
  ) : (
    <FadeInFrame duration={duration} onAnimationEnd={onAnimationEnd} className={className}>
      {text}
    </FadeInFrame>
  );

export default React.memo(Word, (prevProps, nextProps) => prevProps.text === nextProps.text);
