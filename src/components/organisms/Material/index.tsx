import React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import Article from '@src/components/atoms/Article';
import Txt from '@src/components/atoms/Txt';
import Heading from '@src/components/atoms/Heading';
import Paragraph from '@src/components/atoms/Paragraph';
import KarutaNo from '@src/components/atoms/KarutaNo';
import KarutaImage from '@src/components/molecules/KarutaImage';
import MaterialKanjiTxt from '@src/components/molecules/MaterialKanjiTxt';
import MaterialKanaTxt from '@src/components/molecules/MaterialKanaTxt';
import { Karuta } from '@src/types';

export interface Props {
  karuta: Karuta;
}

const Container = styled(Article)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  box-sizing: border-box;
  border: 8px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacingByPx(2)};
  max-width: 380px;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
`;

const Title = styled(Heading)``;

const SubTitle = styled(Heading)`
  text-align: left;
`;

const StyledKarutaImage = styled(KarutaImage)`
  width: 200px;
  margin: ${({ theme }) => theme.spacingByPx(1)};
`;

const SubContainer = styled(Block)`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacingByPx(1)};
  padding-bottom: ${({ theme }) => theme.spacingByPx(1)};
`;

const Translation = styled(Paragraph)`
  text-align: left;
`;

const Creator = styled(Txt)``;

const Material = ({ karuta }: Props) => (
  <Container
    heading={
      <Title level={3}>
        <KarutaNo karutaNo={karuta.no} /> / <Creator>{karuta.creator}</Creator>
      </Title>
    }
  >
    <StyledKarutaImage karutaNo={karuta.no} />
    <SubContainer>
      <SubTitle level={4} visualLevel={5}>
        原文
      </SubTitle>
      <MaterialKanjiTxt karuta={karuta} size={`s`} />
      <MaterialKanaTxt karuta={karuta} size={`s`} />
    </SubContainer>
    <SubContainer>
      <SubTitle level={4} visualLevel={5}>
        訳
      </SubTitle>
      <Translation size={`s`}>{karuta.translation}</Translation>
    </SubContainer>
  </Container>
);

export default Material;
