import * as React from 'react';
import styled from 'styled-components';
import { ToriFuda } from '../../types';

export interface ToriFudaViewProps {
  readonly toriFuda: ToriFuda;
}

const Frame = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Phrase = styled.div`
  writing-mode: vertical-rl;
`;

const ToriFudaView = (props: ToriFudaViewProps) => {
  return (
    <Frame>
      <Phrase>{props.toriFuda.fourthText}</Phrase>
      <Phrase>{props.toriFuda.fifthText}</Phrase>
    </Frame>
  );
};

export default ToriFudaView;
