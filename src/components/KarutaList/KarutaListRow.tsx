import * as React from 'react';
import styled from 'styled-components';
import KarutaImage from '../KarutaImage';
import { Karuta } from '../../types';
import { convetKarutaId } from '../helper';

const Row = styled.div`
  display: flex;
  width: 380px;
  height: 88px;
  align-items: center;
`;

const ImageColumn = styled.div`
  width: 64px;
`;

const TextColumn = styled.div`
  flex-grow: 1;
  padding-right: 16px;
  box-sizing: border-box;
`;

const KarutaId = styled.div`
  font-size: 1rem;
  margin-bottom: 4px;
`;

const TextRow = styled.div`
  text-align: left;
`;

const CreatorRow = styled.div`
  text-align: right;
  margin-top: 8px;
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
      <ImageColumn>
        <KarutaId>{convetKarutaId(karuta.id)}</KarutaId>
        <KarutaImage
          karutaId={karuta.id}
          style={{
            width: 40
          }}
        />
      </ImageColumn>
      <TextColumn>
        <TextRow>
          {`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}
        </TextRow>
        <TextRow>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</TextRow>
        <CreatorRow>{karuta.creator}</CreatorRow>
      </TextColumn>
    </Row>
  );
};

export default KarutaListRow;
