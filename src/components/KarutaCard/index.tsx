import * as React from 'react';
import styled from 'styled-components';
import KarutaImage from '../KarutaImage';
import { Karuta } from '../../types';
import { convetKarutaId } from '../helper';

export interface KarutaCardProps {
  karuta: Karuta;
}

const Root = styled.article`
  max-width: 380px;
  width: 80vw;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  background-color: #fff;
  box-sizing: border-box;
  border: 8px solid #689f38;
  border-radius: 4px;
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  padding: 8px;
`;

const ItemBox = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ItemTitle = styled.div`
  text-align: left;
  font-size: 1.2rem;
`;

const ItemValue = styled.div`
  text-align: left;
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
  <Root>
    <Title>
      {convetKarutaId(karuta.id)} / {karuta.creator}
    </Title>
    <KarutaImage
      karutaId={karuta.id}
      style={{
        width: 200
      }}
    />
    <ItemBox>
      <ItemTitle>原文</ItemTitle>
      <ItemValue>{`${karuta.firstKanji} ${karuta.secondKanji} ${
        karuta.thirdKanji
      }`}</ItemValue>
      <ItemValue>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</ItemValue>
      {KimarijiRow(karuta)}
      <ItemValue>{`${karuta.fourthKana} ${karuta.fifthKana}`}</ItemValue>
    </ItemBox>
    <ItemBox>
      <ItemTitle>訳</ItemTitle>
      <ItemValue>{karuta.translation}</ItemValue>
    </ItemBox>
  </Root>
);

export default KarutaCard;
