import React from 'react';
import styled from '@src/styles/styled-components';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = TxtProps;

const toLineHeight = (size: string) => {
  const value = Number(size.replace('rem', ''));
  return `${value + 0.1}rem`;
};

const Container = styled(Txt)(({ size = 'm', theme }) => ({
  display: 'inline-block',
  width: theme.fontSize[size],
  lineHeight: toLineHeight(theme.fontSize[size]),
}));

const VerticalTxt: React.FC<Props> = props => <Container {...props} />;

export default VerticalTxt;
