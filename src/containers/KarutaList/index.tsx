import * as React from 'react';
import { connect } from 'react-redux';
import styled from '@src/styles/styled-components';
import Row from '@src/containers/KarutaList/Row';
import ErrorMessage from '@src/components/ErrorMessage';
import { Color, Karuta, Kimariji } from '@src/types';
import { GlobalState } from '@src/state';

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

export const mapStateToProps = ({ ui }: GlobalState, { karutas, onClickRow }: Props): Props => {
  const { karutasFilter } = ui;
  const kimarijiSet = new Set<Kimariji>(karutasFilter.kimarijis.filter(k => k.checked).map(k => k.kimariji));
  const colorSet = new Set<Color>(karutasFilter.colors.filter(k => k.checked).map(k => k.color));
  const filterdKarutas = karutas.filter(karuta => kimarijiSet.has(karuta.kimariji) && colorSet.has(karuta.color));

  return { karutas: filterdKarutas, onClickRow };
};

export default connect(mapStateToProps)(KarutaList);
