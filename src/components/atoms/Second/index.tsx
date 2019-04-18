import * as React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = {
  value: number;
} & Pick<TxtProps, 'className' | 'size'>;

const Second = ({ value, size, className }: Props) => (
  <Txt tag={`span`} size={size} className={className}>
    {`${value}秒`}
  </Txt>
);

export default Second;
