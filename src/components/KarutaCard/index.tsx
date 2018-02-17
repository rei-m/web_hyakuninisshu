import * as React from 'react';
import styled from 'styled-components';
import KarutaImage from '../KarutaImage';
import { Karuta } from '../../types';
import { convetKarutaId } from '../helper';

export interface KarutaCardProps {
  karuta: Karuta;
}

const ItemTitle = styled.div`
  font-size: 1.2rem;
`;

const ItemValue = styled.div`
  font-size: 1.4rem;
`;

const Kimariji = styled.span`
  color: #ff0000;
`;

const KimarijiRow = ({
  kimariji,
  firstKana,
  secondKana,
  thirdKana
}: Karuta) => {
  const modKimariji = firstKana.length - kimariji;
  return modKimariji >= 0 ? (
    <ItemValue>
      <Kimariji>{firstKana.slice(0, kimariji)}</Kimariji>
      {`${firstKana.slice(
        kimariji - firstKana.length
      )} ${secondKana} ${thirdKana}`}
    </ItemValue>
  ) : (
    <ItemValue>
      <Kimariji>
        {`${firstKana} ${secondKana.slice(0, modKimariji * -1)}`}
      </Kimariji>
      {`${secondKana.slice(modKimariji)} ${thirdKana}`}
    </ItemValue>
  );
};

const KarutaCard = ({ karuta }: KarutaCardProps) => (
  <div>
    <div>{convetKarutaId(karuta.id)}</div>
    <KarutaImage
      karutaId={karuta.id}
      style={{
        width: 200
      }}
    />
    <div>
      <ItemTitle>歌人</ItemTitle>
      <ItemValue>{karuta.creator}</ItemValue>
    </div>
    <div>
      <ItemTitle>原文</ItemTitle>
      <ItemValue>{`${karuta.firstKanji} ${karuta.secondKanji} ${
        karuta.thirdKanji
      }`}</ItemValue>
      <ItemValue>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</ItemValue>
      {KimarijiRow(karuta)}
      <ItemValue>{`${karuta.fourthKana} ${karuta.fifthKana}`}</ItemValue>
    </div>
    <div>
      <ItemTitle>訳</ItemTitle>
      <ItemValue>{karuta.translation}</ItemValue>
    </div>
  </div>
);

export default KarutaCard;
