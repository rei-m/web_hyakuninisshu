import * as React from 'react';
import styled from '@src/styles/styled-components';
import { withRipple } from '@src/enhancers/withRipple';
import { ToriFuda } from '@src/types';

export interface Props {
  toriFuda: ToriFuda;
  style?: React.CSSProperties;
  onClick: (toriFuda: ToriFuda) => void;
}

const Container = withRipple(styled.div`
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

const FifthPhrase = styled(Phrase)`
  padding-top: 24px;
  margin-right: 8px;
`;

const ToriFudaView: React.FC<Props> = ({ toriFuda, style, onClick }) => {
  const onClickHandler = () => onClick(toriFuda);
  return (
    <Container style={style} onClick={onClickHandler}>
      <Inner>
        <Phrase>{toriFuda.fourthText}</Phrase>
        <FifthPhrase>{toriFuda.fifthText}</FifthPhrase>
      </Inner>
    </Container>
  );
};

export default ToriFudaView;
