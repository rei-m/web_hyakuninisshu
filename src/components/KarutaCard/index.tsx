import * as React from 'react';
import styled from '@src/styles/styled-components';
import KarutaImage from '@src/components/KarutaImage';
import { Karuta } from '@src/types';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  karuta: Karuta;
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  background-color: #fff;
  box-sizing: border-box;
  border: 8px solid ${({ theme }) => theme.colorPrimary};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing2x};
`;

const Title = styled.h3`
  font-size: 1.6rem;
  padding: ${({ theme }) => theme.spacing1x};
`;

const ItemBox = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing1x};
  padding-bottom: ${({ theme }) => theme.spacing1x};
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

const KimarijiRow: React.FC<Karuta> = ({ kimariji, firstKana, secondKana, thirdKana }) => {
  const modKimariji = firstKana.length - kimariji;
  return modKimariji >= 0 ? (
    <ItemValue>
      <Kimariji>{firstKana.slice(0, kimariji)}</Kimariji>
      {`${firstKana.slice(kimariji - firstKana.length)} ${secondKana} ${thirdKana}`}
    </ItemValue>
  ) : (
    <ItemValue>
      <Kimariji>{`${firstKana} ${secondKana.slice(0, modKimariji * -1)}`}</Kimariji>
      {`${secondKana.slice(modKimariji)} ${thirdKana}`}
    </ItemValue>
  );
};

const KarutaCard: React.FC<Props> = ({ karuta }) => (
  <Container>
    <Title>
      {toKarutaNoString(karuta.no)} / {karuta.creator}
    </Title>
    <KarutaImage
      karutaNo={karuta.no}
      style={{
        width: 200,
      }}
    />
    <ItemBox>
      <ItemTitle>原文</ItemTitle>
      <ItemValue>{`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}</ItemValue>
      <ItemValue>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</ItemValue>
      {KimarijiRow(karuta)}
      <ItemValue>{`${karuta.fourthKana} ${karuta.fifthKana}`}</ItemValue>
    </ItemBox>
    <ItemBox>
      <ItemTitle>訳</ItemTitle>
      <ItemValue>{karuta.translation}</ItemValue>
    </ItemBox>
  </Container>
);

export default KarutaCard;
