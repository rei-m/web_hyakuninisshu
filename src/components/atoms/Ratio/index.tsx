import * as React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = {
  denominator: number;
  numerator: number;
} & Pick<TxtProps, 'className' | 'size'>;

const Ratio = ({ numerator, denominator, size, className }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {`${numerator} / ${denominator}`}
  </Txt>
);

export default Ratio;
