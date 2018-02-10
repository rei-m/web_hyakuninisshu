import * as React from 'react';
import styled from 'styled-components';
import { YomiFuda } from '../../types';

export interface YomiFudaViewProps {
  readonly yomiFuda: YomiFuda;
}

const Frame = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Phrase = styled.div`
  writing-mode: vertical-rl;
`;

// 縦書きのエレメントを絶対位置で指定する必要がある

const YomiFudaView = (props: YomiFudaViewProps) => {
  return (
    <Frame>
      <Phrase>{props.yomiFuda.firstText}</Phrase>
      <Phrase>{props.yomiFuda.secondText}</Phrase>
      <Phrase>{props.yomiFuda.thirdText}</Phrase>
    </Frame>
  );
};

export default YomiFudaView;
