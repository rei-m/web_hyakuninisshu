import React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = Omit<TxtProps, 'tag'>;

const Paragraph: React.FC<Props> = (props: Props) => <Txt tag={`p`} {...props} />;

export default Paragraph;
