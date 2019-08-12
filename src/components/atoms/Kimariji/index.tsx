import React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';
import { toKimarijiString } from '@src/utils';
import { Kimariji as KimarijType } from '@src/types';

export type Props = {
  kimariji: KimarijType;
} & Pick<TxtProps, 'className' | 'size'>;

const Kimariji = ({ kimariji, size, className = '' }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {toKimarijiString(kimariji)}
  </Txt>
);

export default Kimariji;
