import * as React from 'react';
import { connect } from 'react-redux';
import styled from '@src/styles/styled-components';
import { GlobalState } from '@src/state';
import { uiSelectors } from '@src/state/ducks/ui';
import Row from '@src/containers/KarutaList/Row';
import { Karuta } from '@src/types';
import ErrorMessage from '@src/components/ErrorMessage';

export interface Props {
  karutas: Karuta[];
  onClickRow: (karutaNo: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    flex-direction: row;
  }
`;

export const KarutaList: React.FC<Props> = ({ karutas, onClickRow }) => (
  <Container>
    {karutas.length > 0 ? (
      karutas.map(karuta => (
        <Row karuta={karuta} key={karuta.id} onClickRow={onClickRow} data-test={`row-${karuta.no}`} />
      ))
    ) : (
      <ErrorMessage text="歌が見つかりませんでした。絞り込みを見直してください。" />
    )}
  </Container>
);

export const mapStateToProps = ({ ui }: GlobalState, { karutas, onClickRow }: Props): Props => ({
  karutas: uiSelectors.filterKarutas(karutas, ui.karutasFilter),
  onClickRow,
});

export default connect(mapStateToProps)(KarutaList);
