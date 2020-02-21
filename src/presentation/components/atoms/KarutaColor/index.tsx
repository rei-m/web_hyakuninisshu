import React from 'react';
import Txt, { Props as TxtProps } from '@src/presentation/components/atoms/Txt';
import { Color as ColorType } from '@src/domain/models';

export type Props = {
  color: ColorType;
} & Pick<TxtProps, 'className' | 'size'>;

const KarutaColor = ({ color, size, className = '' }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {ColorType.toJPNString(color)}
  </Txt>
);

export default KarutaColor;
