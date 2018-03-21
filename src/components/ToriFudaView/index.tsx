import * as React from 'react';
import styled from 'styled-components';
import { withRipple } from '../../enhancers/withRipple';
import { withAppTheme } from '../../styles';
import { ToriFuda } from '../../types';

export interface ToriFudaViewProps {
  readonly toriFuda: ToriFuda;
  readonly style?: React.CSSProperties;
  readonly onClick: (toriFuda: ToriFuda) => void;
}

const Frame = withRipple(withAppTheme(styled.div)`
  height: 220px;
  padding: 0 ${({ theme }) => theme.spacing1x};
  border: 3px solid ${({ theme }) => theme.colorPrimaryDark};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorThin};
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.26);
  font-family: 'Sawarabi Mincho';
  cursor: pointer;
`);

const Inner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Phrase = styled.div`
  width: 1.6rem;
  font-size: 1.6rem;
  line-height: 1.8rem;
`;

const FifthPhrase = Phrase.extend`
  padding-top: 24px;
  margin-right: 8px;
`;

const ToriFudaView: React.SFC<ToriFudaViewProps> = ({
  toriFuda,
  style,
  onClick
}) => {
  const onClickFrame = () => onClick(toriFuda);
  return (
    <Frame style={style} onClick={onClickFrame}>
      <Inner>
        <Phrase>{toriFuda.fourthText}</Phrase>
        <FifthPhrase>{toriFuda.fifthText}</FifthPhrase>
      </Inner>
    </Frame>
  );
};

export default ToriFudaView;
