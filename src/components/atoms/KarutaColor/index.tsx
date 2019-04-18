import * as React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';
import { toColorString } from '@src/utils';
import { Color as ColorType } from '@src/types';

export type Props = {
  color: ColorType;
} & Pick<TxtProps, 'className' | 'size'>;

const KarutaColor = ({ color, size, className }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {toColorString(color)}
  </Txt>
);

export default KarutaColor;
