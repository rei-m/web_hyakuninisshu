import { VerticalTxt, VerticalTxtProps } from '@/app/components/atoms/VerticalTxt';
import Word from './Word';

import type { SxAppProps } from '@/theme';

export const SPACE = '　';

export type PhraseProps = {
  text: string;
  duration: number;
  sx?: SxAppProps;
  onAnimationEnd: () => void;
} & Required<Pick<VerticalTxtProps, 'fontSize'>>;

export const Phrase = ({ text, duration, fontSize, sx, onAnimationEnd }: PhraseProps) => (
  <VerticalTxt fontSize={fontSize} sx={sx}>
    {Array.from(text).map((s, i) => (
      <Word text={s} duration={duration} onAnimationEnd={onAnimationEnd} key={i} />
    ))}
  </VerticalTxt>
);
