import React from 'react';
import Txt, { Props as TxtProps } from '@src/presentation/components/atoms/Txt';
import { Kimariji as KimarijiType } from '@src/domain/models';

export type Props = {
  kimariji: KimarijiType;
} & Pick<TxtProps, 'className' | 'size'>;

const Kimariji = ({ kimariji, size, className = '' }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {KimarijiType.toJPNString(kimariji)}
  </Txt>
);

export default Kimariji;
