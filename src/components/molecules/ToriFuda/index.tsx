import * as React from 'react';
import styled from '@src/styles/styled-components';
import { SPACING_UNIT } from '@src/styles/theme';
import Block from '@src/components/atoms/Block';
import VerticalTxt from '@src/components/atoms/VerticalTxt';
import { withRipple } from '@src/enhancers/withRipple';
import { ToriFuda as ToriFudaType } from '@src/types';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const ratioMap = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
};

export interface Props {
  toriFuda: ToriFudaType;
  thin?: boolean;
  size?: Size;
  className?: string;
  onClick: (toriFuda: ToriFudaType) => void;
}

const Container = withRipple(styled(Block)<{ thin: boolean; size: Size }>`
  ${({ theme }) => theme.centering}
  background-color: ${({ theme }) => theme.colorThin};
  border-style: solid;
  border-color: ${({ theme }) => theme.colorPrimaryDark};
  border-width: ${({ size }) => `${3 * ratioMap[size]}px`};
  border-radius: 10px;
  height: ${({ size }) => `${220 * ratioMap[size]}px`};
  padding: 0 ${({ theme }) => theme.spacing1x};
  font-family: 'Sawarabi Mincho';
  cursor: pointer;
  opacity: ${({ thin }) => (thin ? '0.8' : '1')};
`);

const Inner = styled(Block)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const FourthPhrase = styled(VerticalTxt)``;

const FifthPhrase = styled(VerticalTxt)<{ size: Size }>`
  padding-top: ${({ size }) => `${SPACING_UNIT * 3 * ratioMap[size]}px`};
  margin-right: ${({ size }) => `${SPACING_UNIT * ratioMap[size]}px`};
`;

const ToriFuda = ({ toriFuda, size = 'm', thin = false, className, onClick }: Props) => (
  <Container size={size} thin={thin} className={className} onClick={() => onClick(toriFuda)}>
    <Inner>
      <FourthPhrase size={size}>{toriFuda.fourthText}</FourthPhrase>
      <FifthPhrase size={size}>{toriFuda.fifthText}</FifthPhrase>
    </Inner>
  </Container>
);

export default ToriFuda;
