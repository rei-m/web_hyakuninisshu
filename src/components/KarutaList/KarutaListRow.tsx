import * as React from 'react';
import styled from 'styled-components';
import { Karuta } from '../../types';
import { convetKarutaId } from '../helper';

const Row = styled.div`
  display: flex;
`;

const TextRow = styled.div`
  text-align: left;
`;

const CreatorRow = styled.div`
  text-align: right;
`;

export interface KarutaListRowProps {
  karuta: Karuta;
  onClickRow: (karutaId: number) => void;
}

const KarutaListRow = ({ karuta, onClickRow }: KarutaListRowProps) => {
  const onClick = () => {
    onClickRow(karuta.id);
  };

  return (
    <Row onClick={onClick}>
      <div>{convetKarutaId(karuta.id)}</div>
      <div>
        <TextRow>
          {`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}
        </TextRow>
        <TextRow>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</TextRow>
        <CreatorRow>{karuta.creator}</CreatorRow>
      </div>
    </Row>
  );
};

export default KarutaListRow;
