import * as React from 'react';
import styled, { ThemedStyledFunction } from 'styled-components';
import { YomiFuda } from '../../types';
import { Theme } from '../../styles';

export interface YomiFudaViewProps {
  readonly yomiFuda: YomiFuda;
  readonly style?: React.CSSProperties;
}

const div: ThemedStyledFunction<React.HTMLProps<HTMLDivElement>, Theme> =
  styled.div;

const Frame = div`
  width: 140px;
  height: 240px;
  border: 6px solid ${({ theme }) => theme.color_primary_dark};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffff0;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  font-family: 'Sawarabi Mincho';
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Phrase = styled.div`
  width: 1.9rem;
  font-size: 1.9rem;
  line-height: 2rem;
`;

const SecondPhrase = Phrase.extend`
  padding-top: 24px;
  margin-left: 8px;
  margin-right: 8px;
`;

const ThirdPhrase = Phrase.extend`
  padding-top: 48px;
`;

// 各フレーズの文字数を最大に合わせる
// 縦書きのエレメントを絶対位置で指定する

const YomiFudaView = ({ yomiFuda, style }: YomiFudaViewProps) => {
  return (
    <Frame style={style}>
      <Inner>
        <Phrase>{yomiFuda.firstText}</Phrase>
        <SecondPhrase>{yomiFuda.secondText}</SecondPhrase>
        <ThirdPhrase>{yomiFuda.thirdText}</ThirdPhrase>
      </Inner>
    </Frame>
  );
};

export default YomiFudaView;
