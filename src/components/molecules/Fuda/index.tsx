import React from 'react';
import styled from '@src/styles/styled-components';
import { Karuta } from '@src/types';
import Block from '@src/components/atoms/Block';
import VerticalTxt from '@src/components/atoms/VerticalTxt';

type Size = 's' | 'm' | 'l';

export interface Props {
  karuta: Karuta;
  size?: Size;
  className?: string;
}

const RATIO_L = 1.15;
const RATIO_S = 0.875;

const containerStyleMap = {
  s: `
  width: ${175 * RATIO_S}px;
  height: ${230 * RATIO_S}px;
  border-width: ${5 * RATIO_S}px;
  `,
  m: `
  width: 175px;
  height: 230px;
  border-width: 5px;
  `,
  l: `
  width: ${175 * RATIO_L}px;
  height: ${230 * RATIO_L}px;
  border-width: ${5 * RATIO_L}px;
  `,
};

const phraseStyleMap = {
  s: {
    paddingUnit: 5,
    marginRight: 5,
  },
  m: {
    paddingUnit: 7,
    marginRight: 7,
  },
  l: {
    paddingUnit: 8,
    marginRight: 8,
  },
};

const phraseStyle = ({ size, level }: { size: Size; level: 0 | 3 | 4 | 6 | 7 }) => {
  const style = phraseStyleMap[size];
  return `
    padding-top: ${style.paddingUnit * level}px;
    margin-right: ${style.marginRight}px;
  `;
};

const creatorStyleMap = {
  s: {
    fontSize: `${1.3 * RATIO_S}rem`,
    lineHeight: `${1.4 * RATIO_S}rem`,
    marginRight: `${14 * RATIO_S}px`,
  },
  m: {
    fontSize: `1.3rem`,
    lineHeight: `1.4rem`,
    marginRight: `14px`,
  },
  l: {
    fontSize: `${1.3 * RATIO_L}rem`,
    lineHeight: `${1.4 * RATIO_L}rem`,
    marginRight: `${14 * RATIO_L}px`,
  },
};

const Container = styled(Block)<{ size: Size }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorThin};
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
  ${({ size }) => containerStyleMap[size]}
  font-family: 'Sawarabi Mincho';
`;

const Inner = styled(Block)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const FirstPhrase = styled(VerticalTxt)``;

const SecondPhrase = styled(VerticalTxt)<{ size: Size }>`
  ${({ size }) => phraseStyle({ size, level: 3 })}
`;

const ThirdPhrase = styled(VerticalTxt)<{ size: Size }>`
  ${({ size }) => phraseStyle({ size, level: 6 })}
`;

const FourthPhrase = styled(VerticalTxt)<{ size: Size }>`
  ${({ size }) => phraseStyle({ size, level: 4 })}
`;

const FifthPhrase = styled(VerticalTxt)<{ size: Size }>`
  ${({ size }) => phraseStyle({ size, level: 7 })}
`;

const Creator = styled(VerticalTxt)`
  align-self: flex-end;
`;

const Fuda = ({ karuta, size = 'l', className = '' }: Props) => (
  <Container className={className} size={size}>
    <Inner>
      <FirstPhrase size={size}>{karuta.firstKanji}</FirstPhrase>
      <SecondPhrase size={size}>{karuta.secondKanji}</SecondPhrase>
      <ThirdPhrase size={size}>{karuta.thirdKanji}</ThirdPhrase>
      <FourthPhrase size={size}>{karuta.fourthKanji}</FourthPhrase>
      <FifthPhrase size={size}>{karuta.fifthKanji}</FifthPhrase>
      <Creator size={size} style={creatorStyleMap[size]}>
        {karuta.creator}
      </Creator>
    </Inner>
  </Container>
);

export default Fuda;
