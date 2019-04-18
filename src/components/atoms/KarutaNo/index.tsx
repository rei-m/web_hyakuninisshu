import * as React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';
import { toKarutaNoString } from '@src/utils';

export type Props = {
  karutaNo: number;
} & Pick<TxtProps, 'className' | 'size'>;

const KarutaNo = ({ karutaNo, size, className }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {toKarutaNoString(karutaNo)}
  </Txt>
);

export default KarutaNo;
