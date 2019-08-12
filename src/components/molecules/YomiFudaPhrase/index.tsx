import React from 'react';
import VerticalTxt from '@src/components/atoms/VerticalTxt';
import Word from './Word';

type Size = 's' | 'm' | 'l';

export const SPACE = '　';

export interface Props {
  text: string;
  duration: number;
  size?: Size;
  className?: string;
  onAnimationEnd: () => void;
}

const YomiFudaPhrase = ({ text, duration, size, className = '', onAnimationEnd }: Props) => (
  <VerticalTxt className={className} size={size}>
    {Array.from(text).map((s, i) => (
      <Word text={s} duration={duration} onAnimationEnd={onAnimationEnd} key={i} />
    ))}
  </VerticalTxt>
);

export default YomiFudaPhrase;
