import React from 'react';
import Txt, { Props as TxtProps } from '@src/presentation/components/atoms/Txt';
import { KarutaNo as KarutaNoType } from '@src/domain/models';

export type Props = {
  karutaNo: KarutaNoType;
} & Pick<TxtProps, 'className' | 'size'>;

const KarutaNo = ({ karutaNo, size, className = '' }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {KarutaNoType.toJPNString(karutaNo)}
  </Txt>
);

export default KarutaNo;
