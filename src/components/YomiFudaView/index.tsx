import * as React from 'react';
import styled from 'styled-components';
import { YomiFuda } from '../../types';
import { COLOR_PRIMARY_DARK } from '../../constants/colors';

export interface YomiFudaViewProps {
  readonly yomiFuda: YomiFuda;
  readonly style?: React.CSSProperties;
}

const Frame = styled.div`
  width: 140px;
  height: 240px;
  border: 6px solid ${COLOR_PRIMARY_DARK};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
