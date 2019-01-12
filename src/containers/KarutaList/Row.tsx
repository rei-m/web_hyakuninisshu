import * as React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import styled from '@src/styles/styled-components';
import KarutaImage from '@src/components/KarutaImage';
import { Karuta } from '@src/types';
import { toKarutaNoString } from '@src/utils';

export interface Props {
  karuta: Karuta;
  onClickRow: (karutaId: number) => void;
}

const Container = styled.div`
  display: flex;
  width: calc(100vw - ${({ theme }) => theme.spacing4x});
  max-width: 380px;
  height: 88px;
  align-items: center;
  box-shadow: ${({ theme }) => theme.elevationShadow1x};
  margin: ${({ theme }) => theme.spacing1x};
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ImageColumn = styled.div`
  width: 64px;
`;

const TextColumn = styled.div`
  flex-grow: 1;
  padding-right: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
`;

const KarutaId = styled.div`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing0_5x};
`;

const TextRow = styled.div`
  text-align: left;
`;

const CreatorRow = styled.div`
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing1x};
`;

const KarutaListRow: React.FC<Props> = ({ karuta, onClickRow }) => {
  const onClick = () => {
    onClickRow(karuta.no);
  };

  return (
    <Container onClick={onClick}>
      <ImageColumn>
        <KarutaId>{toKarutaNoString(karuta.no)}</KarutaId>
        <KarutaImage
          karutaNo={karuta.no}
          style={{
            width: 40,
            margin: 'auto',
          }}
        />
      </ImageColumn>
      <TextColumn>
        <TextRow>{`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}</TextRow>
        <TextRow>{`${karuta.fourthKanji} ${karuta.fifthKanji}`}</TextRow>
        <CreatorRow>{karuta.creator}</CreatorRow>
      </TextColumn>
    </Container>
  );
};

export default shouldUpdate((props: Props, nextProps: Props) => props.karuta.no !== nextProps.karuta.no)(KarutaListRow);
