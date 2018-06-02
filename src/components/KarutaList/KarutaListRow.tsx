import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import { Karuta } from '@src/types';
import KarutaImage from '@src/components/KarutaImage';
import { toKarutaIdString } from '@src/components/helper';

export interface KarutaListRowProps {
  readonly karuta: Karuta;
  readonly onClickRow: (karutaId: number) => void;
}

const Row = withAppTheme(styled.div)`
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

const TextColumn = withAppTheme(styled.div)`
  flex-grow: 1;
  padding-right: ${({ theme }) => theme.spacing2x};
  box-sizing: border-box;
`;

const KarutaId = withAppTheme(styled.div)`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing0_5x};
`;

const TextRow = styled.div`
  text-align: left;
`;

const CreatorRow = withAppTheme(styled.div)`
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing1x};
`;

const KarutaListRow: React.SFC<KarutaListRowProps> = ({
  karuta,
  onClickRow
}) => {
  const onClick = () => {
    onClickRow(karuta.id);
  };

  return (
    <Row onClick={onClick}>
      <ImageColumn>
        <KarutaId>{toKarutaIdString(karuta.id)}</KarutaId>
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
