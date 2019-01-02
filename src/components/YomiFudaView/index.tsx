import * as React from 'react';
import styled from '@src/styles/styled-components';
import { YomiFuda } from '@src/types';

export interface Props {
  yomiFuda: YomiFuda;
  style?: React.CSSProperties;
}

const Container = styled.div`
  width: 140px;
  height: 240px;
  border: 6px solid ${({ theme }) => theme.colorPrimaryDark};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorThin};
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

const SecondPhrase = styled(Phrase)`
  padding-top: 24px;
  margin-left: 8px;
  margin-right: 8px;
`;

const ThirdPhrase = styled(Phrase)`
  padding-top: 48px;
`;

// 各フレーズの文字数を最大に合わせる
// 縦書きのエレメントを絶対位置で指定する

const YomiFudaView: React.FC<Props> = ({ yomiFuda, style }) => (
  <Container style={style}>
    <Inner>
      <Phrase>{yomiFuda.firstText}</Phrase>
      <SecondPhrase>{yomiFuda.secondText}</SecondPhrase>
      <ThirdPhrase>{yomiFuda.thirdText}</ThirdPhrase>
    </Inner>
  </Container>
);

export default YomiFudaView;
