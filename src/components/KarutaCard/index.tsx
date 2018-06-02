import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import { Karuta } from '@src/types';
import KarutaImage from '@src/components/KarutaImage';
import { toKarutaIdString } from '@src/components/helper';

export interface KarutaCardProps {
  readonly karuta: Karuta;
}

const Root = withAppTheme(styled.article)`
  max-width: 380px;
  width: 80vw;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  background-color: #fff;
  box-sizing: border-box;
  border: 8px solid ${({ theme }) => theme.colorPrimary};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing2x};
`;

const Title = withAppTheme(styled.h3)`
  font-size: 1.6rem;
  padding: ${({ theme }) => theme.spacing1x};
`;

const ItemBox = withAppTheme(styled.div)`
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

const KimarijiRow: React.SFC<Karuta> = ({
  kimariji,
  firstKana,
  secondKana,
  thirdKana
}) => {
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

const KarutaCard: React.SFC<KarutaCardProps> = ({ karuta }) => (
  <Root>
    <Title>
      {toKarutaIdString(karuta.id)} / {karuta.creator}
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
