import * as React from 'react';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import Txt, { textSizeMap, Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = TxtProps;

const toLineHeight = (size: string) => {
  const value = Number(size.replace('rem', ''));
  return `${value + 0.1}rem`;
};

export const lineHeihgtMap = {
  sss: toLineHeight(appTheme.fontSizeSSS),
  ss: toLineHeight(appTheme.fontSizeSS),
  s: toLineHeight(appTheme.fontSizeS),
  m: toLineHeight(appTheme.fontSizeM),
  l: toLineHeight(appTheme.fontSizeL),
  ll: toLineHeight(appTheme.fontSizeLL),
};

const Container = styled(Txt)`
  width: ${props => (props.size ? textSizeMap[props.size] : appTheme.fontSizeM)};
  line-height: ${props => (props.size ? lineHeihgtMap[props.size] : lineHeihgtMap.m)};
  display: inline-block;
`;

const VerticalTxt: React.FC<Props> = props => <Container {...props} />;

export default VerticalTxt;
